import { Component, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { clone } from 'lodash';
import { HeaderComponent } from '../header/header.component';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatList, MatListItem } from '@angular/material/list';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss'],
    standalone: true,
    imports: [HeaderComponent, MatButton, RouterLink, RouterOutlet, MatList, MatListItem, JsonPipe]
})
export class NavigationComponent {
  stack = inject(FsNavService);


  public navRoutes = [];
  constructor() {

    this.stack.routeChange.subscribe(() => {
      this.navRoutes = this.stack.urlsStack.reverse();
    })
  }
}
