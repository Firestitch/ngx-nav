import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { FsNavService } from '../../../../src/services';


@Component({
  selector: 'super-tabs',
  templateUrl: 'super-tabs.component.html'
})
export class SuperTabsComponent implements OnDestroy{

  public routerSubscription;

  constructor(private nav: FsNavService,
              private router: Router) {

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.nav.setTitle('Tabs');
      });
  }

  public tabs = [
    { path: '/super-tabs/a', label: 'Tab A' },
    { path: '/super-tabs/b', label: 'Tab B' },
    { path: '/super-tabs/c', label: 'Tab C' },
    { path: '/super-tabs/d', label: 'Tab D' }
  ];

  public ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
