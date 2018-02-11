import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'big-picture',
  templateUrl: 'big-picture.component.html'
})
export class BigPictureComponent implements OnInit, OnDestroy {

  public ngOnInit() {
    console.log('init big-picture');
  }

  public ngOnDestroy() {
    console.log('destroy big-picture');
  }
}
