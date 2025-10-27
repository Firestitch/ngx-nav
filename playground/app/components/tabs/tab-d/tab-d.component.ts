import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
    templateUrl: 'tab-d.component.html',
    styleUrls: ['tab-d.component.scss'],
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class TabDComponent implements OnInit, OnDestroy {
  nav = inject(FsNavService);


  public ngOnInit() {}

  public ngOnDestroy() {}
}
