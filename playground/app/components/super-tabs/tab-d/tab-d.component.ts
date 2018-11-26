import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavService } from '../../../../../src/services';


@Component({
  templateUrl: 'tab-d.component.html',
})
export class SuperTabDComponent implements OnInit, OnDestroy {

  constructor(public nav: FsNavService) {}

  public ngOnInit() {}

  public ngOnDestroy() {

  }
}
