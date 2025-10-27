import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

import { NavAction } from '../../models/nav-action.model';
import { NavDropDownMenu } from '../../models/nav-drop-down-menu.model';
import { FsNavUpdateTarget } from '../../services/fs-nav-updates.service';
import { FsNavBaseComponent } from '../nav-base/nav-base.component';


@Component({
  selector: '[fsNavMenu]',
  templateUrl: 'nav-menu.component.html',
  styleUrls: ['nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    RouterLink,
    NgClass,
    MatDivider,
  ],
})
export class FsNavMenuComponent extends FsNavBaseComponent {

  @Input('fsNavMenu')
  public set menuName(value) {
    this._name = value;
  }

  @HostBinding('class.fs-nav-menu') public selfClass = true;

  public menu: NavDropDownMenu = null;
  public groups: string[] = [];
  public actions: Map<string, NavAction[]> = new Map();

  protected _type = FsNavUpdateTarget.menu;

  protected setSelfClass() {
    this.renderer.addClass(
      this.elementRef.nativeElement,
      `fs-nav-menu-${  this._name}`,
    );
  }

  protected subscriptions() {
    this.navUpdates.menuUpdated$(this._name, this._destroy)
      .subscribe((payload) => this.payloadUpdated(payload));
  }

  protected updated(payload) {
    this.menu = payload.value;

    if (this.menu) {
      this.groups = Array.from(this.menu.groups.keys());
      this.actions = this.menu.groups;
    }
  }

  protected updatedClear() {
    this.menu = null;
    this.groups.length = 0;
    this.actions.clear();
  }
}
