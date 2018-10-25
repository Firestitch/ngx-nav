import { Component, OnDestroy } from '@angular/core';
import { FsNavStackService } from '../../../../src/services';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent implements OnDestroy{

  public routerSubscription;

  constructor(private stack: FsNavStackService,
              private router: Router) {

    this.routerSubscription = this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .subscribe(() => {
      this.stack.setTitle('Tabs');
    });
  }

  public tabs = [
    { path: '/tabs/a', label: 'Tab A' },
    { path: '/tabs/b', label: 'Tab B' },
    { path: '/tabs/c', label: 'Tab C' },
    { path: '/tabs/d', label: 'Tab D' }
  ];

  public ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
