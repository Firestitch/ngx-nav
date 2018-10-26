import { NavComponent } from '../models/component.model';

export class FsNavComponents {

  private _components = new Map<string, NavComponent>();

  constructor(
    private _stackUpdated
  ) {}

  public setComponentValue(name, value, permanent) {
    this.createComponentIfNotExists(name);

    if (this._components.has(name)) {
      const component = this._components.get(name);

      component.updateValue(value);

      if (permanent !== null) {
        component.permanent = permanent;
      }
    }

    this._stackUpdated.emit({
      target: 'component',
      payload: {
        name,
        component: this._components.get(name)
      }
    })
  }

  public clear() {
    this._components.forEach((component) => {
      if (!component.permanent) {
        component.clear();
      }
    })
  }

  private createComponentIfNotExists(name: string) {
    if (!this._components.has(name)) {
      const component = new NavComponent();

      this._components.set(name, component);
    }
  }
}
