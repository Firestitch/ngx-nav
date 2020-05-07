import { UrlInfoAction } from '../interfaces/nav-route-handle.interface';

import { FsNavUpdatesService } from '../services/fs-nav-updates.service';
import { NavAction } from '../models/nav-action.model';


export class FsNavActions {

  private _actions = new Map<string, NavAction[]>();

  constructor(private _navUpdates: FsNavUpdatesService) {}

  /**
   * Set action (button) for special component
   * @param name { string }
   * @param action { UrlInfoAction }
   */
  public addAction(name: string, action: UrlInfoAction) {
    if (!this._actions.has(name)) {
      this._actions.set(name, []);
    }

    const element = this._actions.get(name);

    const elementAction = new NavAction(action);
    element.push(elementAction);

    this._navUpdates.updateAction(name, element);
  }

  public setAction(name: string, action: UrlInfoAction) {
    this._actions.set(name, []);
    this.addAction(name, action);
  }

  /**
   * Add actions (buttons) for special component
   * @param name { string }
   * @param actions : { UrlInfoAction[] }
   */
  public addActions(name: string, actions: UrlInfoAction[]) {
    if (actions) {
      actions.forEach((action: UrlInfoAction) => {
        this.addAction(name, action);
      });
    }
  }

  public setActions(name: string, actions: UrlInfoAction[]) {
    this._actions.set(name, []);
    this.addActions(name, actions);
  }

  /**
   * Show Action
   * @param name { string }
   */
  public showAction(name: string) {
    this._navUpdates.showComponent(name);
  }

  /**
   * Hide Action
   * @param name { string }
   */
  public hideAction(name: string) {
    this._navUpdates.hideComponent(name);
  }

  /**
   * Clear all actions
   */
  public clear() {
    this._actions.forEach((actions) => {
      actions.length = 0;
    });

    this._actions.clear();
  }
}
