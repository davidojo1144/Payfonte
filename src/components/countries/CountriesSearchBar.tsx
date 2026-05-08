import { TextInput, View } from 'react-native';

interface CountriesSearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
}

export function CountriesSearchBar({
  value,
  onChangeText,
}: CountriesSearchBarProps) {
  return (
    <View className="mb-3">
      <TextInput
        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-base"
        placeholder="Search by name, code, currency..."
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}
