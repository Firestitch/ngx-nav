import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {  MatButtonModule,
          MatDividerModule,
          MatIconModule,
          MatMenuModule } from '@angular/material';

import {
  FsNavTitleComponent,
  FsNavActionsComponent,
  FsSimpleActionComponent,
  FsMenuActionComponent,
  FsNavSubtitleComponent,
  FsNavSupertitleComponent,
  FsNavComponentComponent,
  FsNavBackComponent
} from './components';

import { NavRouteHandler, Nav } from './services';

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
    FsNavBackComponent
  ],
  entryComponents: [
  ],
  declarations: [
    FsNavTitleComponent,
    FsNavActionsComponent,
    FsSimpleActionComponent,
    FsMenuActionComponent,
    FsNavBackComponent,
    FsNavSubtitleComponent,
    FsNavSupertitleComponent,
    FsNavComponentComponent
  ],

})
export class FsNavModule {

  constructor(navRouteHandler: NavRouteHandler) {
    // TODO: check for multiple constructor calls
    navRouteHandler.init();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsNavModule,
      providers: [
        NavRouteHandler,
        Nav
      ]
    };
  }
}
