import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FsNavComponentComponent } from '../nav-component';

import { FsNavRouteHandleService } from '../../services';


@Component({
  selector: '[fsNavSupertitle]',
  templateUrl: '../nav-component/nav-component.component.html'
})
export class FsNavSupertitleComponent extends FsNavComponentComponent {

  constructor ( protected stack: FsNavRouteHandleService,
                protected router: Router,
                protected elementRef: ElementRef,
                protected renderer: Renderer2) {
    super(stack, router, elementRef, renderer);
    this.component = 'supertitle';
  }
}
