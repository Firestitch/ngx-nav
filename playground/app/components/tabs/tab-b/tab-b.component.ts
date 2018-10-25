import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../../src/services';

@Component({
  selector: 'list',
  templateUrl: 'tab-b.component.html',
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
export class TabBComponent implements OnInit, OnDestroy {

  constructor(public stack: FsNavStackService) { }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}
