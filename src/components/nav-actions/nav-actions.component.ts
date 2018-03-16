import {Component, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import { FsNavRouteHandleService } from '../../services';
import { UrlInfo } from '../../interfaces';
import { NavAction } from '../../models';


@Component({
  selector: '[fsNavActions]',
  templateUrl: 'nav-actions.component.html'
})
export class FsNavActionsComponent implements OnInit {

  public routeInfo: UrlInfo = {};
  public actions: NavAction[];
  public menuActions: NavAction[];

  constructor(private _router: Router,
              private _stack: FsNavRouteHandleService) {}

  public ngOnInit() {
    this._router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
      if (currRouteEvent instanceof NavigationEnd) {
        this.routeInfo = this._stack.getActiveRouteInfo();
      }
    });
  }

  @HostListener('click', ['$event'])
  public click() {
    const info = this._stack.getActiveRouteInfo();
    if (info && info.action) {
      info.action();
    }
  }
}
