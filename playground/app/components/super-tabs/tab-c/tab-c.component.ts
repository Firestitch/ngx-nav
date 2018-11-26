import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavService } from '../../../../../src';

@Component({
  selector: 'super-tab-c',
  templateUrl: 'tab-c.component.html',
})
export class SuperTabCComponent implements OnInit, OnDestroy {

  constructor(public nav: FsNavService) {

  }

  public ngOnInit() {}

  public ngOnDestroy() {}
}
