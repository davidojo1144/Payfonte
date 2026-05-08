import { Country } from '@/types/country';

export const DISPLAY_LOCALES = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'English (UK)', value: 'en-GB' },
  { label: 'French (FR)', value: 'fr-FR' },
] as const;

export function formatLocaleCode(localeCode: string) {
  if (!localeCode || localeCode === 'GLOBAL') {
    return 'Global';
  }

  return localeCode;
}

export function formatCurrencyExample(
  currencyCode: string,
  locale = 'en-US',
  amount = 1000
) {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount}`;
  }
}

export function getCountryLocaleTag(country: Country) {
  if (!country.localeCode || country.localeCode === 'GLOBAL') {
    return 'en-US';
  }

  return `en-${country.localeCode}`;
}
