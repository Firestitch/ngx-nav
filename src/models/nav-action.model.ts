import { Alias, Model } from 'tsmodels';

export enum ActionType {
  basic = 'basic',
  raised = 'raised',
  icon = 'icon',
  fab = 'fab',
  miniFab = 'mini-fab',
  menu = 'menu'
}

export enum ActionPlacement {
  left = 'left',
  right = 'right'
}

export class NavAction extends Model {

  @Alias() public icon?: string = '';
  @Alias() public label?: string;
  @Alias() public placement?: ActionPlacement;
  @Alias() public menu?: boolean;
  @Alias() public click?: Function;
  @Alias() public className?: string;
  @Alias() public type?: ActionType = ActionType.basic;
  @Alias() public image?: string;
  @Alias() public url?: string;
  @Alias() public children?: NavAction[] = [];
  @Alias() public classArray?: String[];

  constructor(config) {
    super();

    this._fromJSON(config);
  }

  public _fromJSON(value: any) {
    super._fromJSON(value);

    if (value.placement === void 0) {
      this.placement = ActionPlacement.right;
    }

    if (value.menu === void 0) {
      this.menu = true;
    }

    if (value.type === void 0) {
      this.type = ActionType.basic;
    }

    if (value.click === void 0) {
      this.click = (event) => { };
    }

    if (this.className) {
      this.classArray = this.className.split(' ').reduce((acc, elem) => {
        acc.push(elem);
        return acc;
      }, []);
    }

    if (this.image) {
      this.classArray.push('custom-icon-action');
    }
  }
}
