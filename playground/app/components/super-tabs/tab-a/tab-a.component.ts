import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';

@Component({
    selector: 'super-tab-a',
    templateUrl: 'tab-a.component.html',
    standalone: true,
})
export class SuperTabAComponent implements OnInit, OnDestroy {
  nav = inject(FsNavService);


  public ngOnInit() {}

  public ngOnDestroy() {}
}
