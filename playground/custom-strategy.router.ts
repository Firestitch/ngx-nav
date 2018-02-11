// This impl. bases upon one that can be found in the router's test cases.
import {
  ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy,
  UrlSegment
} from '@angular/router';

export class CustomReuseStrategy implements RouteReuseStrategy {

  // handlers: {[key: string]: DetachedRouteHandle} = {};
  handlersStack: any = [];
  leaved = void 0;
  param = false;

  //////
  handlers = new Handlers();
  activatedLevel = void 0;

  ////


  constructor() {
   // setInterval(() => {
   //   console.log(this.handlersStack);
   // }, 2000);
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    debugger;
    // if (this.param) {
    //   const currUrl = route.url.join('/');
    //   let prevUrl = void 0;
    //   if (this.handlersStack[this.handlersStack.length - 1]) {
    //     prevUrl = this.handlersStack[this.handlersStack.length - 1].route.value.snapshot.url.join('/');
    //   }
    //
    //   if (prevUrl !== currUrl) {
    //     // this.handlersStack.pop();
    //     return false;
    //   }
    // }
    // console.log('detach', this.activatedLevel >= this.handlers.getLevel(route.url));
    return this.activatedLevel >= this.handlers.getLevel(route.url);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // const prevHandler = this.handlersStack[this.handlersStack.length - 1];
    // let prevUrl;
    // if (this.handlersStack[this.handlersStack.length - 1]) {
    //   prevUrl = this.handlersStack[this.handlersStack.length - 1].route.value.snapshot.url.join('/');
    // }
    // if (handle && handle !== prevHandler && !this.param && prevUrl !== route.url.join('/')) {
    //   this.handlersStack.push(handle);
    // } else {
    //   this.param = false;
    // }
    debugger;
    this.handlers.pushForLevel(route.url, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // const currUrl = route.url.join('/');
    // let tt = false;
    // debugger;
    // if (this.handlersStack[this.handlersStack.length - 2]) {
    //   if (this.handlersStack[this.handlersStack.length - 2].route.value.snapshot.url.join('/') === currUrl) {
    //     tt = true;
    //   }
    // }
    //
    // if (this.handlersStack[this.handlersStack.length - 1]) {
    //   if (this.handlersStack[this.handlersStack.length - 1].route.value.snapshot.url.join('/') === currUrl) {
    //     tt = true
    //   }
    // }

    // console.log('attach', !!route.routeConfig && this.handlers.getForLevel(route.url));
    return !!route.routeConfig && this.handlers.getForLevel(route.url);

    // return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) return null;
    debugger;
    this.activatedLevel = this.handlers.getLevel(route.url);
    return this.handlers.getForLevel(route.url);
    //
    // debugger;
    // const currUrl = route.url.join('/');
    //
    // let handler = null;
    // if (this.handlersStack[this.handlersStack.length - 2]) {
    //   if (this.handlersStack[this.handlersStack.length - 2].route.value.snapshot.url.join('/') === currUrl) {
    //     this.param = true;
    //     handler = this.handlersStack[this.handlersStack.length - 2];
    //   }
    // }
    //
    // if (this.handlersStack[this.handlersStack.length - 1]) {
    //   if (this.handlersStack[this.handlersStack.length - 1].route.value.snapshot.url.join('/') === currUrl) {
    //     this.param = true;
    //     handler = this.handlersStack[this.handlersStack.length - 1];
    //   } else if(handler) {
    //     this.handlersStack.pop();
    //   }
    // }
    //
    // if (!handler) {
    //   return null;
    // } else {
    //   return handler;
    // }

    // return this.handlers[route.url.join('/') || route.parent.url.join('/')];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    debugger;
    return future.routeConfig === curr.routeConfig;
  }

}


export class Handlers {
  private _handlers = {};

  public pushForLevel(segments: UrlSegment[], handler: DetachedRouteHandle) {
    const level = this.getLevel(segments);
    if (!this._handlers[level]) { this._handlers[level] = {} }

    this._handlers[level][segments.join('/')] = handler;
  }

  public getForLevel(segments: UrlSegment[]) {
    const level = this.getLevel(segments);
    if (!this._handlers[level]) { return false; }

    const levelStack = this._handlers[level];

    return levelStack[segments.join('/')] || null
  }

  public getLevel(segments: UrlSegment[]) {
    if (Array.isArray(segments)) {
      return segments.length;
    } else {
      throw Error('Wrong segments for router strategy')
    }
  }
}
