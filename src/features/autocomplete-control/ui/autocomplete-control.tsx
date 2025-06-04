import { ReactNode, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Input } from 'shared/ui';
import { useAutocompleteControlViewModel } from '../lib/hooks/use-autocomplete-control-vm';

import styles from './autocomplete-control.module.scss';

interface AutocompleteControlProps<T> {
  placeholder?: string;
  maxSuggestions: number;
  fetchSuggestions: (query: string) => Promise<T[]>;
  getLabel: (item: T) => string;
  renderListItem: (item: T) => ReactNode;
}

const AutocompleteControl = observer(
  <T,>({
    placeholder,
    maxSuggestions = 10,
    fetchSuggestions,
    getLabel,
    renderListItem,
  }: AutocompleteControlProps<T>) => {
    const viewModel = useAutocompleteControlViewModel(maxSuggestions, fetchSuggestions, getLabel);

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <div className={styles.container}>
        <Input
          value={viewModel.value}
          onChange={(e) => {
            viewModel.setValue(e.target.value);
          }}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {isFocused && !viewModel.isLoading && viewModel.suggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {viewModel.suggestions.map((item, idx) => (
              <li
                className={styles.suggestion}
                key={idx}
                onMouseDown={() => {
                  viewModel.selectSuggestion(item);
                }}
              >
                {renderListItem(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export default AutocompleteControl;
