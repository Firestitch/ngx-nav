import { Component, OnInit } from '@angular/core';
import { FsNavService } from '../../../../src';


@Component({
  templateUrl: 'menu-d.component.html'
})
export class MenuDComponent implements OnInit {

  constructor(public stack: FsNavService) {}

  ngOnInit() {
    this.stack.setTitle('Menu D');
  }
}
