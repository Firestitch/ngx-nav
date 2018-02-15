import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FsNavRouteHandleService } from '../../services';


@Directive({
  selector: '[fsNavBack]'
})
export class FsNavBackDirective {
  constructor(private _stack: FsNavRouteHandleService, private _router: Router) {}

  @HostListener('click', ['$event'])
  public click() {
    this._router.navigateByUrl(this._stack.goBack());
  }
}
