import { Component, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
    templateUrl: 'edit.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class EditComponent implements OnInit {
  stack = inject(FsNavService);


  ngOnInit() {
    this.stack.setTitle('Edit');
  }

  save() {
    alert('Saved');
  }

  cancel() {
    this.stack.goBack();
  }
}
