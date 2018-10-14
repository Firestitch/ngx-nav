import { Injectable, EventEmitter } from '@angular/core';
import { NavRoute } from './../classes';
import { Nav } from '.';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { NavigationEnd, Router, ActivatedRoute, NavigationStart, ActivatedRouteSnapshot } from '@angular/router';
import { PlatformLocation } from '@angular/common';


@Injectable()
export class NavRouteHandler {

  private inited = false;
  private activeNavRoute: NavRoute = null;
  public onRouteChange = new EventEmitter();
  public navRoutes: NavRoute[] = [];
  public previousNavRoute: NavRoute;

  public back = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private nav: Nav,
    private location: PlatformLocation) {
      this.nav.navRouteHandler = this;
    }

  public init() {

    if (this.inited) {
      this.inited = true;
      return;
    }

    // this.location.onPopState(() => {

    //   if (this.previousNavRoute && this.location.pathname === this.previousNavRoute.url) {
    //     this.navRoutes.pop();
    //     this.setNavRoute(this.navRoutes[this.navRoutes.length - 1]);
    //     this.previousNavRoute = this.navRoutes[this.navRoutes.length - 2];
    //     this.back = true;
    //   }

    //   debugger;

    // });


    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map((event) => {
      let route = this.activatedRoute;
      while (route.firstChild) route = route.firstChild;
      return { event: event, route: route };
    })
    .filter((item) => item.route.outlet === 'primary')
    .subscribe(item => {

      if (this.back) {
        this.back = false;
        return;
      }

      //this.previousNavRoute = this.getActiveNavRoute();

      this.previousNavRoute = this.navRoutes[this.navRoutes.length - 2];
      const navRoute = new NavRoute(item.route.snapshot);

      if (navRoute && navRoute.getData('fsNavRoot')) {
        this.navRoutes = [];
      }

      if(this.previousNavRoute && this.previousNavRoute.url === navRoute.url) {
        this.setNavRoute(this.navRoutes.pop());

        if (this.activeNavRoute.getData('fsNavIgnore')) {
          debugger;
          setTimeout(() => {
            window.history.go(-1);
          },1000);
        }

      } else {
        this.navRoutes.push(navRoute);
        this.setNavRoute(navRoute);
      }
    });
  }

  public navigateBack() {


    //if ((this.navRoutes.length + delta) >= 0) {
      window.history.go(-1);
    //}
  }

  public getActiveNavRoute(): NavRoute {
    return this.activeNavRoute;
  }

  public getNavRoutes(): NavRoute[] {
    return this.navRoutes;
  }

  private setNavRoute(navRoute: NavRoute) {
    this.previousNavRoute = this.activeNavRoute;
    this.activeNavRoute = navRoute;
    this.onRouteChange.emit(this.activeNavRoute);
  }
}
