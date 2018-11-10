import { HostBinding, HostListener, Component, ElementRef, Renderer2 } from '@angular/core';

import { FsNavStackService, FsNavUpdatesService } from '../../services';
import { FsNavComponentComponent } from './../nav-component/nav-component.component';


@Component({
  selector: '[fsNavBack]',
  template: '<ng-content></ng-content>',
  styles: ['']
})
export class FsNavBackComponent extends FsNavComponentComponent {

  @HostBinding('class.fs-nav-back') public selfClass = true;

  constructor (
    navUpdates: FsNavUpdatesService,
    navStack: FsNavStackService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    super(navUpdates, navStack, elementRef, renderer);
    this.componentName = 'back';
  }

  @HostListener('click', ['$event'])
  public goBack() {
    this.navStack.goBack();
  }
}
