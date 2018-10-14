import { Component, Input } from '@angular/core';


@Component({
  selector: 'fs-simple-action',
  templateUrl: './simple-action.component.html'
})
export class FsSimpleActionComponent {
  @Input() public action;
}
