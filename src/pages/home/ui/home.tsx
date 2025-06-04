import { ControlWithButtonsGroup } from 'widgets/control-with-buttons-group';
import { AutocompleteControlGroup } from 'widgets/autocomplete-control-group';

import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <ControlWithButtonsGroup />
      <AutocompleteControlGroup />
    </div>
  );
};

export default Home;
