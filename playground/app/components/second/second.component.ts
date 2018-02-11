import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'second',
  templateUrl: 'second.component.html'
})
export class SecondComponent implements OnInit, OnDestroy {

  public ngOnInit() {
    console.log('init second');
  }

  public ngOnDestroy() {
    console.log('destroy second');
  }
}
