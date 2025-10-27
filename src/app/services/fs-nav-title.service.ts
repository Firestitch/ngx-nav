import { Injectable, inject } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FsNavService } from './fs-nav.service';


@Injectable()
export class FsNavTitleService {
  private _browserTitle = inject(Title);
  private _navService = inject(FsNavService);
  private _router = inject(Router);


  private _title: string;
  
  public init(): void{
    this._navService.title$
      .subscribe((data) => {
        this._setTitle(data.title.value, data.supertitle.value);
      }); 

    this._router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
    )
      .subscribe(() => {
        this._setTitle(this._navService.title.title.permanent, this._navService.title.supertitle.permanent);
      }); 
  }

  public getTitle(): string {
    return this._title;
  }

  private _setTitle(title, supertitle) {
    const tile = [];
    if(title) {
      tile.push(title);
    }

    if(supertitle) {
      tile.push(supertitle);
    }

    this._title = tile.join(' · ');
    this._browserTitle.setTitle(this._title);
  }

}
