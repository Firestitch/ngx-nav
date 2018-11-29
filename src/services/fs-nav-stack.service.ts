import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router
} from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { FsNavComponents, FsNavActions, FsNavMenus } from '../classes';
import { FsNavUpdatesService } from './fs-nav-updates.service';
import { NavStackItem } from '../interfaces';


@Injectable()
export class FsNavStackService {

  public components = new FsNavComponents(this._navUpdates);
  public actions = new FsNavActions(this._navUpdates);
  public menus = new FsNavMenus(this._navUpdates);

  private _urlsStack: NavStackItem[] = [];
  private _stopBackToUrls: any[] = [];

  private _activeRoute = new BehaviorSubject<NavStackItem>(null);
  private _lastOperationIsBack = false;
  private _browserBack = false;
  // private _handlers: {[key: string]: DetachedRouteHandle} = {}; // Do not remove!

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navUpdates: FsNavUpdatesService,
  ) {
    this.subscribeToRouteChange();
    this.subscribeToBrowserBack();
  }

  get activeRoute(): NavStackItem {
    return this._activeRoute.getValue();
  }

  get lastOperationIsBack() {
    return this._lastOperationIsBack;
  }

  get urlsStack() {
    return this._urlsStack.slice();
  }

  get stackRouteChangeSubscription(): Observable<any> {
    return this.routeChangeSubscription();
  }

  /**
   * Important method that do subscribe to route changes and setup route
   */
  public subscribeToRouteChange() {
    this.routeChangeSubscription()
      .subscribe(this.setupActivatedRoute.bind(this));
  }

  /**
   * Prevent default behaviour of browser back button
   */
  public subscribeToBrowserBack() {
    window.addEventListener('popstate', () => {
      if (!this._lastOperationIsBack) {
        this._browserBack = true;

        // Hack to prevent native back button
        history.go(1);

        this.goBack();
      }
    });
  }

  /**
   * Set activated route as stop route. You will be unable to go back to this url
   */
  public setActiveUrlAsStop() {
    if (this._stopBackToUrls.indexOf(this.activeRoute.path) === -1) {
      this._stopBackToUrls.push(this.activeRoute.path);
    }
  }

  /**
   * Add url to current urls stack
   * @param item
   */
  public addUrlToStack(item: NavStackItem) {
    const lastStackItem = this._urlsStack[this._urlsStack.length - 1];

    if (!lastStackItem || (lastStackItem && lastStackItem.path !== item.path)) {
      this._urlsStack.push(item);
    }

    this._lastOperationIsBack = false;
  }

  /**
   * Remove all information about stacked pages and handlers
   */
  public resetStack() {
    // for (const key in this._handlers) {
    //   if (this._handlers.hasOwnProperty(key)) {
    //     // Destroy component
    //     this.deactivateOutlet(this._handlers[key])
    //   }
    // }

    this._urlsStack.length = 0;
  }

  /**
   * Set active route path based on passed route path
   * @param {ActivatedRouteSnapshot} route
   * @param {any} data
   */
  public setActiveRoute(route: ActivatedRouteSnapshot, data: any) {
    const save = !data.lastChild;
    const path = save ? this.getFullRoutePath(route) : this.getRoutePath(route.parent);

    if (!save && this.activeRoute && this.activeRoute.path === path) {
      this.activeRoute.backCounts++;
      this.activeRoute.fullPath = this.getFullRoutePath(route);
    } else {
      this._activeRoute.next({
        path: path,
        fullPath: this.getFullRoutePath(route),
        data: data,
        save: save,
        backCounts: 1
      });
    }

    this._lastOperationIsBack = false;
    this._browserBack = false;
  }

  /**
   * Set last stack route as active (restore)
   */
  public setLastStackRouteAsActiveRoute() {
    const prevItem = this._urlsStack[this._urlsStack.length - 1];

    this._activeRoute.next(prevItem);

    this._lastOperationIsBack = false;
    this._browserBack = false;
  }

  /**
   * @param {ActivatedRouteSnapshot} route
   * @returns {string}
   */
  public getRoutePath(route: ActivatedRouteSnapshot) {
    return this.getHeadPath(route);
  }

  /**
   * Recursevly get full path for route
   * @param {ActivatedRouteSnapshot} route
   * @returns {string}
   */
  public getFullRoutePath(route: ActivatedRouteSnapshot) {
    if (route.firstChild) {
      return this.getTailPath(route);
    } else {
      return this.getHeadPath(route);
    }
  }

  /**
   * Window history go back to N steps
   * @param steps
   */
  public goBack(steps = null) {
    if (steps) {
      window.history.go(-steps);

      return;
    }

    const stackSize = this._urlsStack.length;

    // Can't go back because stack is empty
    if (stackSize === 0) {
      this._router.navigateByUrl('/');

      return;
    }

    const lastStackItem = this._urlsStack[stackSize - 1];

    const routeDelta = this.activeRoute.backCounts;
    const { delta: backDelta, depth: backCount } = this.backDelta(lastStackItem, 0);

    let delta = routeDelta + backDelta;

    if (backDelta > 0 && lastStackItem.save && lastStackItem.data.history) {
      delta -= 1;
    }

    // !!! @Ref { stack_pop } - if target url for go back has save false then
    // will do stack.pop() in setupActivated route
    const reduceStackBy = !this._urlsStack[stackSize - backCount].save
      ? backCount - 1
      : backCount;

    this._urlsStack.splice(-reduceStackBy, reduceStackBy);

    // Increase delta because of history manipulation was made.
    delta *= -2;

    if (delta !== 0) {
      window.history.go(delta);
    }

    this._lastOperationIsBack = true;
  }

  /**
   * Method that counts number of steps to go back based on banned urls
   * @param prevStackItem
   * @param delta
   * @param depth
   */
  private backDelta(prevStackItem: NavStackItem, delta, depth = 1) {
    if (prevStackItem && this._stopBackToUrls.length > 0) {
      // In case when we do back between history: false pages - we need to go just back
      if (
        this._stopBackToUrls.indexOf(this.activeRoute.path) === -1 &&
        this._stopBackToUrls.indexOf(prevStackItem.path) > -1
      ) {
        delta += prevStackItem.backCounts;
        depth++;

        return this.backDelta(this._urlsStack[this._urlsStack.length - depth], delta, depth);
      }
    }

    return {
      delta,
      depth
    };

  }

  /**
   * Support method for getFullRoutePath
   * @param route
   * @param path
   */
  private getHeadPath(route: ActivatedRouteSnapshot, path = '') {
    if (route.parent !== null) {
      return this.getHeadPath(route.parent, path) + '/' + route.url.join('/');
    } else {
      return route.url.join('/');
    }
  }

  /**
   * Support method for getFullRoutePath
   * @param route
   * @param path
   */
  private getTailPath(route: ActivatedRouteSnapshot, path = '') {
    if (route.firstChild) {
      return `/${route.url.join('/')}/${this.getTailPath(route.firstChild, path)}`;
    } else {
      return `${route.url.join('/')}`;
    }
  }


  /**
   * Lookup for element which can be saved (lastChild: false)
   */
  private getLastSaveElement() {
    return this._urlsStack.slice().reverse().find((item) => item.save);
  }

  // /**
  //  * Destroy component !!! DO NOT REMOVE !!!
  //  * @param {DetachedRouteHandle} handle
  //  */
  // private deactivateOutlet(handle: DetachedRouteHandle): void {
  //   if (handle === null) { return; }
  //   const componentRef: ComponentRef<any> = handle['componentRef'];
  //   if (componentRef) {
  //     componentRef.destroy()
  //   }
  // }

  /**
   * Important method - do operations for setup activated route
   * @param route
   */
  private setupActivatedRoute(route: ActivatedRoute) {
    this.components.clear();
    this.actions.clear();
    this.menus.clear();

    const data = Object.assign(
      { root: false, history: true, lastChild: false },
      this.getRouteData(route.snapshot, 'fsNav'),
      this.getRouteData(route.snapshot.parent, 'fsNav')
    );

    const routePath = !data.lastChild
      ? this.getFullRoutePath(route.snapshot)
      : this.getRoutePath(route.snapshot.parent);

    debugger;
    if (!this.lastOperationIsBack && this.activeRoute && this.activeRoute.path !== routePath) {
      this.addUrlToStack(this.activeRoute);
    }

    if (!this.lastOperationIsBack) {
      // Hack to prevent native back button
      history.pushState(null, null, location.href);
    }

    /**
     * Make a choice:
     * 1) Restore route from stack if lastChild: true
     * 2) Set from activated route
     */
    if (this.lastOperationIsBack && data.lastChild) {
      this.setLastStackRouteAsActiveRoute();

      // !!! @Ref { stack_pop } - goBack logic
      this._urlsStack.pop();
    } else {
      this.setActiveRoute(route.snapshot, data);
    }

    this._navUpdates.updateRouteData(data);

    if (data.root === true) {
      this.resetStack();
    }

    if (data.history === false) {
      this.setActiveUrlAsStop();
    }
  }

  /**
   * Get route data from Activated route snapshot
   * @param route
   * @param key
   */
  private getRouteData(route: ActivatedRouteSnapshot, key: string = null) {
    if (key) {
      return route && route.data && route.data[key] || null;
    } else {
      return route && route.data || null;
    }
  }

  /**
   * Subscription that used for listening routes change
   */
  private routeChangeSubscription(): Observable<any> {
    return this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this._activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary')
      );
  }

}
