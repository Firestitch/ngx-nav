import { Component, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    templateUrl: 'workflow-3.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class Workflow3Component implements OnInit {
  nav = inject(FsNavService);


  public ngOnInit() {
    console.log('workflow 3 init');

    this.nav.setTitle('Workflow 3');

    // this.nav.onBack((data, observer) => {
    //   // IDEA: Do something to bypass the history: false for the
    //   observer.next(data);
    // });
  }
}
