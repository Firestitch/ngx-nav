import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { NavUpdated } from '../interfaces/nav-updated.interface';
import { FsNavRouteData } from '../interfaces/nav-route-data.interface';

export enum FsNavUpdateType {
  data = 'data',
  update = 'update',
  clear = 'clear',
  show = 'show',
  hide = 'hide',
}

export enum FsNavUpdateTarget {
  all = '__all__',
  component = 'component',
  menu = 'menu',
  actions = 'actions',
}


@Injectable()
export class FsNavUpdatesService {

  private _updated = new ReplaySubject(30);

  constructor() {}

  public updateRouteData(data: FsNavRouteData) {
    this.update(FsNavUpdateTarget.all, FsNavUpdateType.data, '__all__', data);
  }

  public updateComponent(name, value) {
    this.update(FsNavUpdateTarget.component, FsNavUpdateType.update, name, value);
  }

  public showComponent(name) {
    this.update(FsNavUpdateTarget.component, FsNavUpdateType.show, name);
  }

  public hideComponent(name) {
    this.update(FsNavUpdateTarget.component, FsNavUpdateType.hide, name);
  }

  public clearComponent(name) {
    this.update(FsNavUpdateTarget.component, FsNavUpdateType.clear, name, null);
  }

  public updateAction(name, value) {
    this.update(FsNavUpdateTarget.actions, FsNavUpdateType.update, name, value);
  }

  public updateMenu(name, value) {
    this.update(FsNavUpdateTarget.menu, FsNavUpdateType.update, name, value);
  }

  public showMenu(name) {
    this.update(FsNavUpdateTarget.menu, FsNavUpdateType.show, name);
  }

  public hideMenu(name) {
    this.update(FsNavUpdateTarget.menu, FsNavUpdateType.hide, name);
  }

  public clearMenu(name, value) {
    this.update(FsNavUpdateTarget.menu, FsNavUpdateType.clear, name, value);
  }

  public componentUpdated$(name, destroy = null) {
    return this._onUpdate(FsNavUpdateTarget.component, name, destroy);
  }

  public acti_onUpdated$(name, destroy = null) {
    return this._onUpdate(FsNavUpdateTarget.actions, name, destroy);
  }

  public menuUpdated$(name, destroy = null) {
    return this._onUpdate(FsNavUpdateTarget.menu, name, destroy);
  }

  private update(target: FsNavUpdateTarget, type: FsNavUpdateType, name: string, value: any = null) {
    this._updated.next({
      target,
      payload: {
        name,
        type,
        value: value
      }
    })
  }

  private _onUpdate(target: FsNavUpdateTarget, name: string, destroy: Observable<any>): Observable<NavUpdated> {
    const updater = this._updated.pipe(
      filter(
        (event: any) => {
          return (event.target === target || event.target == FsNavUpdateTarget.all)
            && (event.payload.name === name || event.payload.name === '__all__');
        }
      ),
      map((event: any) => {
        return event.payload;
      })
    );

    return destroy ? updater.pipe(takeUntil(destroy)) : updater;
  }

}
