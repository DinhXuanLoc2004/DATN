import React, {FC} from 'react';
import {DimensionValue, StyleProp, View, ViewStyle} from 'react-native';
import {handleSize} from '../../utils/handleSize';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  style?: StyleProp<ViewStyle>;
}

const SpaceComponent: FC<Props> = ({width, height, style}) => {
  return (
    <View
      style={[
        {
          width:
            typeof width === 'number'
              ? handleSize(width)
              : typeof width === 'string'
              ? width
              : undefined,
          height:
            typeof height === 'number'
              ? handleSize(height)
              : typeof height === 'string'
              ? height
              : undefined,
        },
        style,
      ]}
    />
  );
};

export default SpaceComponent;
