import { Injectable, EventEmitter } from '@angular/core';
import { NavRoute, NavBar } from './../classes';
import { Nav } from '.';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { NavigationEnd, Router, ActivatedRoute, NavigationStart, ActivatedRouteSnapshot } from '@angular/router';
import { PlatformLocation } from '@angular/common';


@Injectable()
export class NavRouteHandler {

  private inited = false;
  public previousNavRoute: NavRoute;
  public activeNavRoute: NavRoute = null;
  public onRouteChange = new EventEmitter();
  public navRoutes: NavRoute[] = [];

  public back = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private nav: Nav,
    private location: PlatformLocation) {
      this.nav.navRouteHandler = this;
      this.nav.navBar = new NavBar();
    }

  public init() {

    if (this.inited) {
      this.inited = true;
      return;
    }

    this.location.onPopState(() => {
      this.back = true;
    });

    this.router.events
    .filter((event) => event instanceof NavigationStart)
    .subscribe(item => {

    });

    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map((event) => {
      let route = this.activatedRoute;
      while (route.firstChild) route = route.firstChild;
      return { event: event, route: route };
    })
    .filter((item) => item.route.outlet === 'primary')
    .subscribe(item => {
      this.nav.navBar.clear();
      const navRoute = new NavRoute(item.route.snapshot);

      // if (navRoute && navRoute.getData('fsNavRoot')) {
      //   this.navRoutes = [];
      // }

      const lastNavRoute = this.navRoutes[this.navRoutes.length - 1];

      if (this.back && lastNavRoute && navRoute.url === lastNavRoute.url) {
        this.back = true;
        this.previousNavRoute = this.navRoutes.pop();

      } else {

        this.previousNavRoute = this.activeNavRoute;

        if (this.previousNavRoute) {
          this.navRoutes.push(this.previousNavRoute);
        }
      }

      this.setNavRoute(navRoute);

      //   // if (this.activeNavRoute.getData('fsNavIgnore')) {
      //   //   debugger;
      //   //   setTimeout(() => {
      //   //     window.history.go(-1);
      //   //   },1000);
      //   // }
      // }

    });
  }

  public navigateBack() {

    this.back = true;
    //if ((this.navRoutes.length + delta) >= 0) {
      window.history.go(-1);
    //}
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
