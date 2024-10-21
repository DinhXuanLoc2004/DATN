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

interface Props {
  title: string;
  translateY: any;
  translateX: any;
  scale: any;
  isBack?: boolean;
}

const HeaderScreenAnimation: FC<Props> = ({
  title,
  translateY,
  translateX,
  scale,
  isBack = true,
}) => {
  const navigation = useNavigation();
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
        <FontAwesome5
          name="search"
          size={handleSize(22)}
          color={colors.Text_Color}
        />
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
