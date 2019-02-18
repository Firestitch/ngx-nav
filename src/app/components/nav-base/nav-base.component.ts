import {
  ElementRef,
  EventEmitter,
  Renderer2,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { FsNavStackService } from '../../services/fs-nav-stack.service';
import { FsNavUpdatesService, FsNavUpdateType } from '../../services/fs-nav-updates.service';


@Component({
  template: '',
  styleUrls: ['nav-base.component.scss']
})
export class FsNavBaseComponent implements OnInit, OnDestroy {

  @HostBinding('class.hidden') public hidden = false;
  @HostBinding('class.empty') public empty = true;
  @HostBinding('class.root') public root = false;

  public value: any;
  protected _destroy = new EventEmitter();
  protected _name;
  protected _type;

  constructor (
    protected navUpdates: FsNavUpdatesService,
    protected navStack: FsNavStackService,
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {}

  get name() {
    return this._name;
  }

  public ngOnInit() {
    this.setSelfClass();

    this.subscriptions();
  }

  public ngOnDestroy() {
    this._destroy.emit();
    this._destroy.complete();
  }

  protected setSelfClass() {
    this.renderer.addClass(
      this.elementRef.nativeElement,
      'fs-nav-component-' + this._name
    );
  }

  protected subscriptions() {
    this.navUpdates.componentUpdated$(this._name, this._destroy)
      .subscribe((payload) => this.payloadUpdated(payload));
  }

  protected payloadUpdated(payload) {
    switch (payload.type) {

      case FsNavUpdateType.update: {
        this.updated(payload);
      } break;

      case FsNavUpdateType.show: {
        this.updatedShow();
      } break;

      case FsNavUpdateType.hide: {
        this.updatedHide();
      } break;

      case FsNavUpdateType.clear: {
        this.updatedClear();
      } break;

      case FsNavUpdateType.data: {
        this.updatedData(payload);
      } break;

      default: {
        this.updatedDefault(payload);
      }
    }
  }

  protected updatedShow() {
    this.hidden = false;
  }

  protected updatedHide() {
    this.hidden = true;
  }

  protected updatedClear() {
    this.empty = true;
    this.value = null;
  }

  protected updated(payload) {
    this.value = payload.value;

    if (this.value instanceof Array) {
      this.empty = !this.value.length;
    } else {
      this.empty = !payload.value;
    }
  }

  protected updatedData(payload) {
    this.root = payload.value && payload.value.root;
  }

  protected updatedDefault(payload) {}
}
