import { NavAction } from './nav-action.model';
import { Placement } from './index';


export class RouteInfo {

  public title?: string;

  public actions = new Map<string, NavAction[]>();
  public menuActions = new Map<string, NavAction[]>();
  public leftActions = new Map<string, NavAction[]>();

  public isRoot? = false;

  constructor() {
    this.actions.set('default', []);
    this.menuActions.set('default', []);
    this.leftActions.set('default', []);
  }

  public addGroup(placement, groupName) {
    switch (placement) {
      case Placement.left: {
        if (!this.leftActions.has(groupName)) {
          this.leftActions.set(groupName, []);
        }
      } break;

      case 'actions': {
        if (!this.actions.has(groupName)) {
          this.actions.set(groupName, []);
        }
      } break;

      case 'menuActions': {
        if (!this.menuActions.has(groupName)) {
          this.menuActions.set(groupName, []);
        }
      } break;
    }
  }

  public reset() {
    this.actions.clear();
    this.menuActions.clear();
    this.leftActions.clear();
  }
}
