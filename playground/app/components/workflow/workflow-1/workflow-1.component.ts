import { Component, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../../src';

@Component({
  templateUrl: 'workflow-1.component.html',
})
export class Workflow1Component implements OnInit {

  constructor(public stack: FsNavStackService) {

  }

  public ngOnInit() {
    this.stack.setTitle('Workflow 1');
  }
}
