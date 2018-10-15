import { Component, OnInit } from '@angular/core';
import { Nav } from '../../../../../src/services';

@Component({
  templateUrl: 'workflow-2.component.html'
})
export class Workflow2Component implements OnInit {

  constructor(private nav: Nav) {}

  public ngOnInit() {
    this.nav.setTitle('Workflow 2');
    this.nav.onBack((data, observer) => {
      // IDEA: Do something to bypass the history: false for the
      observer.next(data);
    });
  }
}
