import { Component, ElementRef, Renderer2 } from '@angular/core';

import { FsNavComponentComponent } from '../nav-component';
import { FsNavUpdatesService } from '../../services';


@Component({
  selector: '[fsNavSuperTitle]',
  templateUrl: '../nav-component/nav-component.component.html',
  styleUrls: ['../nav-component/nav-component.component.scss']
})
export class FsNavSuperTitleComponent extends FsNavComponentComponent {

  constructor (
    navUpdates: FsNavUpdatesService,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    super(navUpdates, elementRef, renderer);

    this.componentName = 'supertitle';
  }
}
