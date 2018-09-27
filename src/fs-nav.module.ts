import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule } from '@angular/material';

import {
  FsScrollSaverComponent,
  FsNavTitleComponent,
  FsNavActionsComponent,
  FsSimpleActionsComponent,
  FsDropDownActionsComponent,
  FsNavSubtitleComponent,
  FsNavSupertitleComponent,
  FsNavComponentComponent
} from './components';

import { FsNavBackDirective } from './directives';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  exports: [
    FsScrollSaverComponent,
    FsNavTitleComponent,
    FsNavSubtitleComponent,
    FsNavSupertitleComponent,   
    FsNavActionsComponent,
    FsNavComponentComponent,
    FsNavBackDirective,
  ],
  entryComponents: [
  ],
  declarations: [
    FsScrollSaverComponent,
    FsNavTitleComponent,
    FsNavActionsComponent,
    FsSimpleActionsComponent,
    FsDropDownActionsComponent,
    FsNavBackDirective,
    FsNavSubtitleComponent,
    FsNavSupertitleComponent,
    FsNavComponentComponent
  ]
})
export class FsNavModule {}
