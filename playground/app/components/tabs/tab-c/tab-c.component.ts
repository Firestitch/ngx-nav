import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nav } from '../../../../../src/services';
import { ActionType } from '../../../../../src/models';

@Component({
  selector: 'static-page',
  templateUrl: 'tab-c.component.html',
  styleUrls: [ 'tab-c.component.scss' ]
})
export class TabCComponent implements OnInit, OnDestroy {

  constructor(private nav: Nav) {

  }

  public ngOnInit() {
    // this.nav.setTitle('Tab C','Tab C Super Title','Tab C Subtile');


    // this.nav.setActions([
    //   {
    //     label: 'My Link',
    //     icon: 'menu',
    //     url: '/tabs/data-inputs'
    //   },
    //   {
    //     type: ActionType.basic,
    //     label: 'SVG label',
    //     className: 'my-svg-icon',
    //     image: '/assets/test.svg',
    //     click: () => {
    //       console.log('go to url from SVG!');
    //     }
    //   }
    // ]);
  }

  public ngOnDestroy() {
  }
}
