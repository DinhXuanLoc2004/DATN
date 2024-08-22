import React, {FC, ReactNode} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyle';
import TitleComponent from '../texts/TitleComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import {handleSize} from '../../utils/handleSize';

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
  return (
    <View style={[globalStyles.container, style]}>
      {isHeader && (
        <RowComponent
          justify="space-between"
          style={[
            {
              paddingVertical: handleSize(11),
            },
            styleHeader,
          ]}>
          {back ? (
            <TouchableOpacity onPress={() => {}}>
              <IonIcon
                name="chevron-back-outline"
                size={handleSize(24)}
                color={colors.Text_Color}
                style={{marginStart: handleSize(16)}}
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
          style={[globalStyles.container, style]}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            onSroll && onSroll(e);
          }}
          scrollEventThrottle={scrollEventThrottle ?? 0}>
          {children}
        </ScrollView>
      ) : (
        <View style={[globalStyles.container, style]}>{children}</View>
      )}
    </View>
  );
};

export default ContainerComponent;
