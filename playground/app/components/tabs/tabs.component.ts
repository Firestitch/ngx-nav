import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nav } from '../../../../src/services';


@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent implements OnInit, OnDestroy{

  constructor(private nav: Nav) {}

  public tabs = [
    { path: '/tabs/a', label: 'Tab A' },
    { path: '/tabs/b', label: 'Tab B' },
    { path: '/tabs/c', label: 'Tab C' },
    { path: '/tabs/d', label: 'Tab D' }
  ];

  public ngOnInit() {
    this.nav.setTitle('Tabs');
  }

  public ngOnDestroy() {

  }
}
