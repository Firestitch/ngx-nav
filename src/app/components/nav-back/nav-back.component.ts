import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';

import { FsNavUpdateTarget } from '../../services/fs-nav-updates.service';
import { FsNavBaseComponent } from '../nav-base/nav-base.component';


@Component({
  selector: '[fsNavBack]',
  template: '<ng-content></ng-content>',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FsNavBackComponent extends FsNavBaseComponent {

  @HostBinding('class.fs-nav-back') public selfClass = true;

  protected _type = FsNavUpdateTarget.component;

  constructor () {
    super();
    this._name = 'back';
  }

  @HostListener('click')
  public goBack() {
    this.navStack.goBack();
  }
}
