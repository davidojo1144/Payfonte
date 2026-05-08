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
      className="rounded-2xl border border-slate-200 bg-white p-4 mb-3 shadow-sm"
      onPress={() => onPress(country)}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-slate-900 flex-1 pr-2">
          {country.flagEmoji} {country.name}
        </Text>
        <View className="rounded-full bg-slate-100 px-3 py-1">
          <Text className="text-xs font-semibold text-slate-600">
            {country.dialingCode}
          </Text>
        </View>
      </View>

      <View className="mt-3">
        <Text className="text-sm text-slate-600">
          Currency: {country.currency} ({country.currencyCode})
        </Text>
        <Text className="text-sm text-slate-600">
          Locale: {formatLocaleCode(country.localeCode)}
        </Text>
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-xs text-slate-500">Tap for details</Text>
        <Text className="text-sm text-primary font-semibold">View</Text>
      </View>
    </TouchableOpacity>
  );
}
