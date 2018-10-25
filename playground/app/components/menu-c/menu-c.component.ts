import { Component, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../src';


@Component({
  templateUrl: 'menu-c.component.html'
})
export class MenuCComponent implements OnInit {

  constructor(
    public stack: FsNavStackService) {}

  ngOnInit() {
    this.stack.setTitle('Menu C');
  }
}

