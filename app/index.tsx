import { View, Text, TouchableOpacity } from 'react-native';

import { showToast } from '@/lib/toast';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-primary mb-4">
        Welcome to Payfonte
      </Text>
      <Text className="text-base text-gray-600 mb-8 text-center px-4">
        Expo SDK 54 + React Native + NativeWind v4 + Zustand + React Query
      </Text>

      <TouchableOpacity
        className="bg-primary px-6 py-3 rounded-xl"
        onPress={() =>
          showToast.success({
            text1: 'Success',
            text2: 'Everything is set up correctly!',
          })
        }
      >
        <Text className="text-white font-semibold">Test Toast</Text>
      </TouchableOpacity>
    </View>
  );
}
