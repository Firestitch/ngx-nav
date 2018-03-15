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

    // this.stack.setAction({
    //   menu: false,
    //   label: 'Save',
    //   class: 'md-primary',
    //   click: function () {
    //     console.log('Clicked Saved');
    //   }
    // });    

    // this.stack.setActions([
    //   //Save text button placed outside of menu
    //   {
    //     menu: false,
    //     label: 'Save',
    //     class: 'md-primary',
    //     click: function () {
    //       console.log('Clicked Saved');
    //     }
    //   },
    //   //Settings icon button placed outside of menu
    //   {
    //     icon: 'settings',        
    //     label: 'Settings',
    //     click: function () {
    //       console.log('Clicked Settings');
    //     }
    //   },
    //   //Edit text menu item placed inside menu
    //   {
    //     label: 'Edit',
    //     menu: true,
    //     click: function () {
    //       console.log('Clicked Edit');
    //     }
    //   },
    //   //Delete icon/text menu item placed inside menu
    //   {
    //     label: 'Delete',
    //     icon: 'delete',
    //     menu: true,
    //     click: function () {
    //       console.log('Clicked Delete');
    //     }
    //   }
    // ]);

    console.log('init inputs page');
  }

  public ngOnDestroy() {
    console.log('destroy inputs page');
  }
}
