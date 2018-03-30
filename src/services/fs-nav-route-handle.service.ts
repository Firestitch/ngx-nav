import { ComponentRef, EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, Router } from '@angular/router';
import { NavAction, ActionType, Placement, RouteInfo } from '../models';

import { UrlInfoAction } from '../interfaces';


@Injectable()
export class FsNavRouteHandleService {
  public onActionsUpdated = new EventEmitter();
  public onStackReset = new EventEmitter();
  public urlsStack: string[] = [];
  public routeInfo: RouteInfo[] = [];

  private _activeRoutePath = '';
  private _isBackNavigated = false;
  private _handlers: {[key: string]: DetachedRouteHandle} = {};
  private _router: Router;

  constructor() {
  }

  get activeRoutePath() {
    return this._activeRoutePath;
  }

  /**
   * Setter for router. We can't do @Inject because it will create recursive inject
   * @param {Router} value
   */
  set router(value: Router) {
    this._router = value;
  }

  get router() {
    return this._router;
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
    this.routeInfo.length = 0;
    this._isBackNavigated = false;
    this.onStackReset.next(true);
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
    this._activeRoutePath = this.getFullRoutePath(route);
    const isRoot = route && route.data && route.data.fsNavRoot;
    this.setIsRoot(this._activeRoutePath, isRoot);
  }

  /**
   * Create empty router info if not exists
   */
  public createActiveRouteInfo() {
    if (this.routeInfo[this.activeRoutePath]) {
      this.routeInfo[this.activeRoutePath].reset();
    } else {
      this.routeInfo[this.activeRoutePath] = new RouteInfo();
    }
  }

  /**
   * Set title for current active page
   * @param title
   */
  public setTitle(title) {
    this.createActiveRouteInfo();
    this.routeInfo[this.activeRoutePath].title = title
  }

  /**
   * Set root param from route data
   * @param path
   * @param isRoot
   */
  public setIsRoot(path, isRoot) {
    this.createActiveRouteInfo();
    this.routeInfo[path].isRoot = isRoot;
  }

  /**
   * Set action (function) for current active page
   * @param action
   * @param rewriteInfo { boolean } - set false for add actions to existing actions array
   */
  public setAction(action: UrlInfoAction, rewriteInfo = true) {
    if (rewriteInfo) {
      this.createActiveRouteInfo();
    }

    if (!this.actionExists(action)) {
      this.addActionToRouteInfo(action)
    }

    this.onActionsUpdated.emit(true);
  }

  /**
   * Set action (function) for current active page
   * @param actions { UrlInfoAction[] }
   * @param clear { boolean } - set false for add actions to existing actions array
   */
  public setActions(actions: UrlInfoAction[], clear = true) {
    if (clear) {
      this.createActiveRouteInfo();
    }

    if (actions) {
      actions.forEach((action) => {
        if (!this.actionExists(action)) {
          this.addActionToRouteInfo(action);
        }
      })
    }

    this.onActionsUpdated.emit(true);
  }

  /**
   * Get active route info object for header.
   * @returns {any}
   */
  public getActiveRouteInfo() {
    this.createActiveRouteInfo();
    return this.routeInfo[this.activeRoutePath];
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

  public goBack() {
    window.history.back();
    // if (this.urlsStack[this.urlsStack.length - 1] === this.activeRoutePath) {
    //   const url = this.urlsStack.pop();
    //   if (this.urlsStack.indexOf(url) === -1) {
    //     this.deactivateOutlet(this._handlers[url]);
    //     delete this._handlers[url];
    //     delete this.routeInfo[url];
    //   }
    // }
    //
    // this._isBackNavigated = true;
    // return this.urlsStack[this.urlsStack.length - 1] || '/';
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

  private actionExists(targetAction: UrlInfoAction) {
    return this.routeInfo[this.activeRoutePath]
      && (
        this.routeInfo[this.activeRoutePath].actions.some(action => this.compareActions(action , targetAction))
        || this.routeInfo[this.activeRoutePath].menuActions.some(action => this.compareActions(action , targetAction))
        || this.routeInfo[this.activeRoutePath].leftActions.some(action => this.compareActions(action , targetAction))
      );
  }

  private compareActions(action, targetAction) {
    return action.label === targetAction.label &&
      (action.type === targetAction.type || (action.type === ActionType.basic && !targetAction.type)) &&
      action.icon === targetAction.icon;
  }

  private addActionToRouteInfo(action: UrlInfoAction) {
    const actionModel = new NavAction(action);
    if (action.placement == Placement.left) {
      this.routeInfo[this.activeRoutePath].leftActions.push(actionModel);
    } else {
      const target = action.menu ? 'menuActions' : 'actions';
      this.routeInfo[this.activeRoutePath][target].push(actionModel);
    }
  }
}
