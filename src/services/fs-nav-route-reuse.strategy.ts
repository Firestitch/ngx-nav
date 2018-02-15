import { Inject } from '@angular/core';
import {
ActivatedRouteSnapshot,
DetachedRouteHandle,
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

  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle) {
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
    if (!this.isResetTarget(path)) {
      return this.stack.getHandler(path);
    } else {
      return null;
    }
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
    const path = this.stack.getFullRoutePath(curr);

    if (this.isResetTarget(path)) {
      this.resetStack = true;
    }
    return future.routeConfig === curr.routeConfig;
  }

  private isResetTarget(path) {
    return ['/', '/messages'].indexOf(path) > -1;
  }

}
