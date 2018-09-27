import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../../src/services';
import { ActionType } from '../../../../../src/models';

@Component({
  selector: 'static-page',
  templateUrl: 'static-page.component.html',
  styleUrls: [ 'static-page.component.scss' ]
})
export class StaticPageComponent implements OnInit, OnDestroy {

  constructor(private stack: FsNavRouteHandleService) {

  }

  public ngOnInit() {
    this.stack.setTitle('Static Page','Static Page Super Title','Static Page Subtile');


    this.stack.setActions([
      {
        label: 'My Link',
        icon: 'menu',
        url: '/tabs/data-inputs'
      },
      {
        type: ActionType.basic,
        label: 'SVG label',
        className: 'my-svg-icon',
        image: '/assets/test.svg',
        click: () => {
          console.log('go to url from SVG!');
        }
      }
    ]);

    console.log('init static page');
  }

  public ngOnDestroy() {
    console.log('destroy static page');
  }
}
