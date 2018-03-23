import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import { pairwise } from 'rxjs/operators';

import { FsNavRouteHandleService } from '../../services';
import { UrlInfo } from '../../interfaces';
import { NavAction } from '../../models';



@Component({
  selector: '[fsNavActions]',
  templateUrl: 'nav-actions.component.html'
})
export class FsNavActionsComponent implements OnInit, OnDestroy {

  public routeInfo: UrlInfo = {};
  public actions: NavAction[];
  public menuActions: NavAction[];

  private _routerSubscription;

  constructor(private _router: Router,
              private _stack: FsNavRouteHandleService) {}

  public ngOnInit() {
    this._routerSubscription = this._router.events
      .pipe(pairwise())
      .subscribe(([prevRouteEvent, currRouteEvent]) => {
        if (currRouteEvent instanceof NavigationEnd) {
          this.routeInfo = this._stack.getActiveRouteInfo();
        }
    });
  }

  public ngOnDestroy() {
    this._routerSubscription.unsubscribe();
  }
}
