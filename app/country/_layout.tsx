import { Stack } from 'expo-router';

export default function CountryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[countryCode]"
        options={{
          title: 'Country Details',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack>
  );
}
