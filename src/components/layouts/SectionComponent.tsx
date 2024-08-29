import React, {FC, memo, ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import { colors } from '../../constants/colors';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  flex?: number;
  onPress?: () => void;
}

const SectionComponent: FC<Props> = ({children, style, flex, onPress}) => {
  return onPress ? (
    <TouchableOpacity style={[{flex: flex ?? 1, backgroundColor: colors.Backgournd_Color}, style]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[{flex: flex ?? 1}, style]}>{children}</View>
  );
};

export default memo(SectionComponent);
