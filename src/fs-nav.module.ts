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
  FsNavMenuComponent
} from './components';

import { FsNavBackDirective } from './directives';
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
    FsNavBackDirective,
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
    FsNavBackDirective
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
