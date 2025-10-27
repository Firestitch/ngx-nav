import { Component, OnInit, inject } from '@angular/core';
import { FsListConfig, FsListModule } from '@firestitch/list';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { FsNavService } from '@firestitch/nav';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: 'list.component.html',
    standalone: true,
    imports: [FsListModule, MatButton, RouterLink]
})
export class ListComponent implements OnInit {
  private router = inject(Router);
  private nav = inject(FsNavService);


  public config: FsListConfig;

  public ngOnInit() {
    this.nav.setTitle('List');

    this.config = {
      actions: [
        {
          click: (event) => {
            this.router.navigateByUrl('/workflow/1');
          },
          label: 'Go To Workflow 1',
          primary: true
        },
        {
          click: (event) => {
            this.router.navigateByUrl('/something');
          },
          label: 'Go To Something',
          primary: true
        },
        {
          click: (event) => {
            this.router.navigateByUrl('/tabs/d');
          },
          label: 'Go To Tab D',
          primary: true
        }
      ],
      fetch: (query) => {
        return Observable.create((observer) => {
          observer.next({ data: [{}, {}, {}] });
        });
      },
      paging: false,
      status: false
    };
  }
}



