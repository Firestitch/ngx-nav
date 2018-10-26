import {
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
  Renderer2,
  HostBinding,
  Component, EventEmitter
} from '@angular/core';
import { FsNavStackService } from '../../services';
import { NavComponent } from '../../models/component.model';


@Component({
  selector: '[fsNavComponent]',
  templateUrl: 'nav-component.component.html',
  styleUrls: ['nav-component.component.scss']
})
export class FsNavComponentComponent implements OnInit, OnDestroy {

  @Input('fsNavComponent') public componentName;
  @Input('type') public type;

  @HostBinding('class.hide') public classHide = false;

  public value = '';

  public component: NavComponent;

  protected _destroy = new EventEmitter();

  constructor (
    protected stack: FsNavStackService,
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {}

  public ngOnInit() {

    this.renderer.addClass(this.elementRef.nativeElement, 'fs-nav-' + this.componentName);

    this.stack.componentUpdate(this.componentName, this._destroy)
      .subscribe((payload: any) => {
        this.component = payload.component;
      });


    // this.valueSubscription = this.nav.navBar.componentValue
    //   .subscribe((values) => {
    //     this.value = values[this.component];
    //   });
    //
    // this.hideSubscription = this.nav.navBar.componentHide
    //   .subscribe((values) => {
    //     this.classHide = values[this.component];
    //   });
  }

  public ngOnDestroy() {
    this._destroy.emit()
    this._destroy.complete();
  }

}
