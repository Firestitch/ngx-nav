import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FsScrollSaverComponent } from '../../../../src';
import { FsNavRouteHandleService } from '../../../../src';

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.scss']
})
export class NavigationComponent extends FsScrollSaverComponent {

  constructor(
    public stack: FsNavRouteHandleService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute) {
    super(stack, router, activatedRoute);
  }
}
