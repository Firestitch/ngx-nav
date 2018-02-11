import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'inputs-data',
  templateUrl: 'inputs-data.component.html'
})
export class InputsDataComponent implements OnInit, OnDestroy {

  public ngOnInit() {
    console.log('init inputs-data');
  }

  public ngOnDestroy() {
    console.log('destroy inputs-data');
  }
}
