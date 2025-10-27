import { Component, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
    templateUrl: 'menu-d.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class MenuDComponent implements OnInit {

  constructor(public nav: FsNavService) {}

  ngOnInit() {
    this.nav.setTitle('Menu D');
  }
}
