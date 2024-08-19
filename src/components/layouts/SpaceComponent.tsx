import React, {FC} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {handleSize} from '../../utils/handleSize';

interface Props {
  width?: number,
  height?: number,
  style?: StyleProp<ViewStyle>
}

const SpaceComponent: FC<Props> = ({width, height, style}) => {
  return (
    <View
      style={[{
        width: typeof width === 'number' ? handleSize(width) : undefined,
        height: typeof height === 'number' ? handleSize(height) : undefined,
      }, style]}
    />
  );
};

export default SpaceComponent;
