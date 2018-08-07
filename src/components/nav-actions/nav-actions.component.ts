import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

import { FsNavRouteHandleService } from '../../services';
import { NavAction, RouteInfo } from '../../models';



@Component({
  selector: '[fsNavActions]',
  templateUrl: 'nav-actions.component.html',
  styleUrls: [ 'nav-actions.component.scss' ]
})
export class FsNavActionsComponent implements OnInit, OnDestroy {

  @Input() public placement: string;

  @HostBinding('hidden') public isHidden = true;

  public routeInfo: RouteInfo;
  public actions: Map<string, NavAction[]>;
  public menuActions: Map<string, NavAction[]>;

  public showActions = false;
  public showMenu = false;
  public groups = [];

  private _routerSubscription;
  private _actionsSubscription;

  constructor(private _router: Router,
              private _stack: FsNavRouteHandleService) {}

  public ngOnInit() {
    this.subscriptions();

    // Predefine bool constants for show/hide target blocks in template
    this.showActions = this.placement === 'left' || this.placement === 'right';
    this.showMenu = this.placement === 'menu';
  }

  public ngOnDestroy() {
    this._routerSubscription.unsubscribe();
    this._actionsSubscription.unsubscribe();
  }

  public subscriptions() {
    // Read actions from active route info
    this._routerSubscription = this._router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.routeInfo = this._stack.getActiveRouteInfo();
        this.updateActions();
      });

    // React when actions was added/deleted and show/hide self component
    this._actionsSubscription = this._stack.onActionsUpdated
      .subscribe(() => {
        this.updateActions();
      });
  }

  private updateActions() {
    switch (this.placement) {
      case 'left': {
        this.groups = Array.from(this.routeInfo.leftActions.keys());
        this.actions = this.routeInfo.leftActions;
      } break;

      case 'menu': {
        this.groups = Array.from(this.routeInfo.menuActions.keys());
        this.menuActions = this.routeInfo.menuActions;
      } break;

      default: {
        this.groups = Array.from(this.routeInfo.actions.keys());
        this.actions = this.routeInfo.actions;
      }
    }

    this.isHidden = !(this.groups.length > 0);
  }
}
