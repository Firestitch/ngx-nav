import { Component, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
    templateUrl: 'menu-b.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class MenuBComponent implements OnInit {
  nav = inject(FsNavService);


  ngOnInit() {
    this.nav.setTitle('Menu B', 'Super Title');
  }
}

