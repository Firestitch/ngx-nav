import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../../src/services';

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

    console.log('init static page');
  }

  public ngOnDestroy() {
    console.log('destroy static page');
  }
}
