import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavStackService } from '../../../../../src/services';
import { ActionType } from '../../../../../src/models';

@Component({
  selector: 'inputs-data',
  templateUrl: 'tab-a.component.html',
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
export class TabAComponent implements OnInit, OnDestroy {

  constructor(public stack: FsNavStackService) {

  }

  public ngOnInit() {
    //this.nav.setTitle('Tab A');

    // this.nav.setAction(() => {
    //   console.log('Action "Data inputs" was clicked');
    // });

    // this.nav.setAction({
    //   menu: false,
    //   label: 'Save',
    //   class: 'md-primary',
    //   type: ActionType.raised,
    //   click: function () {
    //     console.log('Clicked Saved');
    //   }
    // });

    // // Custom drop down menu
    // this.nav.addDropDownMenu('share', 'share');

    // Actions
    // this.stack.setActions([
    //   // Save text button placed outside of menu
    //   {
    //     menu: false,
    //     label: 'Save',
    //     className: 'mat-primary',
    //     click: function () {
    //       console.log('Clicked Saved');
    //     }
    //   },
    //   // Download icon button placed outside of menu
    //   {
    //     icon: 'file_download',
    //     menu: false,
    //     type: ActionType.icon,
    //     click: function () {
    //       console.log('Clicked Download');
    //     }
    //   },
    //   // Settings icon button placed outside of menu
    //   {
    //     icon: 'settings',
    //     label: 'Settings',
    //     click: function () {
    //       console.log('Clicked Settings');
    //     }
    //   },
    //   // Extra dropdown menu actions
    //
    //   {
    //     icon: 'share',
    //     type: ActionType.menu,
    //     children: [
    //       {
    //         label: 'Facebook',
    //       },
    //       {
    //         label: 'Twitter'
    //       },
    //       {
    //         label: 'iTunes'
    //       },
    //       {
    //         label: 'More options...',
    //         url: '/list'
    //       },
    //     ]
    //   },
    //    // Menu icon placed on the left side
    //   {
    //     icon: 'menu',
    //     placement: ActionPlacement.left,
    //     type: ActionType.menu,
    //     children: [
    //       // Edit text menu item placed inside menu
    //       {
    //         label: 'Edit',
    //         url: 'edit'
    //       },
    //       {
    //         label: 'Delete',
    //         icon: 'delete',
    //         click: function () {
    //           console.log('Clicked Delete');
    //         }
    //       }
    //     ]
    //   },
    // ]); // Actions it's default group for elements without group specified

    console.log('init inputs page');
  }

  public ngOnDestroy() {
    console.log('destroy inputs page');
  }
}
