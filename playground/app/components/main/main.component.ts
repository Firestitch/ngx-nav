import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';


@Component({
  selector: 'main',
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit, OnDestroy{

  constructor(public nav: FsNavService) {}

  public ngOnInit() {
    console.log('init main');
  }

  public ngOnDestroy() {
    console.log('destroy main');
  }
}
