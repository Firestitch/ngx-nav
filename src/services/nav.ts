import { Injectable } from '@angular/core';
import { NavRouteHandler } from '../services';
import { INavAction } from '../interfaces';
import { NavBar } from '../classes';


@Injectable()
export class Nav {

  public navRouteHandler: NavRouteHandler;
  public navBar: NavBar;
  public onBacks: Array<any> = [];

  /**
   * Set title for current active page
   * @param title
   */
  public setTitle(title: string, supertitle?: string, subtitle?: string) {

    const values: any = { title: title };

    if(supertitle) {
      values.supertitle = supertitle;
    }

    if(subtitle) {
      values.subtitle = subtitle;
    }

    this.navBar.setComponentValues(values);
  }

  public setBackPath(path) {
    this.navBar.setBackPath(path);
  }

  public setSubtitle(value) {
    this.navBar.setComponentValue('subtitle', value);
  }

  public hideComponent(name) {
    this.navBar.hideComponent(name);
  }

  public hideBack() {
    this.hideComponent('back');
  }

  public onBack(func) {
    this.onBacks.push(func);
  }

  /**
   * Set action (function) for current active page
   * @param action { UrlInfoAction }
   * @param group { string }
   */
  public setAction(action: INavAction) {
    this.setActions([action]);
  }

  public setActions(actions: INavAction[]) {
    this.navBar.setActions(actions);
  }

  public navigateBack() {
    this.navRouteHandler.navigateBack();
  }
}
