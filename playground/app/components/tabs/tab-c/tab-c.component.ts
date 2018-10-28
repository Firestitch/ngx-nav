import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavActionType, FsNavService } from '../../../../../src';

@Component({
  selector: 'static-page',
  templateUrl: 'tab-c.component.html',
  styleUrls: [ 'tab-c.component.scss' ]
})
export class TabCComponent implements OnInit, OnDestroy {

  constructor(public nav: FsNavService) {

  }

  public ngOnInit() {
    this.nav.setTitles('Tab C', 'Tab C Super Title', 'Tab C Subtile');


    this.nav.setActions('right', [
      {
        label: 'My Link',
        icon: 'menu',
        url: '/tabs/data-inputs'
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
