import { Component, Input } from '@angular/core';


@Component({
  selector: 'fs-nav-simple-actions',
  templateUrl: './simple-actions.component.html'
})
export class FsSimpleActionsComponent {
  @Input() public groups;
  @Input() public actions;
}
