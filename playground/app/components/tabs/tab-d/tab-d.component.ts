import { Component, OnDestroy, OnInit } from '@angular/core';
import { FsNavService } from '@firestitch/nav';


@Component({
  templateUrl: 'tab-d.component.html',
  styleUrls: [ 'tab-d.component.scss' ]
})
export class TabDComponent implements OnInit, OnDestroy {

  constructor(public nav: FsNavService) {}

  public ngOnInit() {}

  public ngOnDestroy() {}
}
