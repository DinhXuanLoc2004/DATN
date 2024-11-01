import {Animated, StyleProp, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {handleSize} from '../../utils/handleSize';
import {colors} from '../../constants/colors';
import SpaceComponent from './SpaceComponent';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StackNavigationProp } from '@react-navigation/stack';
import { stackParamListMain } from '../../navigation/StackMainNavigation';
import IconSearch from './icons/IconSearch';

interface Props {
  title: string;
  translateY: any;
  translateX: any;
  scale: any;
  isBack?: boolean;
}

type stackProp = StackNavigationProp<stackParamListMain, 'BottomTab'>

const HeaderScreenAnimation: FC<Props> = ({
  title,
  translateY,
  translateX,
  scale,
  isBack = true,
}) => {
  const navigation = useNavigation<stackProp>();
  return (
    <View style={[styles.header]}>
      <RowComponent style={[styles.iconHeader, {alignItems: 'flex-start'}]}>
        <SectionComponent>
          {isBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={handleSize(24)}
                color={colors.Text_Color}
              />
            </TouchableOpacity>
          )}
          <SpaceComponent height={30} />
          <Animated.View
            style={{
              transform: [{translateY}, {translateX}, {scale}],
            }}>
            <TextComponent text={title} size={34} font={fontFamilies.bold} />
          </Animated.View>
        </SectionComponent>
        <IconSearch onPress={() => navigation.navigate('SearchScreen')}/>
      </RowComponent>
    </View>
  );
};

export default HeaderScreenAnimation;

const styles = StyleSheet.create({
  iconHeader: {
    paddingHorizontal: handleSize(16),
  },
  header: {
    paddingVertical: handleSize(11),
    width: '100%',
    backgroundColor: colors.White_Color,
  },
});
