import { Component, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';


@Component({
  templateUrl: 'menu-d.component.html'
})
export class MenuDComponent implements OnInit {

  constructor(public nav: FsNavService) {}

  ngOnInit() {
    this.nav.setTitle('Menu D');
  }
}
