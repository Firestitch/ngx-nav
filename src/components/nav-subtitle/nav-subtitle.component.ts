import { Component, ElementRef, Renderer2 } from '@angular/core';

import { FsNavStackService } from '../../services';
import { FsNavComponentComponent } from '../nav-component';


@Component({
  selector: '[fsNavSubTitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-component/nav-component.component.scss']
})
export class FsNavSubTitleComponent extends FsNavComponentComponent {

  constructor (
    stack: FsNavStackService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    super(stack, elementRef, renderer);

    this.componentName = 'subtitle';
  }
}
