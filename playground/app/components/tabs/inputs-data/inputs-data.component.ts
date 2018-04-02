import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavRouteHandleService } from '../../../../../src/services';
import { ActionType, Placement } from '../../../../../src/models';

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

    // this.stack.setAction(() => {
    //   console.log('Action "Data inputs" was clicked');
    // });

    // this.stack.setAction({
    //   menu: false,
    //   label: 'Save',
    //   class: 'md-primary',
    //   type: ActionType.raised,
    //   click: function () {
    //     console.log('Clicked Saved');
    //   }
    // });

    this.stack.setActions([
      // Save text button placed outside of menu
      {
        menu: false,
        label: 'Save',
        className: 'mat-primary',
        click: function () {
          console.log('Clicked Saved');
        }
      },
      // Download icon button placed outside of menu
      {
        icon: 'file_download',
        menu: false,
        type: ActionType.icon,
        click: function () {
          console.log('Clicked Download');
        }
      },
      // Settings icon button placed outside of menu
      {
        icon: 'settings',
        label: 'Settings',
        click: function () {
          console.log('Clicked Settings');
        }
      },
      // Edit text menu item placed inside menu
      {
        label: 'Edit',
        menu: true,
        url: 'tabs/list'
      },
      // Delete icon/text menu item placed inside menu
      {
        label: 'Delete',
        icon: 'delete',
        menu: true,
        click: function () {
          console.log('Clicked Delete');
        }
      },
       // Menu icon placed on the left side
      {
        icon: 'menu',
        placement: Placement.left,
        type: ActionType.icon,
        click: function () {
          console.log('Clicked Menu');
        }
      },
    ]);

    console.log('init inputs page');
  }

  public ngOnDestroy() {
    console.log('destroy inputs page');
  }
}
