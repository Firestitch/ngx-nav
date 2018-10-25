import { Directive, HostBinding, HostListener } from '@angular/core';

import { FsNavStackService } from '../../services';


@Directive({
  selector: '[fsNavBack]'
})
export class FsNavBackDirective {

  @HostBinding('class.fs-nav-back') public selfClass = true;

  constructor(
    private _stack: FsNavStackService,
  ) {}


  @HostListener('click', ['$event'])
  public goBack() {
    this._stack.goBack();
  }
}
