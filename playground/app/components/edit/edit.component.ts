import { Component, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../src';


@Component({
  templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

  constructor(public stack: FsNavRouteHandleService) {}

  ngOnInit() {
    this.stack.setTitle('Edit');
  }

  save() {
    alert('Saved');
  }

  cancel() {
    this.stack.goBack();
  }
}
