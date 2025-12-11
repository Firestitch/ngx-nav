import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatAnchor, MatButton, MatFabAnchor, MatFabButton, MatIconAnchor, MatIconButton, MatMiniFabAnchor, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { takeUntil } from 'rxjs/operators';

import { NavActionType } from '../../models/nav-action.model';
import { FsNavUpdateTarget } from '../../services/fs-nav-updates.service';
import { FsNavBaseComponent } from '../nav-base/nav-base.component';


@Component({
  selector: '[fsNavActions]',
  templateUrl: './nav-actions.component.html',
  styleUrls: ['./nav-actions.component.scss'],
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
  public set componentName(value) {
    this._name = value;
  }

  @HostBinding('class.fs-nav-actions') public selfClass = true;

  public NavActionType = NavActionType;
  protected _type = FsNavUpdateTarget.actions;

  protected subscriptions() {
    this.navUpdates.actionUpdated$(this._name, this._destroy)
      .pipe(
        takeUntil(this._destroy),
      )
      .subscribe((payload) => this.payloadUpdated(payload));
  }
}
