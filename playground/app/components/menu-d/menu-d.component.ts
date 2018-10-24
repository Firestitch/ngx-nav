import { Component, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../src';


@Component({
  templateUrl: 'menu-d.component.html'
})
export class MenuDComponent implements OnInit {

  constructor(public stack: FsNavRouteHandleService) {}

  ngOnInit() {
    this.stack.setTitle('Menu D');
  }
}
