import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';

import { FsScrollSaverComponent, FsNavTitleComponent, FsNavActionsComponent } from './components';
import { FsNavBackDirective } from './directives';
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
    FsNavBackDirective,
  ],
  entryComponents: [
  ],
  declarations: [
    FsScrollSaverComponent,
    FsNavTitleComponent,
    FsNavActionsComponent,
    FsNavBackDirective,
  ],
  providers: [
    FsNavRouteHandleService,
    {
      provide: RouteReuseStrategy, useClass: FsNavRouteReuseStrategy
    }
  ],
})
export class FsNavModule {}
