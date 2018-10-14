import { Injectable } from '@angular/core';
import { NavRouteHandler } from '../services';
import { INavAction } from '../interfaces';


@Injectable()
export class Nav {

  public navRouteHandler: NavRouteHandler;


  /**
   * Reset left actions for active route
   */
  public resetLeftActions() {
    //this.routeInfo[this.activeRoutePath].resetLeftActions();
    //this.onActionsUpdated.next();
  }

  /**
   * Reset right actions for active route
   */
  public resetRightActions() {
    //this.routeInfo[this.activeRoutePath].resetRightActions();
    //this.onActionsUpdated.next();
  }

  /**
   * Reset drop down menus actions for active route
   */
  public resetDropDownActions() {
    //this.routeInfo[this.activeRoutePath].resetDropDownMenuActions();
    //this.onActionsUpdated.next();
  }


  /**
   * Add new action what will work like dropDownMenu
   * @param id { string }
   * @param icon { string }
   */
  public addDropDownMenu(id, icon) {
    //const routeInfo: RouteInfo = this.routeInfo[this.activeRoutePath];
    //if (routeInfo && !routeInfo.dropDownMenus.has(id)) {
    //  routeInfo.addDropDownMenu(id, icon);
    //}
  }

  /**
   * Set title for current active page
   * @param title
   */
  public setTitle(title: string, supertitle?: string, subtitle?: string) {
    this.setComponent('title',title);
    this.setComponent('supertitle',supertitle);
    this.setComponent('subtitle',subtitle);
  }

  public setComponent(name, value) {

    const navRoute = this.navRouteHandler.getActiveNavRoute();

    if (navRoute) {
      const values = navRoute.navBar.valueSubject.getValue();
      values[name] = value;

      navRoute.navBar.valueSubject.next(values);
    }
  }

  public hideComponent(name) {
    const navRoute = this.navRouteHandler.getActiveNavRoute();

    if (navRoute) {
      const values = navRoute.navBar.hideSubject.getValue();
      values[name] = true;

      navRoute.navBar.hideSubject.next(values);
    }
  }

  public hideBack() {
    this.hideComponent('back');
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
    this.navRouteHandler.getActiveNavRoute().navBar.setActions(actions);
  }

  public clear() {}

  public navigateBack() {
    this.navRouteHandler.navigateBack();
  }
}
