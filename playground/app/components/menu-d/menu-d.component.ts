import { Component, OnInit } from '@angular/core';
import { Nav } from '../../../../src';


@Component({
  templateUrl: 'menu-d.component.html'
})
export class MenuDComponent implements OnInit {

  constructor(
    public nav: Nav) {}

  ngOnInit() {
    this.nav.setTitle('Menu D');
  }
}
