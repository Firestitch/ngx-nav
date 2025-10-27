import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { FsNavBaseComponent } from '../nav-base/nav-base.component';
import { FsNavUpdateTarget } from '../../services/fs-nav-updates.service';
import { takeUntil } from 'rxjs/operators';
import { NgFor, NgSwitch, NgSwitchCase, NgIf, NgClass, NgTemplateOutlet } from '@angular/common';
import { MatButton, MatAnchor, MatIconButton, MatIconAnchor, MatFabButton, MatFabAnchor, MatMiniFabButton, MatMiniFabAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';


@Component({
    selector: '[fsNavActions]',
    templateUrl: 'nav-actions.component.html',
    styleUrls: ['nav-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgFor,
        NgSwitch,
        NgSwitchCase,
        NgIf,
        MatButton,
        NgClass,
        NgTemplateOutlet,
        MatAnchor,
        RouterLink,
        MatIconButton,
        MatIconAnchor,
        MatFabButton,
        MatFabAnchor,
        MatMiniFabButton,
        MatMiniFabAnchor,
        MatIcon,
    ],
})
export class FsNavActionsComponent extends FsNavBaseComponent {

  @Input('fsNavActions')
  set componentName(value) {
    this._name = value;
  };

  @HostBinding('class.fs-nav-actions') public selfClass = true;

  protected _type = FsNavUpdateTarget.actions;

  protected subscriptions() {
    this.navUpdates.actionUpdated$(this._name, this._destroy)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((payload) => this.payloadUpdated(payload));
  }
}
