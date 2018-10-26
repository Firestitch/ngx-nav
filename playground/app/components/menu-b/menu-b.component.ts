import { Component, OnInit } from '@angular/core';
import { FsNavService } from '../../../../src';


@Component({
  templateUrl: 'menu-b.component.html'
})
export class MenuBComponent implements OnInit {

  constructor(public stack: FsNavService) {}

  ngOnInit() {
    this.stack.setTitle('Menu B');
  }
}

