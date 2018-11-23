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

    debugger;
    if (!lastStackItem || (lastStackItem && lastStackItem.path !== item.path)) {
      this._urlsStack.push(item);
    } else {

      // if (!save) {
      //   const lastUrl = this._urlsStack[this._urlsStack.length - 1];
      //   // lastUrl.backCounts--;
      // } else {
      //
      // }
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
    debugger;
    // const path = save ? this.getFullRoutePath(route) : this.getRoutePath(route.parent);

    if (!save && this.activeRoute.path === path) {
      this.activeRoute.backCounts++;
    } else {
      this._activeRoute.next({
        path: path,
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
    // debugger;
    if (steps) {
      window.history.go(-steps);
    } else {
      // debugger;
      const prevItem = this._urlsStack[this._urlsStack.length - 1];
      const backDelta = this.backDelta(this.getLastStackItem(), -1);
      let delta = this.activeRoute.save ? backDelta : -this.activeRoute.backCounts;

      // if (backDelta < -1) {
      //   delta += backDelta;
      // }

      if (prevItem && prevItem.save) {
        this._urlsStack.splice(delta, Math.abs(delta));
      } else {
        const deleteItems = !this.activeRoute.save && !prevItem.save ? 2 : 1;
        this._urlsStack.splice(-deleteItems, deleteItems);
      }

      delta *= 2;
      console.log('back with - ', delta, this.backDelta(prevItem, -1));

      if (delta != 0) {
        window.history.go(delta);
      }
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


  private getLastStackItem() {
    const itemsCount = this._urlsStack.length;

    if (this._urlsStack[itemsCount - 1].save) {
      return this._urlsStack[itemsCount - 1];
    } else {
      return this._urlsStack[itemsCount - 2];
    }
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
      { root: false, history: true },
      this.getRouteData(route.snapshot, 'fsNav'),
      this.getRouteData(route.snapshot.parent, 'fsNav')
    );

    if (!this.lastOperationIsBack && this.activeRoute.path) {
      this.addUrlToStack(this.activeRoute);

      // Hack to prevent native back button
      history.pushState(null, null, location.href);
    }

    if (this.lastOperationIsBack
      && data.lastChild
    ) {
      this.setLastStackRouteAsActiveRoute();
    } else {
      this.setActiveRoute(route.snapshot, data);
    }

    // console.log(this);
    this._navUpdates.updateRouteData(data);

    if (data.root === true) {
      this.resetStack();
    }

    debugger;
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
