import React, {FC, ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {globalStyles} from '../../styles/globalStyle';

interface Props {
  children: ReactNode;
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disable?: boolean;
  flex?: number;
  onLayout?: (event: any) => void;
}

const RowComponent: FC<Props> = ({
  children,
  justify,
  onPress,
  style,
  disable,
  flex,
  onLayout,
}) => {
  const LocalStyle = [
    globalStyles.row,
    {
      justifyContent: justify ?? 'space-between',
      flex: flex ?? 0,
    },
    style,
  ];
  return onPress ? (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress ? () => onPress() : undefined}
      style={LocalStyle}
      onLayout={onLayout}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={LocalStyle} onLayout={onLayout}>
      {children}
    </View>
  );
};

export default RowComponent;
