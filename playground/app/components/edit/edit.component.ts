import { Component, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../src';


@Component({
  templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

  constructor(public stack: FsNavStackService) {}

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
