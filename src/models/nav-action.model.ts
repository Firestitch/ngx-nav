import { Alias, Model } from 'tsmodels';
import {UrlInfoAction} from "../interfaces/nav-route-handle.interface";

export enum ActionType {
  basic = 'basic',
  raised = 'raised',
  icon = 'icon',
  fab = 'fab',
  miniFab = 'mini-fab'
}

export class NavAction extends Model {

  @Alias() public icon: string;
  @Alias() public label: string;
  @Alias() public left: boolean;
  @Alias() public menu: boolean;
  @Alias() public click: Function;
  @Alias() public className: string;
  @Alias() public type: ActionType;

  public classArray: string[] = [];

  constructor(config: UrlInfoAction = {}) {
    super();

    this._fromJSON(config);
  }

  public _fromJSON(value: any) {
    super._fromJSON(value);

    if (value.menu === undefined) {
      this.menu = true;
    }

    if (value.type === undefined) {
      this.type = ActionType.basic;
    }

    if (this.className) {
      this.classArray = this.className.split(' ').reduce((acc, elem) => {
        acc.push(elem);

        return acc;
      }, [])
    }
  }
}
