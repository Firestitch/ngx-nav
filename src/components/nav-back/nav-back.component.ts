import { HostBinding, HostListener, Component, ElementRef, Renderer2 } from '@angular/core';

import { FsNavStackService, FsNavUpdatesService, FsNavUpdateTarget } from '../../services';
import { FsNavBaseComponent } from '../nav-base';


@Component({
  selector: '[fsNavBack]',
  template: '<ng-content></ng-content>',
  styles: ['']
})
export class FsNavBackComponent extends FsNavBaseComponent {

  @HostBinding('class.fs-nav-back') public selfClass = true;

  protected _type = FsNavUpdateTarget.component;

  constructor (
    navUpdates: FsNavUpdatesService,
    navStack: FsNavStackService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    super(navUpdates, navStack, elementRef, renderer);
    this._name = 'back';
  }

  @HostListener('click', ['$event'])
  public goBack() {
    this.navStack.goBack();
  }
}
