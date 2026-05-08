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
    <View className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <View className="flex-row items-center justify-between">
        <Text className="text-4xl mb-2">{country.flagEmoji}</Text>
        <View className="rounded-full bg-slate-100 px-3 py-1">
          <Text className="text-xs font-semibold text-slate-700">
            {country.dialingCode}
          </Text>
        </View>
      </View>
      <Text className="text-2xl font-semibold text-slate-900">{country.name}</Text>
      <Text className="text-sm text-slate-600 mt-1">
        Locale code: {formatLocaleCode(country.localeCode)}
      </Text>
      <Text className="text-sm text-slate-600 mt-3">Currency: {country.currency}</Text>
      <Text className="text-sm text-slate-600">
        Currency code: {country.currencyCode} {country.currencyIcon}
      </Text>

      <View className="mt-4 rounded-2xl bg-blue-50 p-4">
        <Text className="text-sm text-blue-900 font-medium">
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
