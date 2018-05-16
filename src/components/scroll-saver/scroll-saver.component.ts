import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { FsNavRouteHandleService } from '../../services';

@Component({
  selector: 'fs-scroll-saver',
  template: ''
})
export class FsScrollSaverComponent implements OnInit, OnDestroy {

  protected _routeScrollPositions: {[url: string]: number}[] = [];
  protected _subscriptions: Subscription[] = [];

  constructor(
    public stack: FsNavRouteHandleService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute) {
      this.stack.router = router;
    }

  public ngOnInit() {
    this._subscriptions.push(
      this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
        if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
          this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
        }
        if (currRouteEvent instanceof NavigationEnd && this._routeScrollPositions[currRouteEvent.url]) {
          // TODO This code provide ability to wait for changing of window height
          // In most cases it enough max 2 iterations.
          // But there is a counter to avoid infinity call of function
          // This hack won't help if loading of page is longer then 5 seconds
          let counter = 0;
          const interval = setInterval( () => {
            if (counter > 10) {
              clearInterval(interval);
            } else {
              window.scrollTo(0, this._routeScrollPositions[currRouteEvent.url] || 0);
              if (window.scrollY === this._routeScrollPositions[currRouteEvent.url]) {
                clearInterval(interval);
              }
            }
            counter++;
          }, 500);
        }
      })
    );

    const changeRouteListener = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .subscribe(this.setupActivatedRoute.bind(this));

    this._subscriptions.push(changeRouteListener);

    // this._subscriptions.push(
    //   this.stack.onStackReset.subscribe(() => {
    //     this._routeScrollPositions = [];
    //   })
    // );
  }

  public ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private setupActivatedRoute(event) {
    this.stack.setActivePath(event.snapshot);
    this.stack.createActiveRouteInfo();
    const isRoot = event && event.data && (event.data as any).fsNavRoot;
    this.stack.setIsRoot(isRoot);
  }
}
