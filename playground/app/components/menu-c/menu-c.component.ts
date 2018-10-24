import { Component, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../src';


@Component({
  templateUrl: 'menu-c.component.html'
})
export class MenuCComponent implements OnInit {

  constructor(
    public stack: FsNavRouteHandleService) {}

  ngOnInit() {
    this.stack.setTitle('Menu C');
  }
}

