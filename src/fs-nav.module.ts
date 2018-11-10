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
  FsNavTitleComponent,
  FsNavActionsComponent,
  FsNavComponentComponent,
  FsNavSubTitleComponent,
  FsNavSuperTitleComponent,
  FsNavMenuComponent,
  FsNavBackComponent
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
    FsNavSuperTitleComponent,
    FsNavSubTitleComponent,
    FsNavActionsComponent,
    FsNavComponentComponent,
    FsNavBackComponent,
    FsNavMenuComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsNavTitleComponent,
    FsNavSuperTitleComponent,
    FsNavSubTitleComponent,
    FsNavActionsComponent,
    FsNavComponentComponent,
    FsNavMenuComponent,
    FsNavBackComponent
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
