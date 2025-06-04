import { getRandom } from 'shared/lib';
import { CountryInfo } from '../model/types';
import countries from '../model/countries.json';

export async function getCountriesByName(countryName: string): Promise<CountryInfo[]> {
  if (typeof countryName !== 'string' || !countryName) {
    return [];
  }

  await new Promise((resolve) => {
    setTimeout(resolve, getRandom(100, 800));
  });

  const searchText = countryName.toLocaleLowerCase();
  return countries.filter(
    (x) =>
      x.name.toLocaleLowerCase().startsWith(searchText) ||
      x.fullName.toLocaleLowerCase().startsWith(searchText),
  );
}
