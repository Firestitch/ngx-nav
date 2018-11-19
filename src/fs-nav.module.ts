import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';

import {
  FsNavBaseComponent,
  FsNavTitleComponent,
  FsNavActionsComponent,
  FsNavComponentComponent,
  FsNavSubtitleComponent,
  FsNavSupertitleComponent,
  FsNavMenuComponent,
  FsNavBackComponent,
} from './components';

import { FsNavService, FsNavStackService } from './services';
import { FsNavUpdatesService } from './services';


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
    FsNavTitleComponent,
    FsNavSubtitleComponent,
    FsNavSupertitleComponent,
    FsNavActionsComponent,
    FsNavComponentComponent,
    FsNavBackComponent,
    FsNavMenuComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsNavBaseComponent,
    FsNavTitleComponent,
    FsNavSupertitleComponent,
    FsNavSubtitleComponent,
    FsNavActionsComponent,
    FsNavComponentComponent,
    FsNavMenuComponent,
    FsNavBackComponent,
    FsNavBaseComponent,
  ],
})
export class FsNavModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsNavModule,
      providers: [
        FsNavService,
        FsNavStackService,
        FsNavUpdatesService,
      ]
    };
  }
}
