import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit, OnDestroy{

  public ngOnInit() {
    console.log('init main');
  }

  public ngOnDestroy() {
    console.log('destroy main');
  }
}
