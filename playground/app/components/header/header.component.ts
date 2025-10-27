import { Component } from '@angular/core';
import { FsNavBackComponent } from '../../../../src/app/components/nav-back/nav-back.component';
import { MatIcon } from '@angular/material/icon';
import { FsNavActionsComponent } from '../../../../src/app/components/nav-actions/nav-actions.component';
import { FsNavComponentComponent } from '../../../../src/app/components/nav-component/nav-component.component';
import { FsNavSupertitleComponent } from '../../../../src/app/components/nav-supertitle/nav-supertitle.component';
import { FsNavTitleComponent } from '../../../../src/app/components/nav-title/nav-title.component';
import { FsNavSubtitleComponent } from '../../../../src/app/components/nav-subtitle/nav-subtitle.component';
import { FsNavMenuComponent } from '../../../../src/app/components/nav-menu/nav-menu.component';

@Component({
    selector: 'header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    standalone: true,
    imports: [FsNavBackComponent, MatIcon, FsNavActionsComponent, FsNavComponentComponent, FsNavSupertitleComponent, FsNavTitleComponent, FsNavSubtitleComponent, FsNavMenuComponent]
})
export class HeaderComponent {

  constructor() {
  }
}
