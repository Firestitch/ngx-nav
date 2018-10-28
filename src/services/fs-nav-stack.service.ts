import { ComponentRef, EventEmitter, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  NavigationEnd,
  Router
} from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter, map } from 'rxjs/operators';

import { FsNavComponents, FsNavActions } from '../classes';
import { FsNavUpdatesService } from './fs-nav-updates.service';
import { FsNavMenus } from '../classes/nav-menus';


@Injectable()
export class FsNavStackService {

  public onActionsUpdated = new EventEmitter();

  // public onStackReset = new EventEmitter();
  public urlsStack: string[] = [];
  public stopBackToUrls: any[] = [];
  public components = new FsNavComponents(this._navUpdates);
  public actions = new FsNavActions(this._navUpdates);
  public menus = new FsNavMenus(this._navUpdates);

  private _activeRoutePath = new BehaviorSubject('');
  private _isBackNavigated = false;
  private _lastOperationIsBack = false;
  private _handlers: {[key: string]: DetachedRouteHandle} = {};

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navUpdates: FsNavUpdatesService,
  ) {
    this.subscribeToRouteChange();
  }

  get activeRoutePath() {
    return this._activeRoutePath.getValue();
  }

  get lastOperationIsBack() {
    return this._lastOperationIsBack;
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
    this._isBackNavigated = false;
    this.onActionsUpdated.next();
    // this.onStackReset.next(true);
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
   * Recursevly get full path for route
   * @param {ActivatedRouteSnapshot} route
   * @param {string} path
   * @returns {string}
   */
  public getFullRoutePath(route: ActivatedRouteSnapshot, path = '') {
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

  private setupActivatedRoute(event) {
    this.components.clear();
    this.actions.clear();
    this.menus.clear();

    if (!this.lastOperationIsBack) {
      this.addUrlToStack(this.activeRoutePath);

    }
    this.setActivePath(event.snapshot);

    // const isRoot = event && event.data && (event.data as any).fsNavRoot;
    // this.setIsRoot(isRoot);
  }
}
