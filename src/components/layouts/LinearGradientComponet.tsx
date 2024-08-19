import React, { FC, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { globalStyles } from '../../styles/globalStyle';
import SectionComponent from './SectionComponent';

interface Props {
  children?: ReactNode;
  ArrColor?: string[];
  style?: StyleProp<ViewStyle>;
  styleContainerLinearGradient?: StyleProp<ViewStyle>
}

const LinearGradientComponet: FC<Props> = ({children, ArrColor, style, styleContainerLinearGradient}) => {
  return (
    <SectionComponent style={[ {flex: 1},styleContainerLinearGradient]}>
        {children && children}
        <LinearGradient
        colors={ArrColor ?? [colors.Transperen_Color, colors.Black_Color_RGBA]}
        style={[globalStyles.linearGradient, style]}
        />
    </SectionComponent>
  );
};

export default LinearGradientComponet;
