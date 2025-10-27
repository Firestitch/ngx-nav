import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';

@Component({
    selector: 'list',
    templateUrl: 'tab-b.component.html',
    styles: [
        `
    .list-scroll {
      width: 300px;
      height: 250px;
      overflow: scroll;
    }
    `
    ],
    standalone: true,
    imports: [MatFormField, MatInput, MatRadioGroup, MatRadioButton]
})
export class TabBComponent implements OnInit, OnDestroy {
  nav = inject(FsNavService);


  public ngOnInit() {
  }

  public ngOnDestroy() {
  }
}
