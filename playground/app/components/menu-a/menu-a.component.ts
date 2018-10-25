import { Component, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../src';


@Component({
  templateUrl: 'menu-a.component.html'
})
export class MenuAComponent implements OnInit {

  constructor(public stack: FsNavStackService) {}

  ngOnInit() {
    this.stack.setTitle('Menu A');
  }
}
