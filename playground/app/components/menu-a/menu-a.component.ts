import { Component, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
    templateUrl: 'menu-a.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class MenuAComponent implements OnInit {
  nav = inject(FsNavService);


  ngOnInit() {
    this.nav.setTitle('Menu A');
    this.nav.setComponent('avatar', '/assets/avatar.png');
  }
}
