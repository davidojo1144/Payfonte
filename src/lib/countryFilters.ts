import { Country } from '@/types/country';

export function filterCountries(
  countries: Country[],
  query: string,
  selectedCountryCode: string
) {
  const normalizedQuery = query.trim().toLowerCase();
  let list = countries;

  if (selectedCountryCode !== 'GLOBAL') {
    list = list.filter((country) => country.localeCode === selectedCountryCode);
  }

  if (!normalizedQuery) {
    return list;
  }

  return list.filter((country) => {
    const searchable = [
      country.name,
      country.dialingCode,
      country.currency,
      country.currencyCode,
      country.localeCode,
    ]
      .join(' ')
      .toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}
