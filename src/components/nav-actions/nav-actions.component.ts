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
  public actions: NavAction[];
  public menuActions: NavAction[];

  public showActions = false;
  public showMenu = false;

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

        if (this.placement === 'menu') {
          this.isHidden = !(this.menuActions.length > 0);
        } else {
          this.isHidden = !(this.actions.length > 0);
        }
      });
  }

  private updateActions() {
    switch (this.placement) {
      case 'left': {
        this.actions = this.routeInfo.leftActions;
        this.isHidden = !(this.actions.length > 0)
      } break;

      case 'menu': {
        this.menuActions = this.routeInfo.menuActions;
        this.isHidden = !(this.menuActions.length > 0)
      } break;

      default: {
        this.actions = this.routeInfo.actions;
        this.isHidden = !(this.actions.length > 0)
      }
    }
  }
}
