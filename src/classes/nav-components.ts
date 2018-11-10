import { FsNavUpdatesService } from '../services';
import { NavComponent } from '../models';


export class FsNavComponents {

  private _components = new Map<string, NavComponent>();

  constructor(
    private _navUpdates: FsNavUpdatesService
  ) {}

  /**
   * Set special value for component by name
   * @param name { string }
   * @param value
   * @param permanent - do not clear component value when url changed
   */
  public setComponentValue(name: string, value: any, permanent: boolean = null) {
    this.createComponentIfNotExists(name);

    if (this._components.has(name)) {
      const component = this._components.get(name);

      component.updateValue(value);

      if (permanent !== null) {
        component.permanent = permanent;
      }
    }

    this._navUpdates.updateComponent(name, this._components.get(name));
  }

  /**
   * Show component
   * @param name { string }
   */
  public showComponent(name: string) {
    this._navUpdates.showComponent(name);
  }

  /**
   * Hide component
   * @param name { string }
   */
  public hideComponent(name: string) {
    this._navUpdates.hideComponent(name);
  }

  /**
   * Clear all components
   */
  public clear() {
    this._components.forEach((component,name) => {
      if (!component.permanent) {
        component.clear();
        this._navUpdates.clearComponent(name);
      }
    })
  }

  /**
   * @param name { string }
   */
  private createComponentIfNotExists(name: string) {
    if (!this._components.has(name)) {
      const component = new NavComponent();

      this._components.set(name, component);
    }
  }
}
