import { EventEmitter, Injectable } from '@angular/core';

import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { NavUpdated } from '../interfaces';


export enum FsNavUpdateType {
  update = 'update',
  clear = 'clear',
  show = 'show',
  hide = 'hide'
}

enum FsNavUpdateTarget {
  component = 'component',
  menu = 'menu',
  button = 'button'
}


@Injectable()
export class FsNavUpdatesService {

  private _updated = new EventEmitter();

  constructor() {}

  public updateComponent(name, value) {
    this.update(FsNavUpdateTarget.component, FsNavUpdateType.update, name, value);
  }

  public showComponent(name) {
    this.update(FsNavUpdateTarget.component, FsNavUpdateType.show, name);
  }

  public hideComponent(name) {
    this.update(FsNavUpdateTarget.component, FsNavUpdateType.hide, name);
  }

  public updateButton(name, value) {
    this.update(FsNavUpdateTarget.button, FsNavUpdateType.update, name, value);
  }

  public showAction(name) {
    this.update(FsNavUpdateTarget.button, FsNavUpdateType.show, name);
  }

  public hideAction(name) {
    this.update(FsNavUpdateTarget.button, FsNavUpdateType.hide, name);
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
    return this.onUpdate(FsNavUpdateTarget.component, name, destroy);
  }

  public actionUpdated$(name, destroy = null) {
    return this.onUpdate(FsNavUpdateTarget.button, name, destroy);
  }

  public menuUpdated$(name, destroy = null) {
    return this.onUpdate(FsNavUpdateTarget.menu, name, destroy);
  }

  private update(target: FsNavUpdateTarget, type: FsNavUpdateType, name: string, value: any = null) {
    this._updated.emit({
      target,
      payload: {
        name,
        type,
        value: value
      }
    })
  }

  private onUpdate(target: FsNavUpdateTarget, name: string, destroy: Observable<any>): Observable<NavUpdated> {
    const updater = this._updated.pipe(
      filter(
        (event: any) => {
          return event.target === target
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
