import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

  public ngOnInit() {
    console.log('init list');
  }

  public ngOnDestroy() {
    console.log('destroy list');
  }
}
