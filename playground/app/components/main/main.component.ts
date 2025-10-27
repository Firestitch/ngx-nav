import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FsNavService } from '@firestitch/nav';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'main',
    templateUrl: 'main.component.html',
    standalone: true,
    imports: [RouterLink]
})
export class MainComponent implements OnInit, OnDestroy{
  nav = inject(FsNavService);


  public ngOnInit() {
    console.log('init main');
  }

  public ngOnDestroy() {
    console.log('destroy main');
  }
}
