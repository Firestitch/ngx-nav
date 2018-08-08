import * as _isBoolean from 'lodash/isBoolean';
import * as _isString from 'lodash/isString';

import { NavAction } from './nav-action.model';
import { Placement } from './index';
import { DropDownNavMenu } from './drop-down-nav-action.model';


export class RouteInfo {

  public title?: string;

  public rightActions = new Map<string, NavAction[]>();
  public leftActions = new Map<string, NavAction[]>();

  public dropDownMenus = new Map<string, DropDownNavMenu>();

  public isRoot? = false;

  constructor() {
    this.rightActions.set('default', []);
    this.leftActions.set('default', []);
    this.dropDownMenus.set('menu', new DropDownNavMenu());
  }

  /**
   * Create new dropdown menu
   * @param id { string }
   * @param icon { string }
   */
  public addDropDownMenu(id: string, icon: string) {
    if (!this.dropDownMenus.has(id)) {
      const dropDownMenu = new DropDownNavMenu({ id, icon });
      this.dropDownMenus.set(id, dropDownMenu);
    }
  }

  /**
   * Add action to left/right actions
   * @param action { NavAction }
   * @param groupName { string }
   */
  public addAction(action: NavAction, groupName: string) {
    switch (action.placement) {
      case Placement.left: {
        if (!this.leftActions.has(groupName)) {
          this.leftActions.set(groupName, []);
        }

        this.leftActions.get(groupName).push(action);
      } break;

      case Placement.right: {
        if (!this.rightActions.has(groupName)) {
          this.rightActions.set(groupName, []);
        }

        this.rightActions.get(groupName).push(action);
      } break;
    }
  }

  /**
   * Add new action to one of drop down menus
   * @param action { NavAction }
   * @param groupName { string }
   */
  public addActionToDropDownMenu(action: NavAction, groupName: string) {
    let menuAction: DropDownNavMenu;

    if (_isBoolean(action.menu)) {

      menuAction = this.dropDownMenus.get('menu');

    } else if (_isString(action.menu)) {
      menuAction = this.dropDownMenus.get(action.menu as any);
    }

    if (menuAction) {
      menuAction.addAction(action, groupName);
    }
  }

  /**
   * Clear actions
   */
  public reset() {
    this.rightActions.clear();
    this.dropDownMenus.clear();
    this.leftActions.clear();
  }
}
