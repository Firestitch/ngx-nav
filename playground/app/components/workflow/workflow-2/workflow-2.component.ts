import { Component, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    templateUrl: 'workflow-2.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class Workflow2Component implements OnInit {
  nav = inject(FsNavService);


  public ngOnInit() {
    console.log('workflow 2 init');

    this.nav.setTitle('Workflow 2');

    // this.stack.onBack((data, observer) => {
    //   // IDEA: Do something to bypass the history: false for the
    //   observer.next(data);
    // });
  }
}
