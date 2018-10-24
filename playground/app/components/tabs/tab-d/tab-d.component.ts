import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../../src/services';


@Component({
  templateUrl: 'tab-d.component.html',
  styleUrls: [ 'tab-d.component.scss' ]
})
export class TabDComponent implements OnInit, OnDestroy {

  constructor(public stack: FsNavRouteHandleService) {}

  public ngOnInit() {
    //this.nav.setTitle('Tab D');


  }

  public ngOnDestroy() {

  }
}
