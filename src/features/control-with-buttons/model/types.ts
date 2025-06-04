import { MouseEvent } from 'react';
import { ControlWithButtonsViewModel } from './control-with-buttons-vm';

export interface ControlButton {
  text: string;
  callback: (vm: ControlWithButtonsViewModel, e?: MouseEvent<HTMLButtonElement>) => void;
}
