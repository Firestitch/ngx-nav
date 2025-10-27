import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

import { FsNavBaseComponent } from '../nav-base/nav-base.component';

import { FsNavStackService } from '../../services/fs-nav-stack.service';
import { FsNavUpdatesService, FsNavUpdateTarget } from '../../services/fs-nav-updates.service';


@Component({
    selector: '[fsNavComponent]',
    templateUrl: './nav-component.component.html',
    styleUrls: ['../nav-base/nav-base.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FsNavComponentComponent extends FsNavBaseComponent {

  @Input('type') public contentType;

  @Input('fsNavComponent')
  set name(value) {
    this._name = value;
  };

  protected _type = FsNavUpdateTarget.component;

  constructor (
    navUpdates: FsNavUpdatesService,
    navStack: FsNavStackService,
    elementRef: ElementRef,
    renderer: Renderer2,
    cdRef: ChangeDetectorRef,
  ) {
    super(navUpdates, navStack, elementRef, renderer, cdRef);
  }
}
