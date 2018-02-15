import { Directive, HostListener } from '@angular/core';
import { FsNavRouteHandleService } from '../../services';


@Directive({
  selector: '[fsNavAction]'
})
export class FsNavActionDirective {
  @HostListener('click', ['$event'])
  public click() {
    const info = this._stack.getActiveRouteInfo();
    if (info && info.action) {
      info.action();
    }
  }

  constructor(private _stack: FsNavRouteHandleService) {}
}
