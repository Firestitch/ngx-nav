import { Component, Input } from '@angular/core';


@Component({
  selector: 'fs-nav-drop-down-actions',
  templateUrl: './drop-down-actions.component.html'
})
export class FsDropDownActionsComponent {
  @Input() public groups;
  @Input() public actions;
  @Input() public dropDownMenu;
}
