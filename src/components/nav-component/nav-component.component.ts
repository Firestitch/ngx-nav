import { OnInit, Component, OnDestroy, Input, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Nav } from '../../services';
import { NavRoute } from '../../classes';


@Component({
  selector: '[fsNavComponent]',
  templateUrl: 'nav-component.component.html',
  styleUrls: ['nav-component.component.scss']
})
export class FsNavComponentComponent implements OnInit, OnDestroy {

  @Input('fsNavComponent') component;
  @Input('type') type;

  @HostBinding('class.hide') public classHide = false;

  public value = '';
  public valueSubscription;
  public hideSubscription;

  constructor ( protected nav: Nav,
                protected router: Router,
                protected elementRef: ElementRef,
                protected renderer: Renderer2) {}

  public ngOnInit() {

    this.renderer.addClass(this.elementRef.nativeElement, 'fs-nav-' + this.component);

    this.valueSubscription = this.nav.navBar.componentValue
    .subscribe((values) => {
      debugger;
      this.value = values[this.component];
    });

    this.hideSubscription = this.nav.navBar.componentHide
    .subscribe((values) => {
      this.classHide = values[this.component];
    });
  }

  public ngOnDestroy() {
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
    }

    if (this.hideSubscription) {
      this.hideSubscription.unsubscribe();
    }
  }

}
