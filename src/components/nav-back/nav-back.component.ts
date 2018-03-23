import {
  AfterViewInit,
  Component,
  ContentChild,
  OnDestroy,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

import { FsNavRouteHandleService } from '../../services';

import { UrlInfo } from '../../interfaces';


@Component({
  selector: '[fsNavBack]',
  templateUrl: 'nav-back.component.html'
})
export class FsNavBackComponent implements OnInit, AfterViewInit, OnDestroy {

  public routeInfo: UrlInfo = {};

  private _routerSubscription;
  private _backClickListener;

  @ContentChild('backButton') public backButton: ElementRef;


  constructor(
    private _stack: FsNavRouteHandleService,
    private _router: Router,
    private _renderer: Renderer2,
  ) {}

  public ngOnInit() {
    this.createRouterSubscription();
  }

  public ngAfterViewInit() {
    this.createBackClickListener();
  }

  public ngOnDestroy() {
    this._routerSubscription.unsubscribe();
    this._backClickListener();
  }

  public createRouterSubscription() {
    this._routerSubscription = this._router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.routeInfo = this._stack.getActiveRouteInfo();
    });
  }

  public createBackClickListener() {
    this._backClickListener = this._renderer.listen(this.backButton.nativeElement, 'click', (evt) => {
      this._router.navigateByUrl(this._stack.goBack());
    });
  }
}
