import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';

import { FsNavUpdatesService, FsNavUpdateType } from '../../services';
import { NavAction } from '../../models';


@Component({
  selector: '[fsNavActions]',
  templateUrl: 'nav-actions.component.html',
  styleUrls: [ 'nav-actions.component.scss' ]
})
export class FsNavActionsComponent implements OnInit, OnDestroy {

  @Input('fsNavActions') public actionsComponentName: string;

  @HostBinding('hidden') public hidden = true;
  @HostBinding('class.fs-nav-actions') public selfClass = true;

  public actions: NavAction[];
  private _destroy$ = new EventEmitter();

  constructor(
    private _elementRef: ElementRef,
    private _navUpdaes: FsNavUpdatesService,
    private _renderer: Renderer2
  ) {}

  public ngOnInit() {
    this._renderer.addClass(
      this._elementRef.nativeElement,
      'fs-nav-action-' + this.actionsComponentName
    );

    this.subscriptions();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private subscriptions() {
    this._navUpdaes.actionUpdated$(this.actionsComponentName, this._destroy$)
      .subscribe((payload) => {
        switch (payload.type) {
          case FsNavUpdateType.show: {
            this.hidden = false;
          } break;

          case FsNavUpdateType.hide: {
            this.hidden = true;
          } break;

          default: {
            this.actions = payload.value;
          }
        }
      })
  }
}
