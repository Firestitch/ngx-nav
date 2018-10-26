import { Component, OnInit } from '@angular/core';
import { FsNavService } from '../../../../src';


@Component({
  templateUrl: 'root.component.html'
})
export class RootComponent implements OnInit {

  constructor(public stack: FsNavService) {}

  ngOnInit() {
    this.stack.setTitle('Root');
  }
}
