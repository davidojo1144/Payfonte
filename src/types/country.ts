export interface CountryFlagUrls {
  png?: string;
  svg?: string;
  alt?: string;
}

export interface RawCountry {
  countryCode?: string;
  countryName?: string;
  currency?: string;
  currencyCode?: string;
  currencyIcon?: string;
  flag?: string;
  flagURL?: string | CountryFlagUrls;
  internetCountryCode?: string;
  countryId?: string;
}

export interface CountriesApiResponse {
  statusCode: number;
  data: RawCountry[];
}

export interface Country {
  id: string;
  name: string;
  dialingCode: string;
  currency: string;
  currencyCode: string;
  currencyIcon: string;
  localeCode: string;
  flagEmoji: string;
  flagUrlPng: string;
  flagAlt: string;
}
