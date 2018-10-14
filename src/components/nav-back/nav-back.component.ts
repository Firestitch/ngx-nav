import { Component, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { FsNavComponentComponent } from '../nav-component';
import { Nav } from '../../services';


@Component({
  selector: '[fsNavBack]',
  template: '<mat-icon>chevron_left</mat-icon>',
  styleUrls: ['../nav-component/nav-component.component.scss']
})
export class FsNavBackComponent extends FsNavComponentComponent {

  constructor ( protected nav: Nav,
                protected router: Router,
                protected elementRef: ElementRef,
                protected renderer: Renderer2) {
    super(nav, router, elementRef, renderer);
    this.component = 'back';
  }

  @HostBinding('attr.href') public selfHref = 'javascript:void(0)';

  @HostListener('click', ['$event'])
  public goBack() {
    this.nav.navigateBack();
  }
}
