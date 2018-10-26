import { Component, OnInit } from '@angular/core';
import { FsNavService } from '../../../../src';


@Component({
  templateUrl: 'menu-c.component.html'
})
export class MenuCComponent implements OnInit {

  constructor(
    public stack: FsNavService) {}

  ngOnInit() {
    this.stack.setTitle('Menu C');
  }
}

