import { Component, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../src';


@Component({
  templateUrl: 'root.component.html'
})
export class RootComponent implements OnInit {

  constructor(public stack: FsNavStackService) {}

  ngOnInit() {
    this.stack.setTitle('Root');
  }
}
