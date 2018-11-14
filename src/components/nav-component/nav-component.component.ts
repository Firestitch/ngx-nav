import {
  ElementRef,
  EventEmitter,
  Renderer2,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { FsNavUpdatesService, FsNavUpdateType, FsNavStackService } from '../../services';


@Component({
  selector: '[fsNavComponent]',
  templateUrl: 'nav-component.component.html',
  styleUrls: ['nav-component.component.scss']
})
export class FsNavComponentComponent implements OnInit, OnDestroy {

  @Input('fsNavComponent') public componentName;

  @HostBinding('class.hidden') public hidden = false;
  @HostBinding('class.empty') public empty = true;
  @HostBinding('class.root') public root = false;

  public value: any;
  protected _destroy = new EventEmitter();

  constructor (
    protected navUpdates: FsNavUpdatesService,
    protected navStack: FsNavStackService,
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {}

  public ngOnInit() {

    this.renderer.addClass(
      this.elementRef.nativeElement,
      'fs-nav-component-' + this.componentName
    );

    this.subscriptions();
  }

  public ngOnDestroy() {
    this._destroy.emit();
    this._destroy.complete();
  }

  private subscriptions() {

    this.navUpdates.componentUpdated$(this.componentName, this._destroy)
      .subscribe((payload) => {
        switch (payload.type) {
          case FsNavUpdateType.show: {
            this.hidden = false;
          } break;

          case FsNavUpdateType.hide: {
            this.hidden = true;
          } break;

          case FsNavUpdateType.clear: {
            this.empty = true;
            this.value = null;
          } break;

          case FsNavUpdateType.data: {
            this.root = payload.value && payload.value.root;
          } break;

          default: {
            this.value = payload.value;

            if (this.value instanceof Array) {
              this.empty = !this.value.length;
            } else {
              this.empty = !payload.value;
            }
          }
        }
      });
  }
}
