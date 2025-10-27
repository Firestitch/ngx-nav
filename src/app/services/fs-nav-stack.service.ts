import { Injectable, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

import { FsNavActions } from '../classes/nav-actions';
import { FsNavComponents } from '../classes/nav-components';
import { FsNavMenus } from '../classes/nav-menus';
import { FS_NAV_DEFAULT_CONFIG } from '../fs-nav.providers';
import { FsNavDefaultConfig } from '../interfaces/nav-default-config.interface';
import { FsNavRouteData } from '../interfaces/nav-route-data.interface';
import { NavStackItem } from '../interfaces/nav-stack-item.interface';

import { FsNavUpdatesService } from './fs-nav-updates.service';


@Injectable()
export class FsNavStackService {
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _navUpdates = inject(FsNavUpdatesService);
  private _defaultConfig = inject<FsNavDefaultConfig>(FS_NAV_DEFAULT_CONFIG);


  public components:FsNavComponents;
  public actions: FsNavActions;
  public menus: FsNavMenus;

  private _urlsStack: NavStackItem[] = [];
  private _stopBackToUrls: any[] = [];

  private _activeRoute = new BehaviorSubject<NavStackItem>(null);
  private _lastOperationIsBack = false;
  private _routeData: FsNavRouteData;

  constructor() {
    this.components = new FsNavComponents(this._navUpdates);
    this.actions = new FsNavActions(this._navUpdates);
    this.menus = new FsNavMenus(this._navUpdates);
    this.subscribeToRouteChange();

    if (this._defaultConfig.watchBrowserBackButton) {
      this.subscribeToBrowserBack();
    }
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
   * @param route
   * @param data
   */
  public setActiveRoute(route: ActivatedRouteSnapshot, data: FsNavRouteData) {
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
        backCounts: 1,
      });
    }

    this._lastOperationIsBack = false;
  }

  /**
   * Set last stack route as active (restore)
   */
  public setLastStackRouteAsActiveRoute() {
    const prevItem = this._urlsStack[this._urlsStack.length - 1];

    this._activeRoute.next(prevItem);

    this._lastOperationIsBack = false;
  }

  /**
   * @param route
   */
  public getRoutePath(route: ActivatedRouteSnapshot) {
    return this.getHeadPath(route);
  }

  /**
   * Recursevly get full path for route
   * @param route
   */
  public getFullRoutePath(route: ActivatedRouteSnapshot) {
    if (route.firstChild) {
      return this.getTailPath(route);
    }
 
    return this.getHeadPath(route);
    
  }

  /**
   * Window history go back to N steps
   * @param steps
   */
  public goBack(steps = null) {
    if (!this._defaultConfig.watchBrowserBackButton) {
      window.history.back();

      return;
    }

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
      this._lastOperationIsBack = true;
      window.history.go(delta);
    }
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
      depth,
    };

  }

  /**
   * Support method for getFullRoutePath
   * @param route
   * @param path
   */
  private getHeadPath(route: ActivatedRouteSnapshot, path = '') {
    if (route.parent !== null) {
      return `${this.getHeadPath(route.parent, path)  }/${  route.url.join('/')}`;
    }
 
    return route.url.join('/');
    
  }

  /**
   * Support method for getFullRoutePath
   * @param route
   * @param path
   */
  private getTailPath(route: ActivatedRouteSnapshot, path = '') {
    if (route.firstChild) {
      return `/${route.url.join('/')}/${this.getTailPath(route.firstChild, path)}`;
    }
 
    return `${route.url.join('/')}`;
    
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

    // We don't need to do any manipulations with stack if back button logic disabled
    if (this._defaultConfig.watchBrowserBackButton) {

      const routePath = !this._routeData.lastChild
        ? this.getFullRoutePath(route.snapshot)
        : this.getRoutePath(route.snapshot.parent);

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
      if (this.lastOperationIsBack && this._routeData.lastChild) {
        this.setLastStackRouteAsActiveRoute();

        // !!! @Ref { stack_pop } - goBack logic
        this._urlsStack.pop();
      } else {
        this.setActiveRoute(route.snapshot, this._routeData);
      }

      this._navUpdates.updateRouteData(this._routeData);

      if (this._routeData.root) {
        this.resetStack();
      }

      if (!this._routeData.history) {
        this.setActiveUrlAsStop();
      }
    } else {
      this._navUpdates.updateRouteData(this._routeData);
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
    }
 
    return route && route.data || null;
    
  }

  /**
   * Subscription that used for listening routes change
   */
  private routeChangeSubscription(): Observable<any> {
    return this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged((prev: any, curr: any) => {
          const prevUrl = prev.url?.split('?')[0];
          const currUrl = curr.url?.split('?')[0];

          return prevUrl === currUrl;
        }),
        map(() => {
          return this._activatedRoute;
        }),
        tap(() => {
          this._routeData = { root: false, history: true, lastChild: false };
        }),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;

            this._routeData = {
              
              ...this._routeData,
              ...this.getRouteData(route.snapshot, 'fsNav'),
            };
          }

          return route;
        }),
        tap(() => {
          if (this._routeData.rootChildren !== void 0) {
            this._routeData.root = this._routeData.rootChildren;
          }
        }),
        filter((route) => route.outlet === 'primary'),
      );
  }

}
