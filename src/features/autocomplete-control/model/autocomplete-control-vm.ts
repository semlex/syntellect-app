import { makeAutoObservable, runInAction } from 'mobx';
import { debounce } from 'shared/lib';

export class AutocompleteViewModel<T> {
  value = '';
  suggestions: T[] = [];
  isLoading = false;

  private _debouncedGetSuggestions: () => void;

  constructor(
    private readonly _maxSuggestions: number,
    private readonly _fetchSuggestions: (query: string) => Promise<T[]>,
    private readonly _getLabel: (item: T) => string,
  ) {
    makeAutoObservable(this);

    this._getSuggestions();
    this._debouncedGetSuggestions = debounce(this._getSuggestions.bind(this), 250);
  }

  setValue(newValue: string) {
    this.value = newValue;
    this._debouncedGetSuggestions();
  }

  selectSuggestion(suggestion: T) {
    this.value = this._getLabel(suggestion);
    this.suggestions = [];
  }

  private async _getSuggestions() {
    this.isLoading = true;

    try {
      const data = await this._fetchSuggestions(this.value);
      const unique = Array.from(new Map(data.map((item) => [this._getLabel(item), item])).values());

      runInAction(() => {
        this.suggestions = unique.slice(0, this._maxSuggestions);
      });
    } catch (e) {
      console.error('Error while fetching suggestions:', e);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
