import {
  ElementRef,
  Renderer2,
  Component,
  Input,
} from '@angular/core';

import { FsNavBaseComponent } from '../nav-base';
import { FsNavUpdatesService, FsNavStackService, FsNavUpdateTarget } from '../../services';


@Component({
  selector: '[fsNavComponent]',
  templateUrl: '../nav-base/nav-base.component.html',
  styleUrls: ['../nav-base/nav-base.component.scss']
})
export class FsNavComponentComponent extends FsNavBaseComponent {

  @Input('type') public contentType;

  @Input('fsNavComponent')
  set name(value) {
    this._name = value;
  };

  protected _type = FsNavUpdateTarget.component;

  constructor (
    navUpdates: FsNavUpdatesService,
    navStack: FsNavStackService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    super(navUpdates, navStack, elementRef, renderer);
  }
}
