import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../src';


@Component({
  selector: 'main',
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit, OnDestroy{
  
  constructor(
    public stack: FsNavRouteHandleService) {}
  
  public ngOnInit() {
    this.stack.hideBack();
    console.log('init main');
  }

  public ngOnDestroy() {
    console.log('destroy main');
  }
}
