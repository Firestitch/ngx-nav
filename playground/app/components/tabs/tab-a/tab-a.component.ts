import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavService, NavActionType } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

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
  `],
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class TabAComponent implements OnInit, OnDestroy {

  constructor(public nav: FsNavService) {

  }

  public ngOnInit() {
    this.nav.setAction('right', {
      label: 'Save',
      className: 'md-primary',
      type: NavActionType.raised,
      click: () => {
        this.nav.showMenu('share');
      }
    });

    this.nav.setMenuActions(
      'right-menu',
      [
        {
          label: 'Edit',
          url: 'edit'
        },
        {
          label: 'Delete',
          icon: 'delete',
          click: () => {
            this.nav.hideMenu('share')
          }
        }
      ]
    );

    this.nav.setMenuIcon('share', 'share');

    this.nav.setMenuActions(
      'share',
      [
        {
          label: 'Facebook',
        },
        {
          label: 'Twitter'
        },
        {
          label: 'iTunes'
        },
      ],
      'Post To'
    );

    this.nav.setMenuActions(
      'share',
      [
        {
          label: 'More options...',
          url: '/list'
        },
      ],
      'Other'
    );

    console.log('init inputs page');
  }

  public ngOnDestroy() {
    console.log('destroy inputs page');
  }
}
