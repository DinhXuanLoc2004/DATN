import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';

type Props = Pick<ViewStyle, 'width' | 'height'>;

const SpaceComponent: FC<Props> = ({width, height}) => {
  return <View style={{width: width, height: height}} />;
};

export default SpaceComponent;
