import React, {FC} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import SectionComponent from './SectionComponent';
import {colors} from '../../constants/colors';

interface Props {
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  flexD?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const ContainerFilterComponent: FC<Props> = ({
  width,
  height,
  backgroundColor,
  flexD,
  style,
  children,
}) => {
  return (
    <SectionComponent
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor ?? colors.White_Color,
          flexDirection: flexD ?? 'row',
          width,
          height,
        },
        style,
      ]}>
      {children}
    </SectionComponent>
  );
};

export default ContainerFilterComponent;

const styles = StyleSheet.create({
  container: {
    elevation: 1,
  },
});
