import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { FsNavUpdateTarget } from '../../services/fs-nav-updates.service';
import { FsNavComponentComponent } from '../nav-component/nav-component.component';


@Component({
  selector: '[fsNavSubtitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-base/nav-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FsNavSubtitleComponent extends FsNavComponentComponent {

  @Input('fsNavComponent')
  public set name(value) {
    this._name = 'subtitle';
  }

  @HostBinding('class.fs-nav-subtitle') public subtitleClass = true;

  protected _type = FsNavUpdateTarget.component;

  constructor () {
    super();
    this._name = 'subtitle';
  }
}
