import { Component, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../src';


@Component({
  templateUrl: 'root.component.html'
})
export class RootComponent implements OnInit {

  constructor(public stack: FsNavRouteHandleService) {}

  ngOnInit() {
    this.stack.setTitle('Root');
  }
}
