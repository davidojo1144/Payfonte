import { Text, TouchableOpacity, View } from 'react-native';

import { formatLocaleCode } from '@/lib/locale';
import { Country } from '@/types/country';

interface CountryListItemProps {
  country: Country;
  onPress: (country: Country) => void;
}

export function CountryListItem({ country, onPress }: CountryListItemProps) {
  return (
    <TouchableOpacity
      className="rounded-2xl border border-gray-200 bg-white p-4 mb-3"
      onPress={() => onPress(country)}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900">
          {country.flagEmoji} {country.name}
        </Text>
        <Text className="text-sm text-gray-500">{country.dialingCode}</Text>
      </View>

      <View className="mt-2">
        <Text className="text-sm text-gray-600">
          Currency: {country.currency} ({country.currencyCode})
        </Text>
        <Text className="text-sm text-gray-600">
          Locale: {formatLocaleCode(country.localeCode)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
