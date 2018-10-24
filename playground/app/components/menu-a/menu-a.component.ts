import { Component, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../src';


@Component({
  templateUrl: 'menu-a.component.html'
})
export class MenuAComponent implements OnInit {

  constructor(public stack: FsNavRouteHandleService) {}

  ngOnInit() {
    this.stack.setTitle('Menu A');
  }
}
