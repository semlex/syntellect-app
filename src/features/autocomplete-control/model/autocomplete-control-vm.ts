import { makeAutoObservable, runInAction } from 'mobx';
import { debounce } from 'shared/lib';

export class AutocompleteViewModel<T> {
  private _value = '';
  private _suggestions: T[] = [];
  private _isLoading = false;

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

  get value() {
    return this._value;
  }

  get suggestions() {
    return this._suggestions;
  }

  get isLoading() {
    return this._isLoading;
  }

  setValue(value: string) {
    this._value = value;
    this._debouncedGetSuggestions();
  }

  selectSuggestion(suggestion: T) {
    this._value = this._getLabel(suggestion);
    this._suggestions = [];
  }

  private async _getSuggestions() {
    this._isLoading = true;

    try {
      const data = await this._fetchSuggestions(this.value);
      const unique = Array.from(new Map(data.map((item) => [this._getLabel(item), item])).values());

      runInAction(() => {
        this._suggestions = unique.slice(0, this._maxSuggestions);
      });
    } catch (e) {
      console.error('Error while fetching suggestions:', e);
    } finally {
      runInAction(() => {
        this._isLoading = false;
      });
    }
  }
}
