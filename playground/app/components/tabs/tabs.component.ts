import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent implements OnInit, OnDestroy{

  public tabs = [
    { path: '/tabs/data-inputs', label: 'Inputs Page' },
    { path: '/tabs/list', label: 'List Page' },
    { path: '/tabs/static-page', label: 'Static Page' }
  ];

  public ngOnInit() {
    console.log('init tabs');
  }

  public ngOnDestroy() {
    console.log('destroy tabs');
  }
}
