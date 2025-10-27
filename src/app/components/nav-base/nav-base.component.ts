import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { FsNavStackService } from '../../services/fs-nav-stack.service';
import { FsNavUpdateType, FsNavUpdatesService } from '../../services/fs-nav-updates.service';


@Component({
  template: '',
  styleUrls: ['./nav-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FsNavBaseComponent implements OnInit, OnDestroy {


  @HostBinding('class.hidden') public hidden = false;
  @HostBinding('class.empty') public empty = true;
  @HostBinding('class.root') public root = false;

  public value: any;
  protected _destroy = new EventEmitter();
  protected _name;
  protected _type;
  
  protected navUpdates = inject(FsNavUpdatesService);
  protected navStack = inject(FsNavStackService);
  protected elementRef = inject(ElementRef);
  protected renderer = inject(Renderer2);
  protected cdRef = inject(ChangeDetectorRef);

  public get name() {
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
      `fs-nav-component-${  this._name}`,
    );
  }

  protected subscriptions() {
    this.navUpdates.componentUpdated$(this._name, this._destroy)
      .pipe(
        takeUntil(this._destroy),
      )
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

    this.cdRef.markForCheck();
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

    this.empty = this.value instanceof Array ? !this.value.length : !payload.value;
  }

  protected updatedData(payload) {
    this.root = payload.value && payload.value.root;
  }

  protected updatedDefault(payload) {}
}
