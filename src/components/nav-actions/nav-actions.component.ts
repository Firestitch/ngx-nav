import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Nav } from '../../services';
import { NavRoute, NavBar } from '../../classes';


@Component({
  selector: '[fsNavActions]',
  templateUrl: 'nav-actions.component.html',
  styleUrls: [ 'nav-actions.component.scss' ]
})
export class FsNavActionsComponent implements OnInit, OnDestroy {

  @Input() public placement: string;

  @HostBinding('hidden') public isHidden = true;
  @HostBinding('class.fs-nav-actions') public selfClass = true;

  public actions = [];

  private _routerSubscription;
  private _actionsSubscription;

  constructor(private _router: Router,
              private nav: Nav) {}

  public ngOnInit() {
    this.subscriptions();
  }

  public ngOnDestroy() {
    this._routerSubscription.unsubscribe();
    this._actionsSubscription.unsubscribe();
  }

  public subscriptions() {

    // React when actions was added/deleted and show/hide self component
    this._routerSubscription = this.nav.navRouteHandler.onRouteChange
      .subscribe((navRoute: NavRoute) => {
        this.updateActions(navRoute.navBar);
        this._actionsSubscription = navRoute.navBar.onActionsUpdated
          .subscribe((navBar) => {
            this.updateActions(navBar);
          });
      });
  }

  private updateActions(navBar: NavBar) {
    this.actions = navBar.actions[this.placement];
    this.isHidden = !this.actions || !this.actions;
  }
}
