import {
  Component,
  HostBinding,
  Input
} from '@angular/core';

import { FsNavBaseComponent } from '../nav-base';
import { FsNavUpdateTarget } from '../../services';


@Component({
  selector: '[fsNavActions]',
  templateUrl: 'nav-actions.component.html',
  styleUrls: [ 'nav-actions.component.scss' ]
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
      .subscribe((payload) => this.payloadUpdated(payload));
  }
}
