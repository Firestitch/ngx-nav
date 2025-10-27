import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FsNavUpdateTarget } from '../../services/fs-nav-updates.service';
import { FsNavBaseComponent } from '../nav-base/nav-base.component';


@Component({
  selector: '[fsNavComponent]',
  templateUrl: './nav-component.component.html',
  styleUrls: ['../nav-base/nav-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FsNavComponentComponent extends FsNavBaseComponent {

  @Input('type') public contentType;

  @Input('fsNavComponent')
  public set name(value) {
    this._name = value;
  }

  protected _type = FsNavUpdateTarget.component;

}
