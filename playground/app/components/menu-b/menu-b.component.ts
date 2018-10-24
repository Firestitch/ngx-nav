import { Component, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../src';


@Component({
  templateUrl: 'menu-b.component.html'
})
export class MenuBComponent implements OnInit {

  constructor(public stack: FsNavRouteHandleService) {}

  ngOnInit() {
    this.stack.setTitle('Menu B');
  }
}

