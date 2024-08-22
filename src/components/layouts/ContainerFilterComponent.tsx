import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { handleSize } from '../../utils/handleSize';
import SectionComponent from './SectionComponent';

interface Props {
  paddingVertical?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const ContainerFilterComponent: FC<Props> = ({
  paddingVertical,
  backgroundColor,
  style,
  children,
}) => {
  return (
    <SectionComponent
      style={[
        {
          backgroundColor: backgroundColor ?? colors.White_Color,
          paddingVertical: handleSize(paddingVertical ?? 24),
          paddingHorizontal: handleSize(16),
          width: '100%',
          justifyContent: 'center',
          elevation: handleSize(1)
        },
        style,
      ]}
      flex={0}>
      {children}
    </SectionComponent>
  );
};

export default ContainerFilterComponent;
