import { Component, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    templateUrl: 'workflow-1.component.html',
    standalone: true,
    imports: [MatButton, RouterLink],
})
export class Workflow1Component implements OnInit {
  nav = inject(FsNavService);


  public ngOnInit() {
    console.log('workflow 1 init');

    this.nav.setTitle('Workflow 1');
  }
}
