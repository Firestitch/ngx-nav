import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FsScrollSaverComponent,
  FsNavRouteHandleService
} from '../../src';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent extends FsScrollSaverComponent {

  constructor(
    public stack: FsNavRouteHandleService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {
    super(stack, router, activatedRoute);
  }
}
