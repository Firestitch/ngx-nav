import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';

import {
  FsNavStackService,
  FsNavUpdatesService,
  FsNavUpdateTarget,
} from '../../services';
import { NavAction, NavDropDownMenu } from '../../models';
import { FsNavBaseComponent } from '../nav-base';


@Component({
  selector: '[fsNavMenu]',
  templateUrl: 'nav-menu.component.html',
  styleUrls: [ 'nav-menu.component.scss' ]
})
export class FsNavMenuComponent extends FsNavBaseComponent {

  @Input('fsNavMenu')
  set menuName(value) {
    this._name = value;
  };

  @HostBinding('class.fs-nav-menu') public selfClass = true;

  public menu: NavDropDownMenu = null;
  public groups: string[] = [];
  public actions: Map<string, NavAction[]> = new Map();

  protected _type = FsNavUpdateTarget.menu;

  constructor(
    navUpdates: FsNavUpdatesService,
    navStack: FsNavStackService,
    protected _elementRef: ElementRef,
    protected _renderer: Renderer2
  ) {
    super(navUpdates, navStack, _elementRef, _renderer);
  }

  protected setSelfClass() {
    this.renderer.addClass(
      this.elementRef.nativeElement,
      'fs-nav-menu-' + this._name
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
