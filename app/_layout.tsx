import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import { queryClient } from '@/lib/queryClient';
import { useAuthStore } from '@/store/authStore';
import '../global.css';

export default function RootLayout() {
  const { checkAuth } = useAuthStore();
  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '700', color: '#0f172a' },
          contentStyle: { backgroundColor: '#f8fafc' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Countries' }} />
        <Stack.Screen
          name="countries/[countryCode]"
          options={{
            title: 'Country Details',
            headerBackButtonDisplayMode: 'minimal',
          }}
        />
      </Stack>
      <Toast />
    </PersistQueryClientProvider>
  );
}
