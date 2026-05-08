import { Text, View } from 'react-native';

import {
  formatCurrencyExample,
  formatLocaleCode,
  getCountryLocaleTag,
} from '@/lib/locale';
import { Country } from '@/types/country';

interface CountryDetailsCardProps {
  country: Country;
  selectedLocale: string;
}

export function CountryDetailsCard({
  country,
  selectedLocale,
}: CountryDetailsCardProps) {
  const localeTag = getCountryLocaleTag(country);

  return (
    <View className="rounded-2xl border border-gray-200 bg-white p-5">
      <Text className="text-4xl mb-2">{country.flagEmoji}</Text>
      <Text className="text-2xl font-semibold text-gray-900">{country.name}</Text>
      <Text className="text-sm text-gray-600 mt-1">Dialing: {country.dialingCode}</Text>
      <Text className="text-sm text-gray-600">Locale code: {formatLocaleCode(country.localeCode)}</Text>
      <Text className="text-sm text-gray-600">Currency: {country.currency}</Text>
      <Text className="text-sm text-gray-600">
        Currency code: {country.currencyCode} {country.currencyIcon}
      </Text>

      <View className="mt-4 rounded-xl bg-blue-50 p-3">
        <Text className="text-sm text-blue-900">
          Display locale ({selectedLocale}) example:{' '}
          {formatCurrencyExample(country.currencyCode, selectedLocale)}
        </Text>
        <Text className="text-sm text-blue-900 mt-1">
          Country locale tag: {localeTag}
        </Text>
      </View>
    </View>
  );
}
