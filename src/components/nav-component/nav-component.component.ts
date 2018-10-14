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
  public routerSubscription;
  public valueSubscription;
  public hideSubscription;

  constructor ( protected stack: Nav,
                protected router: Router,
                protected elementRef: ElementRef,
                protected renderer: Renderer2) {}

  public ngOnInit() {

    this.renderer.addClass(this.elementRef.nativeElement, 'fs-nav-' + this.component);

    this.routerSubscription = this.stack.navRouteHandler.onRouteChange
    .subscribe((navRoute: NavRoute) => {
      this.subscribeNavRoute(navRoute);
    });
  }

  public ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    this.unsubscribeSubjects();
  }

  private unsubscribeSubjects() {
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
    }

    if (this.hideSubscription) {
      this.hideSubscription.unsubscribe();
    }
  }

  private subscribeNavRoute(navRoute: NavRoute) {

    this.unsubscribeSubjects();

    this.hideSubscription = navRoute.navBar.hideSubject.subscribe(values => {
      this.classHide = values[this.component];
    });

    this.valueSubscription = navRoute.navBar.valueSubject.subscribe(values => {
      this.value = values[this.component];
    });
  }
}
