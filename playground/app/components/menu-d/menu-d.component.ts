import { Component, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../src';


@Component({
  templateUrl: 'menu-d.component.html'
})
export class MenuDComponent implements OnInit {

  constructor(public stack: FsNavStackService) {}

  ngOnInit() {
    this.stack.setTitle('Menu D');
  }
}
