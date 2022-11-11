import { Injectable } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FsNavService } from './fs-nav.service';



@Injectable()
export class FsNavTitleService {

  constructor(
    private _browserTitle: Title,
    private _navService: FsNavService,
    private _router: Router,
  ) {}
  
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

  private _setTitle(title, supertitle) {
    const tile = [];
    if(title) {
      tile.push(title);
    }

    if(supertitle) {
      tile.push(supertitle);
    }

    this._browserTitle.setTitle(tile.join(' · '));
  }

}
