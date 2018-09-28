import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FsNavComponentComponent } from '../nav-component';

import { FsNavRouteHandleService } from '../../services';


@Component({
  selector: '[fsNavTitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-component/nav-component.component.scss']
})
export class FsNavTitleComponent extends FsNavComponentComponent {

  constructor ( protected stack: FsNavRouteHandleService,
                protected router: Router,
                protected elementRef: ElementRef,
                protected renderer: Renderer2) {
    super(stack, router, elementRef, renderer);
    this.component = 'title';
  }
}
