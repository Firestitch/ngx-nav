import { Component, OnInit } from '@angular/core';
import { Nav } from '../../../../src';


@Component({
  templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

  constructor(
    public nav: Nav) {}

  ngOnInit() {
    this.nav.setTitle('Edit');
  }

  save() {
    alert('Saved');
  }

  cancel() {
    this.nav.navigateBack();
  }
}
