import { Component, ElementRef, Renderer2, HostBinding, Input } from '@angular/core';

import { FsNavComponentComponent } from '../nav-component';
import { FsNavUpdatesService, FsNavStackService, FsNavUpdateTarget } from '../../services';


@Component({
  selector: '[fsNavSubtitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-base/nav-base.component.scss']
})
export class FsNavSubtitleComponent extends FsNavComponentComponent {

  @Input('fsNavComponent')
  set name(value) {
    this._name = 'subtitle';
  };

  @HostBinding('class.fs-nav-subtitle') public subtitleClass = true;

  protected _type = FsNavUpdateTarget.component;

  constructor (
    navUpdates: FsNavUpdatesService,
    navStack: FsNavStackService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {

    super(navUpdates, navStack, elementRef, renderer);

    this._name = 'subtitle';
  }
}
