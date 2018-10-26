import { Component, OnInit } from '@angular/core';
import { FsNavService } from '../../../../src';


@Component({
  templateUrl: 'menu-a.component.html'
})
export class MenuAComponent implements OnInit {

  constructor(public stack: FsNavService) {}

  ngOnInit() {
    this.stack.setTitle('Menu A');
    this.stack.component('avatar', 'test');
  }
}
