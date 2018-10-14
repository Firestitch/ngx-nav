import * as _isBoolean from 'lodash/isBoolean';
import * as _isString from 'lodash/isString';

import { NavAction, ActionPlacement } from './../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventEmitter } from '@angular/core';
import { INavAction } from './../interfaces';


export class NavBar {

  public valueSubject = new BehaviorSubject({});
  public hideSubject = new BehaviorSubject({});
  public onActionsUpdated = new EventEmitter();

  public actions = {};

  constructor() {

  }


  /**
   * Add action to left/right actions
   * @param action { NavAction }
   * @param groupName { string }
   */
  public addAction(action: NavAction) {
    if(!this.actions[action.placement]) {
      this.actions[action.placement] = [];
    }
    this.actions[action.placement].push(action);
  }

  /**
   * Set action (function) for current active page
   * @param actions { UrlInfoAction[] }
   * @param group : { string }
   */
  public setActions(actions: INavAction[]) {
    if (actions) {
      actions.forEach((action: INavAction) => {
        this.addAction(new NavAction(action));
      });
    }

    this.onActionsUpdated.emit(this);
  }

  /**
   * Empty array with 'default' key
   */
  public clearActions() {
    this.actions = {};
    this.onActionsUpdated.emit(this);
  }

  /**
   * Clear actions
   */
  public clear() {
    this.valueSubject.next({});
    this.hideSubject.next({});
    this.clearActions();
  }
}
