import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';


@Component({
    templateUrl: 'tab-d.component.html',
    standalone: true,
})
export class SuperTabDComponent implements OnInit, OnDestroy {
  nav = inject(FsNavService);


  public ngOnInit() {}

  public ngOnDestroy() {

  }
}
