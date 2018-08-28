import { OnInit, Component, OnDestroy, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { FsNavRouteHandleService } from '../../services';


@Component({
  selector: '[fsNavTitle]',
  template: '{{ activeRouteInfo?.title }}'
})
export class FsNavTitleComponent implements OnDestroy {

  @HostBinding('class.fs-nav-title') public selfClass = true;
  public activeRouteInfo;
  public routerChangesSubscription;

  constructor(public stack: FsNavRouteHandleService, public router: Router) {
    this.routerChangesSubscription = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe(() => {
        this.activeRouteInfo = this.stack.getActiveRouteInfo();
      });
  }

  public ngOnDestroy() {
    if (this.routerChangesSubscription) {
      this.routerChangesSubscription.unsubscribe();
    }
  }
}
