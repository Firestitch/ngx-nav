import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';

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

  constructor(public nav: FsNavService) { }

  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}
