import React, {FC, ReactNode, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyle';
import {handleSize, WIDTH_SCREEN} from '../../utils/handleSize';
import {onLayout} from '../../utils/onLayout';
import TitleComponent from '../texts/TitleComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../navigation/StackMainNavigation';

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
  refreshing?: boolean;
  onRefresh?: () => void;
  backOnPress?: () => void;
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
  refreshing,
  onRefresh,
  backOnPress
}) => {
  const navigation: any = useNavigation();
  const [height_header, setheight_header] = useState<number>(0);
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
          onLayout={event => onLayout(event, setheight_header)}>
          {back ? (
            <TouchableOpacity
              onPress={() => {
                 backOnPress ? backOnPress() : navigation.goBack();
              }}>
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
          style={[{flex: 1, marginTop: height_header}, style]}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            onSroll && onSroll(e);
          }}
          scrollEventThrottle={scrollEventThrottle ?? 0}
          refreshControl={
            <RefreshControl
              refreshing={refreshing ?? false}
              onRefresh={() => onRefresh && onRefresh()}
              colors={[colors.Primary_Color]}
            />
          }>
          {children}
        </ScrollView>
      ) : (
        <View style={[{flex: 1, marginTop: height_header}, style]}>
          {children}
        </View>
      )}
    </View>
  );
};

export default ContainerComponent;

const styles = StyleSheet.create({
})
