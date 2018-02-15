import { Directive, HostListener } from '@angular/core';
import { FsNavRouteHandleService } from '../../services';


@Directive({
  selector: '[fsNavAction]'
})
export class FsNavActionDirective {
  constructor(private _stack: FsNavRouteHandleService) {}

  @HostListener('click', ['$event'])
  public click() {
    const info = this._stack.getActiveRouteInfo();
    if (info && info.action) {
      info.action();
    }
  }
}
