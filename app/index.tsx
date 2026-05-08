import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
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
      pathname: '/country/[countryCode]',
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
    <View className="flex-1 bg-slate-50">
      <Animated.FlatList
        entering={FadeIn}
        data={filteredCountries}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />
        }
        ListHeaderComponent={
          <View className="px-4 pt-4">
            <View className="rounded-3xl bg-primary px-4 py-4 mb-4">
              <Text className="text-white text-xl font-bold">PayFusion Countries</Text>
              <Text className="text-blue-100 mt-1">
                Explore country dialing, locale and currency metadata
              </Text>
              <View className="mt-3 rounded-2xl bg-white/15 px-3 py-2 self-start">
                <Text className="text-white text-xs font-semibold">
                  Total countries: {data.length}
                </Text>
              </View>
            </View>

            <CountriesSearchBar value={query} onChangeText={setQuery} />

            <Text className="text-sm font-semibold text-slate-700 mb-2">
              Display locale
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 12, paddingRight: 4 }}
            >
              {DISPLAY_LOCALES.map((localeOption) => (
                <TouchableOpacity
                  key={localeOption.value}
                  onPress={() => setSelectedLocale(localeOption.value)}
                  className={`mr-2 rounded-full px-4 py-2 ${
                    selectedLocale === localeOption.value
                      ? 'bg-primary'
                      : 'bg-white border border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      selectedLocale === localeOption.value
                        ? 'text-white'
                        : 'text-slate-700'
                    }`}
                  >
                    {localeOption.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text className="text-sm font-semibold text-slate-700 mb-2">
              Country context
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10, paddingRight: 4 }}
            >
              {countryOptions.map((code) => (
                <TouchableOpacity
                  key={code}
                  onPress={() => setSelectedCountryCode(code)}
                  className={`mr-2 rounded-full px-4 py-2 ${
                    selectedCountryCode === code
                      ? 'bg-secondary'
                      : 'bg-white border border-slate-200'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedCountryCode === code ? 'text-white' : 'text-slate-700'
                    }`}
                  >
                    {code}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View className="mb-3 mt-1">
              <Text className="text-xs text-slate-500">
                Showing {filteredCountries.length} result
                {filteredCountries.length === 1 ? '' : 's'}
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <StateView
            type="empty"
            title="No matching countries"
            description="Try a different search or country context."
          />
        }
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View className="px-4">
            <CountryListItem country={item} onPress={onOpenDetails} />
          </View>
        )}
      />
    </View>
  );
}
