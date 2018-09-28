import { OnInit, Component, OnDestroy, Input, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouteInfo } from '../../models';

import { FsNavRouteHandleService } from '../../services';


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
  public activeRouteInfo: RouteInfo;
  public routerSubscription;
  public valueSubscription;
  public hideSubscription;

  constructor ( protected stack: FsNavRouteHandleService,
                protected router: Router,
                protected elementRef: ElementRef,
                protected renderer: Renderer2) {}

  public ngOnInit() {

    this.renderer.addClass(this.elementRef.nativeElement, 'fs-nav-' + this.component);
    this.subscribeRouteInfo(this.stack.getActiveRouteInfo());

    this.routerSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.subscribeRouteInfo(this.stack.getActiveRouteInfo());
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

  private subscribeRouteInfo(activeRouteInfo) {

    if (!activeRouteInfo) {
      return;
    }

    this.unsubscribeSubjects();

    this.hideSubscription = activeRouteInfo.hideSubject.subscribe(values => {
      this.classHide = values[this.component];
    });

    this.valueSubscription = activeRouteInfo.valueSubject.subscribe(values => {
      this.value = values[this.component];
    });     
  }
}
