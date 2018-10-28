import { Component, OnInit } from '@angular/core';
import { FsNavService } from '../../../../src';


@Component({
  templateUrl: 'menu-a.component.html'
})
export class MenuAComponent implements OnInit {

  constructor(public nav: FsNavService) {}

  ngOnInit() {
    this.nav.setTitle('Menu A');
    this.nav.component('avatar', 'test');
  }
}
