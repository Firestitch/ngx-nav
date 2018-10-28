import { Component, OnInit } from '@angular/core';
import { FsNavService } from '../../../../../src/services';

@Component({
  templateUrl: 'workflow-2.component.html'
})
export class Workflow2Component implements OnInit {

  constructor(public nav: FsNavService) {}

  public ngOnInit() {
    this.nav.setTitle('Workflow 2');
    // this.stack.onBack((data, observer) => {
    //   // IDEA: Do something to bypass the history: false for the
    //   observer.next(data);
    // });
  }
}
