import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface StateViewProps {
  type: 'loading' | 'error' | 'empty';
  title: string;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function StateView({
  type,
  title,
  description,
  actionLabel,
  onActionPress,
}: StateViewProps) {
  return (
    <View className="flex-1 items-center justify-center px-6 bg-slate-50">
      {type === 'loading' ? (
        <ActivityIndicator size="large" color="#1e40af" />
      ) : null}
      <View className="mt-4 rounded-3xl bg-white px-6 py-6 border border-slate-200 w-full max-w-md">
        <Text className="text-xl font-semibold text-slate-900 text-center">{title}</Text>
        <Text className="text-center text-slate-600 mt-2">{description}</Text>
        {actionLabel && onActionPress ? (
          <TouchableOpacity
            className="mt-5 rounded-xl bg-primary px-5 py-3"
            onPress={onActionPress}
          >
            <Text className="text-white font-medium text-center">{actionLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
