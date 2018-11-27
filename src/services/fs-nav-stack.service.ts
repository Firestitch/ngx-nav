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

  private _activeRoute = new BehaviorSubject<NavStackItem>({});
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
    const save = !(data.lastChild);
    const path = save ? this.getFullRoutePath(route) : this.getRoutePath(route.parent);

    if (!save && this.activeRoute.path === path) {
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

    // Can't go back because stack is empty
    if (this._urlsStack.length === 0) {
      this._router.navigateByUrl('/');

      return;
    }

    const lastStackItem = this._urlsStack[this._urlsStack.length - 1];
    const backHistoryDelta = this.backDelta(this.getLastSaveElement(), -1);
    let delta = this.activeRoute.save ? backHistoryDelta : -this.activeRoute.backCounts;

    /**
     * Checking case when we are going from lastChild: true route to history: false.
     * In this case we should go back to page, which was before history: false page
     */
    if (!this.activeRoute.save && backHistoryDelta < -1) {
      /**
       * Just imagine that we already have next sequence of user actions:
       *
       * /list =>
       * /workflow 1 { history: false }  =>
       * /workflow 2 { history: false }  =>
       * /workflow 3 { history: false }  =>
       * /tabs/b     { lastChild: true } =>
       * /tabs/c     { lastChild: true }
       *
       * In this case when go back we should go to /list page
       *
       * But in case when we have (one more tabs visited, more than 2)
       *
       * /list =>
       * /workflow 1 { history: false }  =>
       * /workflow 2 { history: false }  =>
       * /workflow 3 { history: false }  =>
       * /tabs/b     { lastChild: true } =>
       * /tabs/c     { lastChild: true } =>
       * /tabs/a     { lastChild: true }
       *
       * We should summ backCounts and backDelta and also add "2"
       * because of history manipulations was made
       *
       */

      if (delta < -2) {
        delta += backHistoryDelta + 2;
      } else {
        delta = backHistoryDelta;
      }
    }

    /**
     * Checking if previous stack item can be saved
     *
     * When true => It's usual case for delta -1 or another value if item had history: false
     */
    if (lastStackItem && lastStackItem.save) {
      this._urlsStack.splice(delta, Math.abs(delta));
    } else {
      /**
       *
       * In case when current route and prev route can not be saved
       *
       * Example:
       * Go to /menu-c => /tabs/b => /tabs/c => /tabs/a
       *
       * In this case into stack will be stored only /menu-c and /tabs
       * !! Note that was stored only /tabs (parent for /tabs/b and etc.) !!
       *
       * By logic of how working router stack item can be stored in stack only when user leave page.
       * In example above /tabs stored when user goes from /tabs/b to /tabs/c,
       * BUT if user goes /menu/c => /tabs/b (and do not go forward) then in stack will only /menu-c
       *
       * BY this reason we should check backCounts and remove from stack 1 or 2 rotes (depends from logic above)
       *
       */
      if (!this.activeRoute.save && !lastStackItem.save && this.activeRoute.backCounts > 1) {
        const sizeStack = this._urlsStack.length;

        // If two routes in a row can not be saved (lastChildRoute : false)
        const seqOfLastChildRoutes = sizeStack >= 2
          && !this._urlsStack[sizeStack - 2].save
          && !this._urlsStack[sizeStack - 1].save;

        const sliceCount = !seqOfLastChildRoutes ? 2 : 1;

        this._urlsStack.splice(-sliceCount, sliceCount);
      }
    }

    // Increase delta because of history manipulation was made.
    delta *= 2;

    if (delta !== 0) {
      window.history.go(delta);
    }

    this._lastOperationIsBack = true;
  }

  /**
   * Method that counts number of steps to go back based on banned urls
   * @param prevStackItem
   * @param delta
   */
  private backDelta(prevStackItem: NavStackItem, delta) {
    if (prevStackItem && this._stopBackToUrls.length > 0) {
      // In case when we do back between history: false pages - we need to go just back
      if (
        this._stopBackToUrls.indexOf(this.activeRoute.path) === -1 &&
        this._stopBackToUrls.indexOf(prevStackItem.path) > -1
      ) {
        delta -= 1;

        return this.backDelta(this._urlsStack[this._urlsStack.length + delta], delta);
      }
    }

    return delta;

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

    if (!this.lastOperationIsBack && this.activeRoute.path) {
      this.addUrlToStack(this.activeRoute);

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
