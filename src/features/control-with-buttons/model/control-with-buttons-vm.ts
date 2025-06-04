import { makeAutoObservable } from 'mobx';

export class ControlWithButtonsViewModel {
  value = '';

  constructor() {
    makeAutoObservable(this);
  }

  setValue(newValue: string) {
    this.value = newValue;
  }
}
