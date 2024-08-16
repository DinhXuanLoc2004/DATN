import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
import {handleSize} from '../../utils/handleSize';

type Props = Pick<ViewStyle, 'width' | 'height'>;

const SpaceComponent: FC<Props> = ({width, height}) => {
  return (
    <View
      style={{
        width: typeof width === 'number' ? handleSize(width) : undefined,
        height: typeof height === 'number' ? handleSize(height) : undefined,
      }}
    />
  );
};

export default SpaceComponent;
