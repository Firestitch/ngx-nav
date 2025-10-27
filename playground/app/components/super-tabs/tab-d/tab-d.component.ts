import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';


@Component({
    templateUrl: 'tab-d.component.html',
    standalone: true,
})
export class SuperTabDComponent implements OnInit, OnDestroy {

  constructor(public nav: FsNavService) {}

  public ngOnInit() {}

  public ngOnDestroy() {

  }
}
