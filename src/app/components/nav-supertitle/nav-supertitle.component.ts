import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { FsNavUpdateTarget } from '../../services/fs-nav-updates.service';
import { FsNavComponentComponent } from '../nav-component/nav-component.component';


@Component({
  selector: '[fsNavSupertitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-base/nav-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FsNavSupertitleComponent extends FsNavComponentComponent {

  @Input('fsNavComponent')
  public set name(value) {
    this._name = 'supertitle';
  }

  @HostBinding('class.fs-nav-supertitle') public subtitleClass = true;

  protected _type = FsNavUpdateTarget.component;

  constructor () {
    super();
    this._name = 'supertitle';
  }
}
