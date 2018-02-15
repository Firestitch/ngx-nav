import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsScrollSaverComponent, FsNavTitleComponent } from './components';
import { FsNavActionDirective } from './directives';
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
  ],
  entryComponents: [
  ],
  declarations: [
    FsScrollSaverComponent,
    FsNavTitleComponent,
    FsNavActionDirective,
  ],
  providers: [
    FsNavRouteHandleService,
    {
      provide: RouteReuseStrategy, useClass: FsNavRouteReuseStrategy
    }
  ],
})
export class FsNavModule {}
