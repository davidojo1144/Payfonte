import api from '@/services/api';
import { CountriesApiResponse, Country, RawCountry } from '@/types/country';

function getFlagUrlPng(flagURL: RawCountry['flagURL']) {
  if (!flagURL) {
    return '';
  }

  if (typeof flagURL === 'string') {
    return flagURL;
  }

  return flagURL.png ?? '';
}

function getFlagAlt(flagURL: RawCountry['flagURL']) {
  if (!flagURL || typeof flagURL === 'string') {
    return '';
  }

  return flagURL.alt ?? '';
}

export function normalizeCountry(rawCountry: RawCountry): Country {
  const localeCode = rawCountry.internetCountryCode || 'GLOBAL';
  const dialingCode = rawCountry.countryCode || 'N/A';

  return {
    id: rawCountry.countryId || `${localeCode}-${dialingCode}`,
    name: rawCountry.countryName || 'Unknown',
    dialingCode,
    currency: rawCountry.currency || 'Unknown currency',
    currencyCode: rawCountry.currencyCode || 'N/A',
    currencyIcon: rawCountry.currencyIcon || '',
    localeCode,
    flagEmoji: rawCountry.flag || '🌍',
    flagUrlPng: getFlagUrlPng(rawCountry.flagURL),
    flagAlt: getFlagAlt(rawCountry.flagURL),
  };
}

export async function fetchCountries() {
  const response = await api.get<CountriesApiResponse>('/countries');

  if (!Array.isArray(response.data?.data)) {
    return [];
  }

  return response.data.data.map(normalizeCountry);
}
