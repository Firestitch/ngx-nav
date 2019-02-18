import { NavAction } from './nav-action.model';


export class NavDropDownMenu {

  public groups = new Map<string, NavAction[]>();

  constructor(public icon = '') {}

  public addAction(action, group) {
    if (!this.groups.has(group)) {
      this.groups.set(group, []);
    }

    const actions = this.groups.get(group);
    actions.push(new NavAction(action));
  }

  public clear() {
    this.groups.forEach((actions) => {
      actions.length = 0;
    });
  }
}
