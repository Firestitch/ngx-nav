import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

import { FsNavUpdatesService, FsNavUpdateType } from '../../services';
import { NavAction, NavDropDownMenu } from '../../models';


@Component({
  selector: '[fsNavMenu]',
  templateUrl: 'nav-menu.component.html',
  styleUrls: [ 'nav-menu.component.scss' ]
})
export class FsNavMenuComponent implements OnInit, OnDestroy {

  @Input('fsNavMenu') public menuName: string;

  @HostBinding('hidden') public hidden = false;
  @HostBinding('class.fs-nav-menu') public selfClass = true;

  public menu: NavDropDownMenu = null;
  public groups: string[] = [];
  public actions: Map<string, NavAction[]> = new Map();

  private _destroy$ = new EventEmitter();

  constructor(
    private _elementRef: ElementRef,
    private _navUpdaes: FsNavUpdatesService,
    private _renderer: Renderer2
  ) {}

  public ngOnInit() {
    this._renderer.addClass(
      this._elementRef.nativeElement,
      'fs-nav-menu-' + this.menuName
    );

    this.subscriptions();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private subscriptions() {
    this._navUpdaes.menuUpdated$(this.menuName, this._destroy$)
      .subscribe((payload) => {

        switch (payload.type) {
          case FsNavUpdateType.update: {
            this.menu = payload.value;

            if (this.menu) {
              this.groups = Array.from(this.menu.groups.keys());
              this.actions = this.menu.groups;
            }
          } break;

          case FsNavUpdateType.clear: {
            this.menu = null;
            this.groups.length = 0;
            this.actions.clear();

          } break;

          case FsNavUpdateType.show: {
            this.hidden = false;
          } break;

          case FsNavUpdateType.hide: {
            this.hidden = true;
          } break;
        }
      })
  }
}
