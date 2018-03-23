import { Inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouteReuseStrategy,
} from '@angular/router';

import { FsNavRouteHandleService } from './fs-nav-route-handle.service';


export class FsNavRouteReuseStrategy implements RouteReuseStrategy {

  public resetStack = false;
  private stack: FsNavRouteHandleService;

  constructor(@Inject(FsNavRouteHandleService) stack) {
    this.stack = stack;
  }

  public shouldDetach(route: ActivatedRouteSnapshot) {
    return !this.resetStack;
  }

  public store(route: ActivatedRouteSnapshot, handle: any) {
    const path = this.stack.getFullRoutePath(route);
    if (!this.resetStack) {
      this.stack.addHandler(path, handle)
    } else if (this.resetStack) {
      this.stack.resetStack();
      this.resetStack = false;
    }
  }

  public shouldAttach(route: ActivatedRouteSnapshot) {
    if (this.resetStack) {
      this.stack.resetStack();
      this.resetStack = false;
      return false;
    } else {
      const path = this.stack.getFullRoutePath(route);
      return !!this.stack.getHandler(path);
    }
  }

  public retrieve(route: ActivatedRouteSnapshot) {
    const path = this.stack.getFullRoutePath(route);
    if (!this.isResetTarget(route)) {
      return this.stack.getHandler(path);
    } else {
      return null;
    }
  }

  public shouldReuseRoute(prev: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
    if (this.isResetTarget(curr)) {
      this.resetStack = true;
    }

    return prev.routeConfig === curr.routeConfig
  }

  private isResetTarget(route) {
    return route.data && route.data.fsNavRoot;
  }

}
