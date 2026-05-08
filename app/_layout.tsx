import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import { queryClient } from '@/lib/queryClient';
import { useAuthStore } from '@/store/authStore';
import '../global.css';

export default function RootLayout() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </QueryClientProvider>
  );
}
