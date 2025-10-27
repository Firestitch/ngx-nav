import { Component, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';


@Component({
    templateUrl: 'root.component.html',
    standalone: true
})
export class RootComponent implements OnInit {
  nav = inject(FsNavService);


  ngOnInit() {
    this.nav.setTitle('Root');
  }
}
