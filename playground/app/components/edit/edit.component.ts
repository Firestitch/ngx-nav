import { Component, OnInit } from '@angular/core';
import { FsNavService } from '../../../../src';


@Component({
  templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

  constructor(public stack: FsNavService) {}

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
