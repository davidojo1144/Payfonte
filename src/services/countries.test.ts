import { normalizeCountry } from '@/services/countries';

describe('normalizeCountry', () => {
  it('maps raw payload fields into the UI country model', () => {
    const country = normalizeCountry({
      countryId: 'abc-123',
      countryName: 'Nigeria',
      countryCode: '+234',
      currency: 'Nigerian naira',
      currencyCode: 'NGN',
      currencyIcon: '₦',
      internetCountryCode: 'NG',
      flag: '🇳🇬',
      flagURL: {
        png: 'https://flagcdn.com/w320/ng.png',
        alt: 'Flag of Nigeria',
      },
    });

    expect(country).toEqual({
      id: 'abc-123',
      name: 'Nigeria',
      dialingCode: '+234',
      currency: 'Nigerian naira',
      currencyCode: 'NGN',
      currencyIcon: '₦',
      localeCode: 'NG',
      flagEmoji: '🇳🇬',
      flagUrlPng: 'https://flagcdn.com/w320/ng.png',
      flagAlt: 'Flag of Nigeria',
    });
  });

  it('provides safe fallbacks when optional fields are missing', () => {
    const country = normalizeCountry({
      countryCode: 'GLOBAL',
      internetCountryCode: 'GLOBAL',
    });

    expect(country.id).toBe('GLOBAL-GLOBAL');
    expect(country.name).toBe('Unknown');
    expect(country.currency).toBe('Unknown currency');
    expect(country.flagEmoji).toBe('🌍');
  });
});
