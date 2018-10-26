import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule } from '@angular/material';

import {
  FsNavTitleComponent,
  FsNavActionsComponent,
  FsSimpleActionsComponent,
  FsDropDownActionsComponent,
  FsNavComponentComponent
} from './components';
import { FsNavBackDirective } from './directives';
import { FsNavService, FsNavStackService } from './services';
import { FsNavSubTitleComponent } from './components/nav-subtitle/nav-subtitle.component';
import { FsNavSuperTitleComponent } from './components/nav-supertitle/nav-supertitle.component';


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
  ],
  entryComponents: [
  ],
  declarations: [
    FsNavTitleComponent,
    FsNavSuperTitleComponent,
    FsNavSubTitleComponent,
    FsNavActionsComponent,
    FsSimpleActionsComponent,
    FsDropDownActionsComponent,
    FsNavComponentComponent,
    FsNavBackDirective,
  ],
})
export class FsNavModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsNavModule,
      providers: [
        FsNavService,
        FsNavStackService,
      ]
    };
  }
}
