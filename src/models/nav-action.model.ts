import { Alias, Model } from 'tsmodels';
import { UrlInfoAction } from '../interfaces';

export enum NavActionType {
  basic = 'basic',
  raised = 'raised',
  icon = 'icon',
  fab = 'fab',
  miniFab = 'mini-fab',
}

export class NavAction extends Model {

  @Alias() public icon: string;
  @Alias() public label: string;
  @Alias() public click: Function;
  @Alias() public className: string;
  @Alias() public type: NavActionType;
  @Alias() public image: string;
  @Alias() public url: string;

  public classArray: string[] = [];

  constructor(config: UrlInfoAction = {}) {
    super();

    this._fromJSON(config);
  }

  public _fromJSON(value: any) {
    super._fromJSON(value);

    if (value.type === void 0) {
      this.type = NavActionType.basic;
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
