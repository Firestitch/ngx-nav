import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FsNavStackService } from './fs-nav-stack.service';
import { UrlInfoAction } from '../interfaces/nav-route-handle.interface';
import { NavStackItem } from '../interfaces/nav-stack-item.interface';



@Injectable()
export class FsNavService {

  constructor(private _stack: FsNavStackService) {}

  get urlsStack(): NavStackItem[] {
    return this._stack.urlsStack;
  }

  get routeChange(): Observable<any> {
    return this._stack.stackRouteChangeSubscription;
  }

  /**
   * @param value
   */
  public setSupertitle(value: string) {
    this.setComponent('supertitle', value);
  }

  /**
   * @param value
   */
  public setSubtitle(value: string) {
    this.setComponent('subtitle', value);
  }

  /**
   * Set all titles
   * @param title
   * @param supertitle
   * @param subtitle
   */
  public setTitle(title: string, supertitle?: string, subtitle?: string ) {
    if (title) {
      this.setComponent('title', title);
    }

    if (supertitle) {
      this.setSupertitle(supertitle);
    }

    if (subtitle) {
      this.setSubtitle(subtitle);
    }
  }

  /**
   * Set action (button) for special target
   * @param name
   * @param action { UrlInfoAction }
   */
  public setAction(name: string, action: UrlInfoAction) {
    this._stack.actions.setAction(name, action);
  }

  /**
   * Set actions (buttons) for special target
   * @param name
   * @param actions
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
   * @param name
   * @param action
   * @param group
   * @param icon
   */
  public setMenuAction(name: string, action: UrlInfoAction, group = 'default', icon = '') {
    this._stack.menus.setMenuAction(name, action, group, icon);
  }

  /**
   * Set menu actions (items) for special target
   * @param name
   * @param actions
   * @param group
   * @param icon
   */
  public setMenuActions(name: string, actions: UrlInfoAction[], group = 'default', icon = '') {
    this._stack.menus.setMenuActions(name, actions, group, icon);
  }

  /**
   * @param name
   */
  public showMenu(name: string) {
    this._stack.menus.showMenu(name);
  }

  /**
   * @param name
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
  public setComponent(name, value, permanent: boolean = null) {
    this._stack.components.setComponentValue(name, value, permanent);
  }

  /**
   * @param name
   */
  public showComponent(name: string) {
    this._stack.components.showComponent(name);
  }

  /**
   *
   * @param name
   */
  public hideComponent(name: string) {
    this._stack.components.hideComponent(name);
  }

  /**
   * @param steps
   */
  public goBack(steps: number = null) {
    this._stack.goBack(steps);
  }
}
