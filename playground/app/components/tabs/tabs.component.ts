import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent implements OnInit, OnDestroy{

  public tabs = [
    { path: '/tabs/list', label: 'Long list' },
    { path: '/tabs/big-picture', label: 'Big Picture' },
    { path: '/tabs/data-inputs', label: 'Data & inputs' }
  ];

  public ngOnInit() {
    console.log('init tabs');
  }

  public ngOnDestroy() {
    console.log('destroy tabs');
  }
}
