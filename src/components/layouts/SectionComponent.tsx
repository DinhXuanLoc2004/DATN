import React, {FC, memo, ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {colors} from '../../constants/colors';
import { onLayout } from '../../utils/onLayout';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  flex?: number;
  onPress?: () => void;
  onLayout?: (event: any) => void
}

const SectionComponent: FC<Props> = ({children, style, flex, onPress, onLayout}) => {
  return onPress ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {flex: flex ?? 1, backgroundColor: colors.Backgournd_Color},
        style,
      ]}
      onLayout={onLayout}
      >
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[{flex: flex ?? 1}, style]} onLayout={onLayout}>{children}</View>
  );
};

export default memo(SectionComponent);
