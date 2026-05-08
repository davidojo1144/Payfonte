import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FadeIn } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { CountriesSearchBar } from '@/components/countries/CountriesSearchBar';
import { CountryListItem } from '@/components/countries/CountryListItem';
import { StateView } from '@/components/common/StateView';
import { useCountries } from '@/hooks/useCountries';
import { filterCountries } from '@/lib/countryFilters';
import { DISPLAY_LOCALES } from '@/lib/locale';
import { Country } from '@/types/country';
import { useLocaleStore } from '@/store/localeStore';

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { data = [], isLoading, isError, refetch, isRefetching } = useCountries();
  const {
    selectedLocale,
    setSelectedLocale,
    selectedCountryCode,
    setSelectedCountryCode,
  } = useLocaleStore();

  const filteredCountries = useMemo(() => {
    return filterCountries(data, query, selectedCountryCode);
  }, [data, query, selectedCountryCode]);

  const countryOptions = useMemo(() => {
    const options = Array.from(new Set(data.map((country) => country.localeCode)));
    return ['GLOBAL', ...options.filter((code) => code !== 'GLOBAL')];
  }, [data]);

  const onOpenDetails = (country: Country) => {
    router.push({
      pathname: '/countries/[countryCode]',
      params: { countryCode: country.localeCode },
    });
  };

  if (isLoading) {
    return (
      <StateView
        type="loading"
        title="Loading countries"
        description="Fetching countries from PayFusion API..."
      />
    );
  }

  if (isError) {
    return (
      <StateView
        type="error"
        title="Could not load countries"
        description="Please check your network and retry."
        actionLabel="Retry"
        onActionPress={() => refetch()}
      />
    );
  }

  if (data.length === 0) {
    return (
      <StateView
        type="empty"
        title="No countries found"
        description="The API returned an empty list."
        actionLabel="Refresh"
        onActionPress={() => refetch()}
      />
    );
  }

  return (
    <View className="flex-1 bg-gray-50 px-4 pt-4">
      <CountriesSearchBar value={query} onChangeText={setQuery} />

      <Text className="text-sm font-semibold text-gray-700 mb-2">Display locale</Text>
      <View className="flex-row mb-4">
        {DISPLAY_LOCALES.map((localeOption) => (
          <TouchableOpacity
            key={localeOption.value}
            onPress={() => setSelectedLocale(localeOption.value)}
            className={`mr-2 rounded-full px-3 py-2 ${
              selectedLocale === localeOption.value ? 'bg-primary' : 'bg-white'
            }`}
          >
            <Text
              className={`text-xs ${
                selectedLocale === localeOption.value
                  ? 'text-white'
                  : 'text-gray-700'
              }`}
            >
              {localeOption.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-sm font-semibold text-gray-700 mb-2">Country context</Text>
      <FlatList
        horizontal
        data={countryOptions}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCountryCode(item)}
            className={`mr-2 rounded-full px-3 py-2 ${
              selectedCountryCode === item ? 'bg-secondary' : 'bg-white'
            }`}
          >
            <Text
              className={`text-xs ${
                selectedCountryCode === item ? 'text-white' : 'text-gray-700'
              }`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {filteredCountries.length === 0 ? (
        <StateView
          type="empty"
          title="No matching countries"
          description="Try a different search or country context."
        />
      ) : (
        <Animated.FlatList
          entering={FadeIn}
          data={filteredCountries}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />
          }
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => (
            <CountryListItem country={item} onPress={onOpenDetails} />
          )}
        />
      )}
    </View>
  );
}
