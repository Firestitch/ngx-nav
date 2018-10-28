import { UrlInfoAction } from '../interfaces';

import { FsNavUpdatesService } from '../services';
import { NavDropDownMenu } from '../models';


export class FsNavMenus {

  private _menus = new Map<string, NavDropDownMenu>();

  constructor(private _navUpdates: FsNavUpdatesService) {}

  /**
   * Set menu action (item) for specified menu
   * @param name { string }
   * @param action { UrlInfoAction }
   * @param group { string }
   * @param icon { string }
   */
  public setMenuAction(name: string, action: UrlInfoAction, group = 'default', icon = '') {

    if (!this._menus.has(name)) {
      this._menus.set(
        name,
        new NavDropDownMenu(icon)
      );
    }

    const menu = this._menus.get(name);
    menu.addAction(action, group);

    this._navUpdates.updateMenu(name, menu);
  }

  /**
   * Set menu actions (items) for specified menu
   * @param name { string }
   * @param actions : { UrlInfoAction[] }
   * @param group { string }
   * @param icon { string }
   */
  public setMenuActions(name: string, actions: UrlInfoAction[], group = 'default', icon = '') {
    if (actions) {
      actions.forEach((action: UrlInfoAction) => {
        this.setMenuAction(name, action, group, icon);
      })
    }
  }

  /**
   * Set icon for menu
   * @param name
   * @param icon
   */
  public setMenuIcon(name: string, icon: string) {
    if (!this._menus.has(name)) {
      this._menus.set(
        name,
        new NavDropDownMenu(icon)
      );
    }

    const menu = this._menus.get(name);
    menu.icon = icon;
  }

  /**
   * Show Menu
   * @param name
   */
  public showMenu(name: string) {
    this._navUpdates.showMenu(name);
  }

  /**
   * Hide Menu
   * @param name
   */
  public hideMenu(name: string) {
    this._navUpdates.hideMenu(name);
  }

  /**
   * Clear all menus
   */
  public clear() {
    this._menus.forEach((menu) => {
      menu.clear();
    });

    this._menus.clear();

    this._navUpdates.clearMenu('__all__', null)
  }
}
