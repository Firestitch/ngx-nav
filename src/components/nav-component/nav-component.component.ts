import { OnInit, Component, OnDestroy, Input, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { FsNavRouteHandleService } from '../../services';


@Component({
  selector: '[fsNavComponent]',
  templateUrl: 'nav-component.component.html'
})
export class FsNavComponentComponent implements OnInit, OnDestroy {

  @Input('fsNavComponent') component;
  @Input('type') type;
  
  public activeRouteInfo = {};
  public routerChangesSubscription;

  constructor ( protected stack: FsNavRouteHandleService,
                protected router: Router,
                protected elementRef: ElementRef,
                protected renderer: Renderer2) {}

  public ngOnInit() {
    this.activeRouteInfo = this.stack.getActiveRouteInfo() || {};

    this.routerChangesSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.activeRouteInfo = this.stack.getActiveRouteInfo() || {};
      });
    
      this.renderer.addClass(this.elementRef.nativeElement, 'fs-nav-' + this.component);
  }

  public ngOnDestroy() {
    if (this.routerChangesSubscription) {
      this.routerChangesSubscription.unsubscribe();
    }
  }
}
