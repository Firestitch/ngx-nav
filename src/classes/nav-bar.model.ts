import * as _isBoolean from 'lodash/isBoolean';
import * as _isString from 'lodash/isString';

import { NavAction, ActionPlacement } from './../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventEmitter } from '@angular/core';
import { INavAction } from './../interfaces';


export class NavBar {

  public componentValue = new BehaviorSubject({});
  public componentHide = new BehaviorSubject({});
  public actions = new BehaviorSubject([]);
  public backPath = '';

  constructor() {}

  /**
   * Set action (function) for current active page
   * @param actions { UrlInfoAction[] }
   * @param group : { string }
   */
  public setActions(actions: INavAction[]) {

    const items = this.actions.getValue();

    actions.forEach((iaction: INavAction) => {

      const action = new NavAction(iaction);

      if(!items[action.placement]) {
        items[action.placement] = [];
      }

      items[action.placement].push(action);
    });

    this.actions.next(items);
  }

  /**
   * Empty array with 'default' key
   */
  public clearActions() {
    this.actions.next([]);
  }

  public setComponentValues(values) {
    this.componentValue.next(values);
  }

  public setComponentValue(name, value) {
    const values = this.componentValue.getValue();
    values[name] = value;
    this.setComponentValues(values);
  }

  public hideComponent(name) {
    const values = this.componentHide.getValue();
    values[name] = true;
    this.componentHide.next(values);
  }


  /**
   * Clear actions
   */
  public clear() {
    this.componentValue.next({});
    this.componentHide.next({});
    this.clearActions();
    this.backPath = '';
  }

  public setBackPath(path) {
    this.backPath = path;
  }
}
