import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../../src/services';

@Component({
  selector: 'list',
  templateUrl: 'list.component.html',
  styles: [
    `
    .list-scroll {
      width: 300px;
      height: 250px;
      overflow: scroll;
    }
    `
  ]
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(private stack: FsNavRouteHandleService) {

  }

  public ngOnInit() {
    this.stack.setTitle('List Page');
    this.stack.setAction(() => {
      console.log('Action "List Page" was clicked');
    });

    console.log('init list page');
  }

  public ngOnDestroy() {
    console.log('destroy list page');
  }
}
