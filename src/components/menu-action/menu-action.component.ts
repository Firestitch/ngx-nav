import { Component, Input } from '@angular/core';


@Component({
  selector: 'fs-menu-action',
  templateUrl: './menu-action.component.html'
})
export class FsMenuActionComponent {

  @Input() public action;
}
