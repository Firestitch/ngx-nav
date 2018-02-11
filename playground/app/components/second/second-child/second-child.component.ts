import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'second-child',
  templateUrl: 'second-child.component.html'
})
export class SecondChildComponent implements OnInit, OnDestroy {

  public ngOnInit() {
    console.log('init second-child');
  }

  public ngOnDestroy() {
    console.log('destroy second-child');
  }
}
