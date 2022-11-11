import { Component, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';


@Component({
  templateUrl: 'menu-b.component.html'
})
export class MenuBComponent implements OnInit {

  constructor(public nav: FsNavService) {}

  ngOnInit() {
    this.nav.setTitle('Menu B', 'Super Title');
  }
}

