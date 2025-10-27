import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';

@Component({
    selector: 'super-tab-c',
    templateUrl: 'tab-c.component.html',
    standalone: true,
})
export class SuperTabCComponent implements OnInit, OnDestroy {
  nav = inject(FsNavService);


  public ngOnInit() {}

  public ngOnDestroy() {}
}
