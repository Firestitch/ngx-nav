import {
  Component,
  HostBinding,
  Input
} from '@angular/core';

import { FsNavComponentComponent } from './../nav-component/nav-component.component';


@Component({
  selector: '[fsNavActions]',
  templateUrl: 'nav-actions.component.html',
  styleUrls: [ 'nav-actions.component.scss' ]
})
export class FsNavActionsComponent extends FsNavComponentComponent {
  @Input('fsNavActions') public componentName: string;
  @HostBinding('class.fs-nav-actions') public selfClass = true;
}
