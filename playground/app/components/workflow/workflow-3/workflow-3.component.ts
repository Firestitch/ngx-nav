import { Component, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';

@Component({
  templateUrl: 'workflow-3.component.html'
})
export class Workflow3Component implements OnInit {

  constructor(public nav: FsNavService) {}

  public ngOnInit() {
    console.log('workflow 3 init');

    this.nav.setTitle('Workflow 3');

    // this.nav.onBack((data, observer) => {
    //   // IDEA: Do something to bypass the history: false for the
    //   observer.next(data);
    // });
  }
}
