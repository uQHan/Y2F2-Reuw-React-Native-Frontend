import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type DividerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Divider({ style, lightColor, darkColor, ...otherProps }: DividerProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <View style={[{ backgroundColor }, style, {height: 2}]} {...otherProps} />;
}
