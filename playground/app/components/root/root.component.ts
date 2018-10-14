import { Component, OnInit } from '@angular/core';
import { Nav } from '../../../../src';


@Component({
  templateUrl: 'root.component.html'
})
export class RootComponent implements OnInit {

  constructor(
    public nav: Nav) {}

  ngOnInit() {
    this.nav.setTitle('Root');
  }
}
