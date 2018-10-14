import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FsNavComponentComponent } from '../nav-component';

import { Nav } from '../../services';


@Component({
  selector: '[fsNavSupertitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-component/nav-component.component.scss']
})
export class FsNavSupertitleComponent extends FsNavComponentComponent {

  constructor ( protected stack: Nav,
                protected router: Router,
                protected elementRef: ElementRef,
                protected renderer: Renderer2) {
    super(stack, router, elementRef, renderer);
    this.component = 'supertitle';
  }
}
