import { Alias, Model } from 'tsmodels';
import { UrlInfoAction } from '../interfaces';

export enum ActionType {
  basic = 'basic',
  raised = 'raised',
  icon = 'icon',
  fab = 'fab',
  miniFab = 'mini-fab',
  url = 'url'
}

export enum Placement {
  left = 'left',
  right = 'right'
}

export class NavAction extends Model {

  @Alias() public icon: string;
  @Alias() public label: string;
  @Alias() public placement: Placement;
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

    if (value.placement === undefined) {
      this.placement = Placement.right;
    }

    if (value.menu === undefined) {
      this.menu = true;
    }

    if (value.type === undefined) {
      this.type = ActionType.basic;
    }

    if (value.click === undefined) {
      this.click = () => {};
    }

    if (this.className) {
      this.classArray = this.className.split(' ').reduce((acc, elem) => {
        acc.push(elem);

        return acc;
      }, [])
    }
  }
}
