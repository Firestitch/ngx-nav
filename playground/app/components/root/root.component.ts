import { Component, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';


@Component({
    templateUrl: 'root.component.html',
    standalone: true
})
export class RootComponent implements OnInit {

  constructor(public nav: FsNavService) {}

  ngOnInit() {
    this.nav.setTitle('Root');
  }
}
