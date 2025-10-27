import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2
} from '@angular/core';

import { FsNavBaseComponent } from '../nav-base/nav-base.component';

import { FsNavStackService } from '../../services/fs-nav-stack.service';
import { FsNavUpdatesService, FsNavUpdateTarget } from '../../services/fs-nav-updates.service';


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

  constructor (
    navUpdates: FsNavUpdatesService,
    navStack: FsNavStackService,
    elementRef: ElementRef,
    renderer: Renderer2,
    cdRef: ChangeDetectorRef,
  ) {
    super(navUpdates, navStack, elementRef, renderer, cdRef);
    this._name = 'back';
  }

  @HostListener('click')
  public goBack() {
    this.navStack.goBack();
  }
}
