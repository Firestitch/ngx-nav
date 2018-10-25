import { Component, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../src';


@Component({
  templateUrl: 'menu-b.component.html'
})
export class MenuBComponent implements OnInit {

  constructor(public stack: FsNavStackService) {}

  ngOnInit() {
    this.stack.setTitle('Menu B');
  }
}

