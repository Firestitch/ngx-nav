import { ComponentRef, EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, Router } from '@angular/router';

@Injectable()
export class FsNavRouteHandleService {
  public onStackReset = new EventEmitter();
  public urlsStack: string[] = [];
  public urlsInfo = [];

  private _activeRoutePath = '';

  private _handlers: {[key: string]: DetachedRouteHandle} = {};
  private _router: Router;

  constructor() {
  }

  /**
   * Setter for router. We can't do @Inject because it will create recursive inject
   * @param {Router} value
   */
  set router(value: Router) {
    this._router = value;
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
    this.urlsInfo.length = 0;
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
    this._handlers[path] = handler;
    this.urlsStack.push(path);
  }

  /**
   * Set active route path based on passed route path
   * @param {ActivatedRouteSnapshot} route
   */
  public setActivePath(route: ActivatedRouteSnapshot) {
    this._activeRoutePath = this.getFullRoutePath(route);
  }

  /**
   * Create empty router info if not exists
   */
  public createActiveRouteInfo() {
    if (!this.urlsInfo[this._activeRoutePath]) { this.urlsInfo[this._activeRoutePath] = {} }
  }

  /**
   * Set title for current active page
   * @param title
   */
  public setTitle(title) {
    debugger;
    this.createActiveRouteInfo();
    this.urlsInfo[this._activeRoutePath].title = title
  }

  /**
   * Set action (function) for current active page
   * @param action
   */
  public setAction(action) {
    this.createActiveRouteInfo();
    this.urlsInfo[this._activeRoutePath].action = action;
  }

  /**
   * Get active route info object for header.
   * @returns {any}
   */
  public getActiveRouteInfo() {
    this.createActiveRouteInfo();
    return this.urlsInfo[this._activeRoutePath];
  }

  /**
   * Recursevly get full path for route
   * @param {ActivatedRouteSnapshot} route
   * @param {string} path
   * @returns {string}
   */
  public getFullRoutePath(route: ActivatedRouteSnapshot, path = '') {
    if (route.parent !== null) {
      return this.getFullRoutePath(route.parent, path) + '/' + route.url.join('/');
    } else {
      return route.url.join('/')
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
}
