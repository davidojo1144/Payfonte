import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { CountryDetailsCard } from '@/components/countries/CountryDetailsCard';
import { StateView } from '@/components/common/StateView';
import { useCountries } from '@/hooks/useCountries';
import { useLocaleStore } from '@/store/localeStore';

export default function CountryDetailsScreen() {
  const { countryCode } = useLocalSearchParams<{ countryCode: string }>();
  const { data = [], isLoading, isError, refetch } = useCountries();
  const { selectedLocale } = useLocaleStore();

  if (isLoading) {
    return (
      <StateView
        type="loading"
        title="Loading country"
        description="Preparing country details..."
      />
    );
  }

  if (isError) {
    return (
      <StateView
        type="error"
        title="Could not load country"
        description="Please retry."
        actionLabel="Retry"
        onActionPress={() => refetch()}
      />
    );
  }

  const country = data.find((item) => item.localeCode === countryCode);

  if (!country) {
    return (
      <StateView
        type="empty"
        title="Country not found"
        description="This country is not available in the current dataset."
      />
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 16 }}>
      <CountryDetailsCard country={country} selectedLocale={selectedLocale} />

      <View className="mt-4 rounded-2xl bg-white p-4 border border-gray-200">
        <Text className="text-base font-semibold text-gray-900">Raw locale code</Text>
        <Text className="text-gray-700 mt-1">{country.localeCode}</Text>
      </View>
    </ScrollView>
  );
}
