import { OnInit, Component } from '@angular/core';
import { FsNavRouteHandleService } from '../../services';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: '[fsNavTitle]',
  template: '{{ activeRouteInfo?.title }}'
})
export class FsNavTitleComponent implements OnInit {
  public activeRouteInfo;
  constructor(public stack: FsNavRouteHandleService, public router: Router) {
  }

  public ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe(() => {
        this.activeRouteInfo = this.stack.getActiveRouteInfo();
      });
  }
}
