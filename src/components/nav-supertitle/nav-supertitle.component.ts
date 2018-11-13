import { Component, ElementRef, Renderer2, HostBinding } from '@angular/core';

import { FsNavComponentComponent } from '../nav-component';
import { FsNavUpdatesService, FsNavStackService } from '../../services';


@Component({
  selector: '[fsNavSupertitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-component/nav-component.component.scss']
})
export class FsNavSupertitleComponent extends FsNavComponentComponent {

  @HostBinding('class.fs-nav-supertitle') public subtitleClass = true;

  constructor (
    navUpdates: FsNavUpdatesService,
    navStack: FsNavStackService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    super(navUpdates, navStack, elementRef, renderer);
    this.componentName = 'supertitle';
  }
}
