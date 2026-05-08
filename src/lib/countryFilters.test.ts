import { filterCountries } from '@/lib/countryFilters';
import { Country } from '@/types/country';

const countries: Country[] = [
  {
    id: '1',
    name: 'Nigeria',
    dialingCode: '+234',
    currency: 'Nigerian naira',
    currencyCode: 'NGN',
    currencyIcon: '₦',
    localeCode: 'NG',
    flagEmoji: '🇳🇬',
    flagUrlPng: '',
    flagAlt: '',
  },
  {
    id: '2',
    name: 'Ghana',
    dialingCode: '+233',
    currency: 'Ghanaian cedi',
    currencyCode: 'GHS',
    currencyIcon: '₵',
    localeCode: 'GH',
    flagEmoji: '🇬🇭',
    flagUrlPng: '',
    flagAlt: '',
  },
];

describe('filterCountries', () => {
  it('filters by selected country context first', () => {
    const result = filterCountries(countries, '', 'NG');
    expect(result).toHaveLength(1);
    expect(result[0].localeCode).toBe('NG');
  });

  it('searches across name, code, currency and locale', () => {
    const byName = filterCountries(countries, 'ghana', 'GLOBAL');
    const byCurrencyCode = filterCountries(countries, 'ngn', 'GLOBAL');
    const byDialingCode = filterCountries(countries, '+233', 'GLOBAL');

    expect(byName).toHaveLength(1);
    expect(byName[0].name).toBe('Ghana');
    expect(byCurrencyCode[0].name).toBe('Nigeria');
    expect(byDialingCode[0].name).toBe('Ghana');
  });
});
