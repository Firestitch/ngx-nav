import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';

import { FsScrollSaverComponent, FsNavTitleComponent, FsNavActionsComponent, FsNavBackComponent } from './components';
import { FsNavRouteHandleService, FsNavRouteReuseStrategy } from './services';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    FsScrollSaverComponent,
    FsNavTitleComponent,
    FsNavActionsComponent,
    FsNavBackComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsScrollSaverComponent,
    FsNavTitleComponent,
    FsNavActionsComponent,
    FsNavBackComponent,
  ],
  providers: [
    FsNavRouteHandleService,
    // {
    //   provide: RouteReuseStrategy, useClass: FsNavRouteReuseStrategy
    // }
  ],
})
export class FsNavModule {}
