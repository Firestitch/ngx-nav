import { UrlInfoAction } from '../interfaces';

import { FsNavUpdatesService } from '../services';
import { NavAction } from '../models';


export class FsNavActions {

  private _actions = new Map<string, NavAction[]>();

  constructor(private _navUpdates: FsNavUpdatesService) {}

  /**
   * Set action (button) for special component
   * @param name { string }
   * @param action { UrlInfoAction }
   */
  public setAction(name: string, action: UrlInfoAction) {
    if (!this._actions.has(name)) {
      this._actions.set(name, []);
    }

    const element = this._actions.get(name);

    const elementAction = new NavAction(action);
    element.push(elementAction);

    this._navUpdates.updateButton(name, element);
  }

  /**
   * Set actions (buttons) for special component
   * @param name { string }
   * @param actions : { UrlInfoAction[] }
   */
  public setActions(name: string, actions: UrlInfoAction[]) {
    if (actions) {
      actions.forEach((action: UrlInfoAction) => {
        this.setAction(name, action);
      })
    }
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
