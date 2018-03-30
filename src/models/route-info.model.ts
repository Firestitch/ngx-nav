export class RouteInfo {

  public title?: string;
  public actions? = [];
  public menuActions? = [];
  public leftActions? = [];
  public isRoot? = false;

  constructor() {
  }

  public reset() {
    this.title = null;
    this.actions.length     = 0;
    this.menuActions.length = 0;
    this.leftActions.length = 0;
    this.isRoot = false;
  }
}