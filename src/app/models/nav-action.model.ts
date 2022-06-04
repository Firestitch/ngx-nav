import { UrlInfoAction } from '../interfaces/nav-route-handle.interface';

export enum NavActionType {
  basic = 'basic',
  raised = 'raised',
  icon = 'icon',
  fab = 'fab',
  miniFab = 'mini-fab',
}

export class NavAction {

  public icon: string;
  public label: string;
  public click: (event: any) => void;
  public className: string;
  public type: NavActionType;
  public image: string;
  public url: string;

  public classArray: string[] = [];

  constructor(config: UrlInfoAction = {}) {
    this._init(config);
  }

  public _init(value: UrlInfoAction = {}) {
    this.icon     = value.icon;
    this.label    = value.label;
    this.click    = value.click ?? ((event) => { });
    this.className = value.className;
    this.type     = value.type ?? NavActionType.basic;
    this.image    = value.image;
    this.url      = value.url;

    if (this.className) {
      this.classArray = this.className
        .split(' ')
        .reduce((acc, elem) => {
          acc.push(elem);
          return acc;
        }, []);
    }

    if (this.image) {
      this.classArray.push('custom-icon-action');
    }
  }
}
