import { Alias, Model } from 'tsmodels';
import { UrlInfoAction } from '../interfaces';
import { NavAction } from './nav-action.model';


export class DropDownNavMenu extends Model {

  @Alias() public id: string;
  @Alias() public icon: string;

  public groups = new Map<string, NavAction[]>();

  constructor(config: UrlInfoAction = {}) {
    super();

    this._fromJSON(config);
  }

  public addAction(action, group) {
    if (!this.groups.has('group')) {
      this.groups.set(group, []);
    }

    const actions = this.groups.get(group);

    if (actions.indexOf(action) === -1) {
      actions.push(action);
    }
  }
}
