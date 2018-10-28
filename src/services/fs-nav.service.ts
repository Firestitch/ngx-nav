import { Injectable } from '@angular/core';
import { FsNavStackService } from './fs-nav-stack.service';
import { UrlInfoAction } from '../interfaces';


@Injectable()
export class FsNavService {

  constructor(private _stack: FsNavStackService) {}

  /**
   * @param value { string }
   */
  public setTitle(value: string) {
    this.component('title', value);
  }

  /**
   * @param value { string }
   */
  public setSuperTitle(value: string) {
    this.component('supertitle', value);
  }

  /**
   * @param value { string }
   */
  public setSubTitle(value: string) {
    this.component('subtitle', value);
  }

  /**
   * Set all titles
   * @param title { string }
   * @param supertitle { string }
   * @param subtitle { string }
   */
  public setTitles(title: string, supertitle?: string, subtitle?: string ) {
    if (title) {
      this.setTitle(title);
    }

    if (supertitle) {
      this.setSuperTitle(supertitle);
    }

    if (subtitle) {
      this.setSubTitle(subtitle);
    }
  }

  /**
   * Set action (button) for special target
   * @param name { string }
   * @param action { UrlInfoAction }
   */
  public setAction(name: string, action: UrlInfoAction) {
    this._stack.actions.setAction(name, action);
  }

  /**
   * Set actions (buttons) for special target
   * @param name { string }
   * @param actions : { UrlInfoAction[] }
   */
  public setActions(name: string, actions: UrlInfoAction[]) {
    this._stack.actions.setActions(name, actions);
  }

  /**
   * Show action (button)
   * @param name
   */
  public showAction(name: string) {
    this._stack.actions.showAction(name);
  }

  /**
   * Hide action (button)
   * @param name
   */
  public hideAction(name: string) {
    this._stack.actions.hideAction(name);
  }

  /**
   * Set menu action (item) for special target
   * @param name { string }
   * @param action { UrlInfoAction }
   * @param group { string }
   * @param icon { string }
   */
  public setMenuAction(name: string, action: UrlInfoAction, group = 'default', icon = '') {
    this._stack.menus.setMenuAction(name, action, group, icon);
  }

  /**
   * Set menu actions (items) for special target
   * @param name { string }
   * @param actions : { UrlInfoAction[] }
   * @param group { string }
   * @param icon { string }
   */
  public setMenuActions(name: string, actions: UrlInfoAction[], group = 'default', icon = '') {
    this._stack.menus.setMenuActions(name, actions, group, icon);
  }

  /**
   * @param name { string }
   */
  public showMenu(name: string) {
    this._stack.menus.showMenu(name);
  }

  /**
   * @param name { string }
   */
  public hideMenu(name: string) {
    this._stack.menus.hideMenu(name);
  }

  /**
   * Set menu icon for special target
   * @param name
   * @param icon
   */
  public setMenuIcon(name: string, icon: string) {
    this._stack.menus.setMenuIcon(name, icon);
  }

  /**
   * Set value for special target
   * @param name
   * @param value
   * @param permanent { boolean } - do not clear component value when url changed
   */
  public component(name, value, permanent: boolean = null) {
    this._stack.components.setComponentValue(name, value, permanent);
  }

  /**
   * @param name { string }
   */
  public showComponent(name: string) {
    this._stack.components.showComponent(name);
  }

  /**
   *
   * @param name { string }
   */
  public hideComponent(name: string) {
    this._stack.components.hideComponent(name);
  }

  /**
   * @param { number } steps
   */
  public goBack(steps: number = null) {
    this._stack.goBack(steps);
  }
}
