import { Component, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';

@Component({
  templateUrl: 'workflow-1.component.html',
})
export class Workflow1Component implements OnInit {

  constructor(public nav: FsNavService) {}

  public ngOnInit() {
    console.log('workflow 1 init');

    this.nav.setTitle('Workflow 1');
  }
}
