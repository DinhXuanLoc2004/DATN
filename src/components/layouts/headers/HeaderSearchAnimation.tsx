import React, {FC} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {animationHeaderHome} from '../../../utils/animations';
import {handleSize} from '../../../utils/handleSize';
import TextComponent from '../../texts/TextComponent';
import RowComponent from '../RowComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import SpaceComponent from '../SpaceComponent';
import {Image} from 'react-native';

interface Props {
  aniamtedValue: Animated.Value;
}

type stackProp = StackNavigationProp<stackParamListMain, 'BottomTab'>;

const HeaderSearchAnimation: FC<Props> = ({aniamtedValue}) => {
  const navigation = useNavigation<stackProp>();
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: animationHeaderHome(aniamtedValue, [0, 1]),
        },
      ]}>
      <Animated.View
        style={[
          {transform: [{scale: animationHeaderHome(aniamtedValue, [0.75, 1])}]},
        ]}>
        <TouchableOpacity
          style={styles.btnSearch}
          onPress={() => navigation.navigate('SearchScreen')}>
          <RowComponent>
            <TextComponent text="Search" font={fontFamilies.medium} size={14} />
            <FontAwesome5 name="search" size={20} />
          </RowComponent>
        </TouchableOpacity>
      </Animated.View>
      <SpaceComponent height={16} />
    </Animated.View>
  );
};

export default HeaderSearchAnimation;

const styles = StyleSheet.create({
  icon: {
    height: handleSize(25),
    width: handleSize(25),
  },
  btnSearch: {
    width: '100%',
    height: 'auto',
    padding: handleSize(10),
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
    borderRadius: 5,
  },
  liner: {
    height: '50%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  pagerView: {
    flex: 1,
    opacity: 0.5,
  },
  container: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    top: 0,
    zIndex: 1000,
    backgroundColor: colors.White_Color,
    elevation: 5,
    padding: handleSize(16),
    justifyContent: 'center',
    paddingBottom: 0,
  },
});
