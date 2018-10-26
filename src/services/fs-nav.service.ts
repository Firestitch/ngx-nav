import { Injectable } from '@angular/core';
import { FsNavStackService } from './fs-nav-stack.service';
import { UrlInfoAction } from '../interfaces';


@Injectable()
export class FsNavService {

  constructor(private _stack: FsNavStackService) {}

  /**
   * @param value
   */
  public setTitle(value: string) {
    this.component('title', value);
  }

  /**
   * @param {string} value
   */
  public setSuperTitle(value: string) {
    this.component('supertitle', value);
  }

  /**
   *
   * @param {string} value
   */
  public setSubTitle(value: string) {
    this.component('subtitle', value);
  }

  /**
   * @param {string} title
   * @param {string} supertitle
   * @param {string} subtitle
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
   * Set action (function) for current active page
   * @param action { UrlInfoAction }
   * @param group { string }
   */
  public setAction(action: UrlInfoAction, group = 'default') {
    this._stack.setAction(action, group);
  }

  /**
   * Set action (function) for current active page
   * @param actions { UrlInfoAction[] }
   * @param group : { string }
   */
  public setActions(actions: UrlInfoAction[], group = 'default') {
    this._stack.setActions(actions, group);
  }

  /**
   * Set info for special component
   * @param name
   * @param value
   * @param {any} permanent
   */
  public component(name, value, permanent = null) {
    this._stack.components.setComponentValue(name, value, permanent);
  }

  /**
   * @param {any} steps
   */
  public goBack(steps = null) {
    this._stack.goBack(steps);
  }
}
