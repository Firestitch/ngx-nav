import { Component, OnDestroy, OnInit } from '@angular/core';
import { Nav } from '../../../../src';


@Component({
  selector: 'main',
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit, OnDestroy{

  constructor(
    public nav: Nav) {}

  public ngOnInit() {
    console.log('init main');
  }

  public ngOnDestroy() {
    console.log('destroy main');
  }
}
