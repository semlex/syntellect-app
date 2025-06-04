import { useLocalObservable } from 'mobx-react-lite';
import { AutocompleteViewModel } from '../../model/autocomplete-control-vm';

export const useAutocompleteControlViewModel = <T>(
  maxSuggestions: number,
  fetchSuggestions: (query: string) => Promise<T[]>,
  getLabel: (item: T) => string,
) =>
  useLocalObservable(
    () => new AutocompleteViewModel<T>(maxSuggestions, fetchSuggestions, getLabel),
  );
