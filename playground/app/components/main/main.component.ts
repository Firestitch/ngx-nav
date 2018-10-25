import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../src';


@Component({
  selector: 'main',
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit, OnDestroy{

  constructor(public stack: FsNavStackService) {}

  public ngOnInit() {
    console.log('init main');
  }

  public ngOnDestroy() {
    console.log('destroy main');
  }
}
