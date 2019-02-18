import { Component } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { clone } from 'lodash';

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.scss']
})
export class NavigationComponent {

  public navRoutes = [];
  constructor(
    public stack: FsNavService
  ) {

    this.stack.routeChange.subscribe(() => {
      this.navRoutes = this.stack.urlsStack.reverse();
    })
  }
}
