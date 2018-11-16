import { Component, ElementRef, Renderer2, HostBinding } from '@angular/core';

import { FsNavBaseComponent } from '../nav-base';
import { FsNavUpdatesService, FsNavStackService, FsNavUpdateTarget } from '../../services';


@Component({
  selector: '[fsNavSupertitle]',
  templateUrl: '../nav-base/nav-base.component.html',
  styleUrls: ['../nav-base/nav-base.component.scss']
})
export class FsNavSupertitleComponent extends FsNavBaseComponent {

  @HostBinding('class.fs-nav-supertitle') public subtitleClass = true;

  protected _type = FsNavUpdateTarget.component;

  constructor (
    navUpdates: FsNavUpdatesService,
    navStack: FsNavStackService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    super(navUpdates, navStack, elementRef, renderer);

    this._name = 'supertitle';
  }
}
