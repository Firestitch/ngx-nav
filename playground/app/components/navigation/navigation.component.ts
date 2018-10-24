import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FsNavRouteHandleService } from '../../../../src';
import { clone } from 'lodash';

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.scss']
})
export class NavigationComponent {

  public navRoutes = [];
  constructor(
    public stack: FsNavRouteHandleService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute) {

      // this.sta.navRouteHandler.onRouteChange
      //   .subscribe(() => {
      //     this.navRoutes = clone(this.nav.navRouteHandler.navRoutes).reverse();
      //     //this.navRoutes = this.nav.navRouteHandler.navRoutes;
      //   });
  }
}
