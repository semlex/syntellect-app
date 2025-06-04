import { CountryInfo } from '../model/types';

import styles from './country-list-item.module.scss';

interface CountryListItemProps {
  countryInfo: CountryInfo;
}

const CountryListItem = ({ countryInfo }: CountryListItemProps) => {
  const { name, fullName, flag } = countryInfo;

  return (
    <div className={styles.container}>
      <img src={flag} alt={name} className={styles.flag} />
      <div className={styles.text}>
        <div className={styles.name}>{name}</div>
        <div className={styles.fullName}>{fullName}</div>
      </div>
    </div>
  );
};

export default CountryListItem;
