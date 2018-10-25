import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule } from '@angular/material';

import {
  FsNavTitleComponent,
  FsNavActionsComponent,
  FsSimpleActionsComponent,
  FsDropDownActionsComponent
} from './components';
import { FsNavBackDirective } from './directives';
import { FsNavStackService } from './services';


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
    FsNavActionsComponent,
    FsNavBackDirective,
  ],
  entryComponents: [
  ],
  declarations: [
    FsNavTitleComponent,
    FsNavActionsComponent,
    FsSimpleActionsComponent,
    FsDropDownActionsComponent,
    FsNavBackDirective,
  ],
})
export class FsNavModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsNavModule,
      providers: [
        FsNavStackService,
      ]
    };
  }
}
