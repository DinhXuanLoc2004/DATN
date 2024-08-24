import React, {FC, ReactNode, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyle';
import TitleComponent from '../texts/TitleComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import {handleSize, WIDTH_SCREEN} from '../../utils/handleSize';
import { onLayout } from '../../utils/onLayout';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isScroll?: boolean;
  back?: boolean;
  title?: string;
  isHeader?: boolean;
  rightIcon?: ReactNode;
  rightOnPress?: () => void;
  onSroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollEventThrottle?: number;
  styleHeader?: ViewStyle;
}

const ContainerComponent: FC<Props> = ({
  children,
  style,
  isScroll,
  back,
  title,
  isHeader,
  rightIcon,
  rightOnPress,
  onSroll,
  scrollEventThrottle,
  styleHeader,
}) => {
  // const navigation: any = useNavigation()
  const [height_header, setheight_header] = useState<number>(0)
  return (
    <View style={[globalStyles.container, style]}>
      {isHeader && (
        <RowComponent
          justify="space-between"
          style={[
            {
              width: WIDTH_SCREEN,
            },
            globalStyles.headerInContainer,
            styleHeader,
          ]}
          onLayout={(event) => onLayout(event, setheight_header)}>
          {back ? (
            <TouchableOpacity onPress={() => {}}>
              <IonIcon
                name="chevron-back-outline"
                size={handleSize(24)}
                color={colors.Text_Color}
              />
            </TouchableOpacity>
          ) : (
            <SpaceComponent width={10} />
          )}
          {title ? (
            <TitleComponent text={title} />
          ) : (
            <SpaceComponent width={10} />
          )}
          {rightIcon ? (
            <TouchableOpacity onPress={rightOnPress}>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <SpaceComponent width={10} />
          )}
        </RowComponent>
      )}
      {isScroll ? (
        <ScrollView
          style={[{flex: 1,marginTop: height_header}, style]}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            onSroll && onSroll(e);
          }}
          scrollEventThrottle={scrollEventThrottle ?? 0}>
          {children}
        </ScrollView>
      ) : (
        <View style={[{flex: 1 ,marginTop: height_header},style]}>{children}</View>
      )}
    </View>
  );
};

export default ContainerComponent;
