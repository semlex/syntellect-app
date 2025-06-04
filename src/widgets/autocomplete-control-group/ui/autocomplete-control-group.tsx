import { AutocompleteControl } from 'features/autocomplete-control';
import { CountryInfo, CountryListItem, getCountriesByName } from 'entities/country';

import styles from './autocomplete-control-group.module.scss';

const AutocompleteControlGroup = () => {
  return (
    <div className={styles.container}>
      <AutocompleteControl<CountryInfo>
        placeholder="Поиск страны"
        maxSuggestions={3}
        fetchSuggestions={getCountriesByName}
        getLabel={(item) => item.name}
        renderListItem={(item) => <CountryListItem countryInfo={item} />}
      />
      <AutocompleteControl<CountryInfo>
        placeholder="Поиск страны"
        maxSuggestions={10}
        fetchSuggestions={getCountriesByName}
        getLabel={(item) => item.name}
        renderListItem={(item) => <CountryListItem countryInfo={item} />}
      />
    </div>
  );
};

export default AutocompleteControlGroup;
