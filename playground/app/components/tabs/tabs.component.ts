import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsNavService } from '@firestitch/nav';


@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent implements OnInit, OnDestroy{

  private _destroy$ = new Subject();

  constructor(private nav: FsNavService) {}

  public tabs = [
    { path: '/tabs/a', label: 'Tab A' },
    { path: '/tabs/b', label: 'Tab B' },
    { path: '/tabs/c', label: 'Tab C' },
    { path: '/tabs/d', label: 'Tab D' }
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
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _updateTitle() {
    this.nav.setTitle('Tabs');
  }
}
