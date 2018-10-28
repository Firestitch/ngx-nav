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
import { NavComponent } from '../../models';


@Component({
  selector: '[fsNavComponent]',
  templateUrl: 'nav-component.component.html',
  styleUrls: ['nav-component.component.scss']
})
export class FsNavComponentComponent implements OnInit, OnDestroy {

  @Input('fsNavComponent') public componentName;
  @Input('type') public type;

  @HostBinding('class.hidden') public hidden = false;

  public value = '';

  public component: NavComponent;

  protected _destroy = new EventEmitter();

  constructor (
    protected navUpdates: FsNavUpdatesService,
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

          default: {
            this.component = payload.value;
          }
        }
      })
  }

}
