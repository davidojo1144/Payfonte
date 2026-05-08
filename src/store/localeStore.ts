import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LocaleState {
  selectedLocale: string;
  selectedCountryCode: string;
  setSelectedLocale: (locale: string) => void;
  setSelectedCountryCode: (countryCode: string) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      selectedLocale: 'en-US',
      selectedCountryCode: 'GLOBAL',
      setSelectedLocale: (selectedLocale: string) => set({ selectedLocale }),
      setSelectedCountryCode: (selectedCountryCode: string) =>
        set({ selectedCountryCode }),
    }),
    {
      name: 'locale-preferences',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
