import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { FsNavUpdateTarget } from '../../services/fs-nav-updates.service';
import { FsNavComponentComponent } from '../nav-component/nav-component.component';


@Component({
  selector: '[fsNavTitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-base/nav-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FsNavTitleComponent extends FsNavComponentComponent {

  @Input('fsNavComponent')
  set name(value) {
    this._name = 'title';
  }

  @HostBinding('class.fs-nav-title') public subtitleClass = true;

  protected _type = FsNavUpdateTarget.component;

  constructor () {
    super();
    this._name = 'title';
  }
}
