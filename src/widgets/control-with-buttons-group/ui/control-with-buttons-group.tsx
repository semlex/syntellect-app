import { ControlWithButtons } from 'features/control-with-buttons';
import { checkIsNumber } from 'shared/lib';

import styles from './control-with-buttons-group.module.scss';

const ControlWithButtonGroup = () => {
  return (
    <div className={styles.container}>
      <ControlWithButtons
        placeholder="Введите текст"
        rightButtons={[
          { text: 'Очистить', callback: (vm) => vm.setValue('') },
          { text: 'Hello world!', callback: (vm) => vm.setValue('Hello world!') },
        ]}
      />
      <ControlWithButtons
        placeholder="Введите текст"
        leftButtons={[
          {
            text: 'Проверить число',
            callback: (vm) => {
              checkIsNumber(vm.value) && alert(vm.value.trim());
            },
          },
        ]}
        rightButtons={[
          {
            text: 'Alert',
            callback: (vm) => alert(vm.value),
          },
        ]}
      />
    </div>
  );
};

export default ControlWithButtonGroup;
