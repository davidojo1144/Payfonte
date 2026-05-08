import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface CountriesSearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
}

export function CountriesSearchBar({
  value,
  onChangeText,
}: CountriesSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-3">
      <View
        className={`h-12 flex-row items-center rounded-2xl border bg-white px-3 ${
          isFocused ? 'border-primary' : 'border-slate-200'
        }`}
      >
        <Ionicons name="search" size={18} color={isFocused ? '#1e40af' : '#94a3b8'} />
        <TextInput
          className="flex-1 px-2 text-base text-slate-900"
          placeholder="Search by name, code, currency..."
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ height: 48, paddingVertical: 0, includeFontPadding: false }}
          textAlignVertical="center"
        />
        {value.length > 0 ? (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            className="h-7 w-7 items-center justify-center rounded-full bg-slate-100"
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <Ionicons name="close" size={14} color="#475569" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
