import { ComponentRef, EventEmitter, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  NavigationEnd,
  Router
} from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map, takeUntil } from 'rxjs/operators';

import { NavAction, RouteInfo } from '../models';
import { UrlInfoAction } from '../interfaces';
import { FsNavComponents } from '../classes';


@Injectable()
export class FsNavStackService {

  public onActionsUpdated = new EventEmitter();
  public updated = new EventEmitter();
  // public onStackReset = new EventEmitter();
  public urlsStack: string[] = [];
  public stopBackToUrls: any[] = [];
  public components = new FsNavComponents(this.updated);

  private _activeRoutePath = new BehaviorSubject('');
  private _routeInfo: RouteInfo[] = [];
  private _isBackNavigated = false;
  private _lastOperationIsBack = false;
  private _handlers: {[key: string]: DetachedRouteHandle} = {};

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.subscribeToRouteChange();
  }

  get activeRoutePath() {
    return this._activeRoutePath.getValue();
  }

  get routeInfo(): RouteInfo {
    return this._routeInfo[this.activeRoutePath];
  }

  get lastOperationIsBack() {
    return this._lastOperationIsBack;
  }

  public componentUpdate(name, destroy = null) {

    const updater = this.updated.pipe(
      filter(
        (event: any) => {
          console.log('event', event);
          return event.target === 'component' && event.payload.name === name;
        }
      ),
      map((event: any) => {
        return event.payload;
      })
    );

    return destroy ? updater.pipe(takeUntil(destroy)) : updater;
  }

  public subscribeToRouteChange() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this._activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary')
      )
      .subscribe(this.setupActivatedRoute.bind(this));
  }

  public setActiveUrlAsStop() {
    if (this.stopBackToUrls.indexOf(this.activeRoutePath) === -1) {
      this.stopBackToUrls.push(this.activeRoutePath);
    }
  }

  public addUrlToStack(url: string) {
    if (this.urlsStack[this.urlsStack.length - 1] !== url) {
      this.urlsStack.push(url);
    }

    this._lastOperationIsBack = false;
  }

  /**
   * Remove all information about stacked pages and handlers
   */
  public resetStack() {
    for (const key in this._handlers) {
      if (this._handlers.hasOwnProperty(key)) {
        // Destroy component
        this.deactivateOutlet(this._handlers[key])
      }
    }
    this._handlers = {};
    this.urlsStack.length = 0;
    this._routeInfo.length = 0;
    this._isBackNavigated = false;
    this.onActionsUpdated.next();
    // this.onStackReset.next(true);
  }

  /**
   * Reset all information about active route
   */
  public resetActiveRoute() {
    this._routeInfo[this.activeRoutePath].reset();
    this.onActionsUpdated.next();
  }

  /**
   * Reset left actions for active route
   */
  public resetLeftActions() {
    this._routeInfo[this.activeRoutePath].resetLeftActions();
    this.onActionsUpdated.next();
  }

  /**
   * Reset right actions for active route
   */
  public resetRightActions() {
    this._routeInfo[this.activeRoutePath].resetRightActions();
    this.onActionsUpdated.next();
  }

  /**
   * Reset drop down menus actions for active route
   */
  public resetDropDownActions() {
    this._routeInfo[this.activeRoutePath].resetDropDownMenuActions();
    this.onActionsUpdated.next();
  }

  /**
   * Get handler by path
   * @param {string} path
   * @returns {DetachedRouteHandle}
   */
  public getHandler(path: string) {
    return this._handlers[path];
  }

  /**
   * Add route handler for path
   * @param {string} path
   * @param {DetachedRouteHandle} handler
   */
  public addHandler(path: string, handler: DetachedRouteHandle) {
    if (this.urlsStack[this.urlsStack.length - 1] === path) { return }
    if (this._isBackNavigated) { this._isBackNavigated = false; return }
    if (handler !== null) {
      this._handlers[path] = handler;
      this.urlsStack.push(path);
    }

  }

  /**
   * Set active route path based on passed route path
   * @param {ActivatedRouteSnapshot} route
   */
  public setActivePath(route: ActivatedRouteSnapshot) {
    this._activeRoutePath.next(this.getFullRoutePath(route));
    this._lastOperationIsBack = false;
  }

  /**
   * Create empty router info if not exists
   */
  public createActiveRouteInfo() {
    this._routeInfo[this.activeRoutePath] = new RouteInfo();
  }

  /**
   * Add new action what will work like dropDownMenu
   * @param id { string }
   * @param icon { string }
   */
  public addDropDownMenu(id, icon) {
    const routeInfo: RouteInfo = this._routeInfo[this.activeRoutePath];
    if (routeInfo && !routeInfo.dropDownMenus.has(id)) {
      routeInfo.addDropDownMenu(id, icon);
    }
  }

  /**
   * Set root param from route data
   * @param isRoot
   */
  public setIsRoot(isRoot) {
    this._routeInfo[this.activeRoutePath].isRoot = isRoot;
  }

  /**
   * Set action (function) for current active page
   * @param action { UrlInfoAction }
   * @param group { string }
   */
  public setAction(action: UrlInfoAction, group = 'default') {
    this.addActionToRouteInfo(action, action.group || group);

    this.onActionsUpdated.emit(true);
  }

  /**
   * Set action (function) for current active page
   * @param actions { UrlInfoAction[] }
   * @param group : { string }
   */
  public setActions(actions: UrlInfoAction[], group = 'default') {
    if (actions) {
      actions.forEach((action: UrlInfoAction) => {
        this.addActionToRouteInfo(action, action.group || group);
      })
    }

    this.onActionsUpdated.emit(true);
  }

  /**
   * Get active route info object for header.
   * @returns {any}
   */
  public getActiveRouteInfo() {
    return this._routeInfo[this.activeRoutePath];
  }

  /**
   * Recursevly get full path for route
   * @param {ActivatedRouteSnapshot} route
   * @param {string} path
   * @returns {string}
   */
  public getFullRoutePath(route: ActivatedRouteSnapshot, path = '') {
    // if (route.parent !== null) {
    //   return this.getFullRoutePath(route.parent, path) + '/' + route.url.join('/');
    // } else {
    //   return route.url.join('/')
    // }
    if (route.firstChild) {
      return this.getTailPath(route);
    } else {
      return this.getHeadPath(route);
    }
  }

  public goBack(steps = null) {
    if (steps) {
      window.history.go(-steps);
    } else {
      const prevUrl = this.urlsStack[this.urlsStack.length - 1];
      const delta = this.backDelta(prevUrl, -1);

      this.urlsStack.splice(delta, Math.abs(delta));
      window.history.go(delta);
    }

    this._lastOperationIsBack = true;
  }

  private backDelta(prevUrl, delta) {
    if (prevUrl && this.stopBackToUrls.length > 0) {
      if (this.stopBackToUrls[this.stopBackToUrls.length - 1] === prevUrl) {
        delta -= 1;

        return this.backDelta(this.urlsStack[this.urlsStack.length + delta], delta);
      }
    }

    return delta;

  }

  private getHeadPath(route: ActivatedRouteSnapshot, path = '') {
    if (route.parent !== null) {
      return this.getHeadPath(route.parent, path) + '/' + route.url.join('/');
    } else {
      return route.url.join('/');
    }
  }

  private getTailPath(route: ActivatedRouteSnapshot, path = '') {
    if (route.firstChild) {
      return `/${route.url.join('/')}/${this.getTailPath(route.firstChild, path)}`;
    } else {
      return `${route.url.join('/')}`;
    }
  }

  /**
   * Destroy component
   * @param {DetachedRouteHandle} handle
   */
  private deactivateOutlet(handle: DetachedRouteHandle): void {
    if (handle === null) { return; }
    const componentRef: ComponentRef<any> = handle['componentRef'];
    if (componentRef) {
      componentRef.destroy()
    }
  }

  private addActionToRouteInfo(action: UrlInfoAction, group: any) {
    const actionModel = new NavAction(action);

    if (!action.menu) {
      this._routeInfo[this.activeRoutePath].addAction(actionModel, group);
    } else {
      this._routeInfo[this.activeRoutePath].addActionToDropDownMenu(actionModel, group);
    }
  }

  private setupActivatedRoute(event) {
    this.components.clear();

    if (!this.lastOperationIsBack) {
      this.addUrlToStack(this.activeRoutePath);

    }
    this.setActivePath(event.snapshot);
    this.createActiveRouteInfo();

    const isRoot = event && event.data && (event.data as any).fsNavRoot;

    this.setIsRoot(isRoot);
  }
}
