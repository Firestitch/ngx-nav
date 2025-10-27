import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsNavService } from '@firestitch/nav';
import { MatTabNav, MatTabLink } from '@angular/material/tabs';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';


@Component({
    selector: 'tabs',
    templateUrl: 'tabs.component.html',
    standalone: true,
    imports: [MatTabNav, MatTabLink, RouterLinkActive, RouterLink, RouterOutlet]
})
export class TabsComponent implements OnInit, OnDestroy{
  private nav = inject(FsNavService);


  private _destroy$ = new Subject();

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
