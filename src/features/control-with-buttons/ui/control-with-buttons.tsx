import { observer } from 'mobx-react-lite';
import { Button, Input } from 'shared/ui';
import { ControlButton } from '../model/types';
import { useControlWithButtonsViewModel } from '../lib/hooks/use-control-with-buttons-vm';

import styles from './control-with-buttons.module.scss';

interface ControlWithButtonsProps {
  placeholder?: string;
  leftButtons?: ControlButton[];
  rightButtons?: ControlButton[];
}

const ControlWithButtons = observer(
  ({ placeholder, leftButtons, rightButtons }: ControlWithButtonsProps) => {
    const viewModel = useControlWithButtonsViewModel();

    const renderButton = (button: ControlButton) => {
      const { text, callback } = button;

      return <Button onClick={(e) => callback(viewModel, e)}>{text}</Button>;
    };

    return (
      <div className={styles.container}>
        {leftButtons?.map((button) => renderButton(button))}
        <Input
          value={viewModel.value}
          onChange={(e) => viewModel.setValue(e.target.value)}
          placeholder={placeholder}
          className={styles.control}
        />
        {rightButtons?.map((button) => renderButton(button))}
      </div>
    );
  },
);

export default ControlWithButtons;
