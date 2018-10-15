import * as _isBoolean from 'lodash/isBoolean';
import * as _isString from 'lodash/isString';
import { ActivatedRouteSnapshot } from '@angular/router';


export class NavRoute {

  public route: ActivatedRouteSnapshot;
  public url;
  public ignore = false;

  constructor(route) {
    this.route = route;
    this.url = this.getFullRoutePath(route);
  }

  public getData(key) {
    const data = this.route && this.route.data && this.route.data ? this.route.data : {};
    return data[key];
  }

    /**
   * Recursevly get full path for route
   * @param {ActivatedRouteSnapshot} route
   * @param {string} path
   * @returns {string}
   */
  public getFullRoutePath(route: ActivatedRouteSnapshot, path = '') {
    // if (route.parent !== null) {
    //   return this.getFullRoutePath(route.parent, path) + '/' + route.url.join('/');
    // } else {
    //   return route.url.join('/')
    // }
    if (route.firstChild) {
      return this.getTailPath(route);
    } else {
      return this.getHeadPath(route);
    }
  }

  private getHeadPath(route: ActivatedRouteSnapshot, path = '') {
    if (route.parent !== null) {
      return this.getHeadPath(route.parent, path) + '/' + route.url.join('/');
    } else {
      return route.url.join('/');
    }
  }

  private getTailPath(route: ActivatedRouteSnapshot, path = '') {
    if (route.firstChild) {
      return `/${route.url.join('/')}/${this.getTailPath(route.firstChild, path)}`;
    } else {
      return `${route.url.join('/')}`;
    }
  }
}
