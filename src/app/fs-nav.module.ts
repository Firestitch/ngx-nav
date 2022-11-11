import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { merge } from 'lodash-es';

import { FsNavActionsComponent } from './components/nav-actions/nav-actions.component';
import { FsNavBackComponent } from './components/nav-back/nav-back.component';
import { FsNavBaseComponent } from './components/nav-base/nav-base.component';
import { FsNavComponentComponent } from './components/nav-component/nav-component.component';
import { FsNavMenuComponent } from './components/nav-menu/nav-menu.component';
import { FsNavSubtitleComponent } from './components/nav-subtitle/nav-subtitle.component';
import { FsNavSupertitleComponent } from './components/nav-supertitle/nav-supertitle.component';
import { FsNavTitleComponent } from './components/nav-title/nav-title.component';

import { FsNavService } from './services/fs-nav.service';
import { FsNavStackService } from './services/fs-nav-stack.service';
import { FsNavUpdatesService } from './services/fs-nav-updates.service';
import { FS_NAV_CONFIG, FS_NAV_DEFAULT_CONFIG } from './fs-nav.providers';

import { FsNavDefaultConfig } from './interfaces/nav-default-config.interface';
import { FsNavTitleService } from './services';


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
    FsNavBackComponent,
    FsNavMenuComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsNavBaseComponent,
    FsNavTitleComponent,
    FsNavSupertitleComponent,
    FsNavSubtitleComponent,
    FsNavActionsComponent,
    FsNavComponentComponent,
    FsNavMenuComponent,
    FsNavBackComponent,
    FsNavBaseComponent,
  ],
})
export class FsNavModule {
  static forRoot(config: FsNavDefaultConfig = {}): ModuleWithProviders<FsNavModule> {
    return {
      ngModule: FsNavModule,
      providers: [
        { provide: FS_NAV_CONFIG, useValue: config },
        {
          provide: FS_NAV_DEFAULT_CONFIG,
          useFactory: FsNavConfigFactory,
          deps: [FS_NAV_CONFIG]
        },
        FsNavService,
        FsNavStackService,
        FsNavUpdatesService,
        FsNavTitleService,
      ]
    };
  }

  public constructor(
    private _titleService: FsNavTitleService
  ) {
    this._titleService.init();
  }
}

export function FsNavConfigFactory(config: FsNavDefaultConfig) {
  return merge({
    watchBrowserBackButton: true
  }, config);
}
