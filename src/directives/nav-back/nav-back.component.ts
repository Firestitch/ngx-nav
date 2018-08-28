import { Directive, HostBinding, HostListener } from '@angular/core';

import { FsNavRouteHandleService } from '../../services';


@Directive({
  selector: '[fsNavBack]'
})
export class FsNavBackDirective {

  @HostBinding('class.fs-nav-back') public selfClass = true;

  constructor(
    private _stack: FsNavRouteHandleService,
  ) {}


  @HostListener('click', ['$event'])
  public goBack() {
    this._stack.goBack();
  }
}
