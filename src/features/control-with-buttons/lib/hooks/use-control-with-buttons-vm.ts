import { useLocalObservable } from 'mobx-react-lite';
import { ControlWithButtonsViewModel } from '../../model/control-with-buttons-vm';

export const useControlWithButtonsViewModel = () =>
  useLocalObservable(() => new ControlWithButtonsViewModel());
