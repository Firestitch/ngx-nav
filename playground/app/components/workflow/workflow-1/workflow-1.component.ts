import { Component, OnInit } from '@angular/core';
import { FsNavService } from '../../../../../src';

@Component({
  templateUrl: 'workflow-1.component.html',
})
export class Workflow1Component implements OnInit {

  constructor(public nav: FsNavService) {

  }

  public ngOnInit() {
    this.nav.setTitle('Workflow 1');
  }
}
