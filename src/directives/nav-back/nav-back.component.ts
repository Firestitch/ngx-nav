import { Directive, HostListener } from '@angular/core';

import { FsNavRouteHandleService } from '../../services';


@Directive({
  selector: '[fsNavBack]'
})
export class FsNavBackDirective {

  constructor(
    private _stack: FsNavRouteHandleService,
  ) {}


  @HostListener('click', ['$event'])
  public goBack() {
    this._stack.goBack();
  }
}
