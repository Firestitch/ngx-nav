import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../../src/services';
import { ActionType } from '../../../../../src/models';

@Component({
  selector: 'static-page',
  templateUrl: 'static-page.component.html'
})
export class StaticPageComponent implements OnInit, OnDestroy {

  constructor(private stack: FsNavRouteHandleService) {

  }

  public ngOnInit() {
    this.stack.setTitle('Static Page');
    // this.stack.setAction(() => {
    //   console.log('Action "Static Page" was clicked');
    // });

    this.stack.setAction({
      type: ActionType.url,
      label: 'My Link',
      icon: 'menu'
    });

    console.log('init static page');
  }

  public ngOnDestroy() {
    console.log('destroy static page');
  }
}
