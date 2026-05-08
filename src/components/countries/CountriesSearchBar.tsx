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
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900"
        placeholder="Search by name, code, currency..."
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}
