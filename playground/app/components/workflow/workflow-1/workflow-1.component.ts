import { Component, OnInit } from '@angular/core';
import { Nav } from '../../../../../src/services';

@Component({
  templateUrl: 'workflow-1.component.html',
})
export class Workflow1Component implements OnInit {

  constructor(public nav: Nav) {

  }

  public ngOnInit() {
    this.nav.setTitle('Workflow 1');
  }
}
