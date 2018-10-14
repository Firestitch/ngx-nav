import { Directive, OnInit } from '@angular/core';
import { Nav } from '../../services/fs-nav-route-handle.service';

@Directive({
  selector: '[fsNavRoot]'
})
export class FsNavRootDirective implements OnInit {
  constructor(private fsNavRouteHandleService: Nav) {

  }

  ngOnInit() {
    debugger;
    this.fsNavRouteHandleService.resetStack();
  }
}