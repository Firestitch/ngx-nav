import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsScrollSaverComponent, FsNavTitleComponent } from './components';
import { FsNavActionDirective, FsNavBackDirective } from './directives';
import { FsNavRouteHandleService } from './services';
import { FsNavRouteReuseStrategy } from './services/fs-nav-route-reuse.strategy';
import { RouteReuseStrategy } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsScrollSaverComponent,
    FsNavTitleComponent,
    FsNavActionDirective,
    FsNavBackDirective,
  ],
  entryComponents: [
  ],
  declarations: [
    FsScrollSaverComponent,
    FsNavTitleComponent,
    FsNavActionDirective,
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
