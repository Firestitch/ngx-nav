import { Component, OnInit } from '@angular/core';
import { Nav } from '../../../../src';


@Component({
  templateUrl: 'menu-c.component.html'
})
export class MenuCComponent implements OnInit {

  constructor(
    public nav: Nav) {}

  ngOnInit() {
    this.nav.setTitle('Menu C');
  }
}

