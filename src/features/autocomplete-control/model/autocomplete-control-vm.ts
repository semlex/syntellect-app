import { makeAutoObservable, runInAction } from 'mobx';
import { debounce } from 'shared/lib';

export class AutocompleteViewModel<T> {
  value = '';
  suggestions: T[] = [];
  isLoading = false;
  private debouncedGetSuggestions: () => void;

  constructor(
    private readonly maxSuggestions: number,
    private readonly fetchSuggestions: (query: string) => Promise<T[]>,
    private readonly getLabel: (item: T) => string,
  ) {
    makeAutoObservable(this);
    this.debouncedGetSuggestions = debounce(this.getSuggestions.bind(this), 300);
  }

  setValue(newValue: string) {
    this.value = newValue;
    this.debouncedGetSuggestions();
  }

  selectSuggestion(suggestion: T) {
    this.value = this.getLabel(suggestion);
    this.suggestions = [];
  }

  private async getSuggestions() {
    this.isLoading = true;

    try {
      const data = await this.fetchSuggestions(this.value);
      const unique = Array.from(new Map(data.map((item) => [this.getLabel(item), item])).values());

      runInAction(() => {
        this.suggestions = unique.slice(0, this.maxSuggestions);
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
