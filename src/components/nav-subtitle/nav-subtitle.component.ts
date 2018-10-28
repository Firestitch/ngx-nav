import { Component, ElementRef, Renderer2 } from '@angular/core';

import { FsNavComponentComponent } from '../nav-component';
import { FsNavUpdatesService } from '../../services';


@Component({
  selector: '[fsNavSubTitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-component/nav-component.component.scss']
})
export class FsNavSubTitleComponent extends FsNavComponentComponent {

  constructor (
    navUpdates: FsNavUpdatesService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    super(navUpdates, elementRef, renderer);

    this.componentName = 'subtitle';
  }
}
