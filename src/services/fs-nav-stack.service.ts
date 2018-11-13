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


@Injectable()
export class FsNavStackService {

  public components = new FsNavComponents(this._navUpdates);
  public actions = new FsNavActions(this._navUpdates);
  public menus = new FsNavMenus(this._navUpdates);

  private _urlsStack: string[] = [];
  private _stopBackToUrls: any[] = [];

  private _activeRoute = new BehaviorSubject(null);
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

  get activeRoute() {
    return this._activeRoute.getValue() || {};
  }

  get activeRouteObservable(): Observable<any> {
    return this._activeRoute.asObservable();
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
   * @param url
   */
  public addUrlToStack(url: string) {
    if (this._urlsStack[this._urlsStack.length - 1] !== url) {
      this._urlsStack.push(url);
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
   */
  public setActiveRoute(route: ActivatedRouteSnapshot, data) {
    this._activeRoute.next({ path: this.getFullRoutePath(route), data: data });
    this._lastOperationIsBack = false;
    this._browserBack = false;
  }

  /**
   * Recursevly get full path for route
   * @param {ActivatedRouteSnapshot} route
   * @param {string} path
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
    } else {

      const prevUrl = this._urlsStack[this._urlsStack.length - 1];
      let delta = this.backDelta(prevUrl, -1);

      this._urlsStack.splice(delta, Math.abs(delta));

      delta *= 2;

      if (delta != 0) {
        window.history.go(delta);
      }
    }

    this._lastOperationIsBack = true;
  }

  /**
   * Method that counts number of steps to go back based on banned urls
   * @param prevUrl
   * @param delta
   */
  private backDelta(prevUrl, delta) {
    if (prevUrl && this._stopBackToUrls.length > 0) {
      // In case when we do back between history: false pages - we need to go just back
      if (
        this._stopBackToUrls.indexOf(this.activeRoute.path) === -1 &&
        this._stopBackToUrls.indexOf(prevUrl) > -1
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

    if (!this.lastOperationIsBack && this.activeRoute.path) {
      this.addUrlToStack(this.activeRoute.path);

      // Hack to prevent native back button
      history.pushState(null, null, location.href);
    }

    const data = Object.assign( { root: false, history: true },
                                this.getRouteData(route.snapshot, 'fsNav'));

    this.setActiveRoute(route.snapshot, data);

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
