import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'third',
  templateUrl: 'third.component.html'
})
export class ThirdComponent implements OnInit, OnDestroy {

  public ngOnInit() {
    console.log('init third');
  }

  public ngOnDestroy() {
    console.log('destroy third');
  }
}
