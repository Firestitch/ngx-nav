export class NavComponent {

  public value: any = null;
  public permanent = false;

  constructor() {
  }

  public updateValue(value) {
    this.value = value;
  }

  public clear() {
    this.value = null;
  }
}
