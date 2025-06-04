import { makeAutoObservable } from 'mobx';

export class ControlWithButtonsViewModel {
  private _value = '';

  constructor() {
    makeAutoObservable(this);
  }

  get value() {
    return this._value;
  }

  setValue(value: string) {
    this._value = value;
  }
}
