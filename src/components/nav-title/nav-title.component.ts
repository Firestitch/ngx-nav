import { OnInit, Component, OnDestroy, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { FsNavStackService } from '../../services';


@Component({
  selector: '[fsNavTitle]',
  template: '{{ activeRouteInfo?.title }}'
})
export class FsNavTitleComponent implements OnInit, OnDestroy {

  @HostBinding('class.fs-nav-title') public selfClass = true;
  public activeRouteInfo;
  public routerChangesSubscription;

  constructor(public stack: FsNavStackService, public router: Router) {
  }

  public ngOnInit() {
    this.activeRouteInfo = this.stack.getActiveRouteInfo();

    this.routerChangesSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
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
