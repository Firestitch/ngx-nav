import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavActionType, FsNavService } from '@firestitch/nav';

@Component({
    selector: 'static-page',
    templateUrl: 'tab-c.component.html',
    styleUrls: ['tab-c.component.scss'],
    standalone: true
})
export class TabCComponent implements OnInit, OnDestroy {

  constructor(public nav: FsNavService) {

  }

  public ngOnInit() {
    this.nav.setActions('right', [
      {
        label: 'My Link',
        icon: 'link',
        url: '/tabs/a'
      },
      {
        type: NavActionType.basic,
        label: 'SVG label',
        className: 'my-svg-icon',
        image: '/assets/test.svg',
        click: () => {
          console.log('go to url from SVG!');
        }
      }
    ]);
  }

  public ngOnDestroy() {
  }
}
