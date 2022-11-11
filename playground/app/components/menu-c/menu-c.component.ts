import { Component, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';


@Component({
  templateUrl: 'menu-c.component.html'
})
export class MenuCComponent implements OnInit {

  constructor(
    public nav: FsNavService) {}

  ngOnInit() {
    this.nav.setTitle('Menu C','');
  }
}

