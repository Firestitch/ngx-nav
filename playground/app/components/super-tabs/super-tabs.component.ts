import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsNavService } from '@firestitch/nav';


@Component({
  selector: 'super-tabs',
  templateUrl: 'super-tabs.component.html'
})
export class SuperTabsComponent implements OnInit, OnDestroy{

  private _destroy$ = new Subject();

  constructor(private nav: FsNavService) {}

  public tabs = [
    { path: '/another-tabs/a', label: 'Tab A' },
    { path: '/another-tabs/b', label: 'Tab B' },
    { path: '/another-tabs/c', label: 'Tab C' },
    { path: '/another-tabs/d', label: 'Tab D' }
  ];

  public ngOnInit() {
    this._updateTitle();

    this.nav.routeChange
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._updateTitle();
      });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _updateTitle() {
    this.nav.setTitle('Another Tabs');
  }
}
