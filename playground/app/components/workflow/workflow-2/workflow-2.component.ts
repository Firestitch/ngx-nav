import { Component, OnInit } from '@angular/core';
import { Nav } from '../../../../../src/services';

@Component({
  templateUrl: 'workflow-2.component.html'
})
export class Workflow2Component implements OnInit {

  constructor(private nav: Nav) {}

  public ngOnInit() {
    this.nav.setTitle('Workflow 2');
  }
}
