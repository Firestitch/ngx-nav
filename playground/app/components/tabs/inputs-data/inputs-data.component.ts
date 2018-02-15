import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../../src/services';

@Component({
  selector: 'inputs-data',
  templateUrl: 'inputs-data.component.html',
  styles: [`
    .example-radio-group {
      display: inline-flex;
      flex-direction: column;
    }
    
    .example-radio-button {
      margin: 5px;
    }
  `]
})
export class InputsDataComponent implements OnInit, OnDestroy {

  constructor(public stack: FsNavRouteHandleService) {

  }

  public ngOnInit() {
    this.stack.setTitle('Data inputs');
    this.stack.setAction(() => {
      console.log('Action "Data inputs" was clicked');
    });

    console.log('init inputs page');
  }

  public ngOnDestroy() {
    console.log('destroy inputs page');
  }
}
