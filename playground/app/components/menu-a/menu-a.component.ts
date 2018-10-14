import { Component, OnInit } from '@angular/core';
import { Nav } from '../../../../src';


@Component({
  templateUrl: 'menu-a.component.html'
})
export class MenuAComponent implements OnInit {

  constructor(
    public nav: Nav) {}

  ngOnInit() {
    this.nav.setTitle('Menu A');
  }
}
