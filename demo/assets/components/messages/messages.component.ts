import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'messages',
  templateUrl: 'messages.component.html'
})
export class MessagesComponent implements OnInit, OnDestroy{

  public ngOnInit() {
    console.log('init messages');
  }

  public ngOnDestroy() {
    console.log('destroy messages');
  }
}
