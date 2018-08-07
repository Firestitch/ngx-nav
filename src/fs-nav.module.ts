import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatDividerModule, MatIconModule, MatMenuModule } from '@angular/material';

import { FsScrollSaverComponent, FsNavTitleComponent, FsNavActionsComponent } from './components';
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
    // FsNavRouteHandleService,
    // {
    //   provide: RouteReuseStrategy, useClass: FsNavRouteReuseStrategy
    // }
  ],
})
export class FsNavModule {}
