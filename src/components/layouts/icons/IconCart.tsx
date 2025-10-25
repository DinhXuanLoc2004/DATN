import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {handleSize} from '../../../utils/handleSize';
import {colors} from '../../../constants/colors';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getAllCartQueryKey,
  getLengthCartQuerykey,
} from '../../../constants/queryKeys';
import {useAppSelector} from '../../../helper/store/store';
import {getLengthCartAPI} from '../../../helper/apis/cart.api';
import TextComponent from '../../texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';

interface Props {
  isFocus?: boolean;
}

type stackProp = StackNavigationProp<stackParamListMain, 'DetailProductScreen'>;

const IconCart: FC<Props> = ({isFocus = false}) => {

  const length = useAppSelector(state => state.auth.user.lengthCart);
  const navigation = useNavigation<stackProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('CartScreen', {})}>
      <TextComponent
        text={`(${length > 0 && length < 99 ? length : 99})`}
        color={colors.Primary_Color}
        font={fontFamilies.semiBold}
        size={11}
        style={styles.txtLengthCart}
      />
      <Ionicons
        name="cart"
        size={handleSize(20)}
        color={colors.Primary_Color}
      />
    </TouchableOpacity>
  );
};

export default IconCart;

const styles = StyleSheet.create({
  txtLengthCart: {
    position: 'absolute',
    zIndex: 100,
    top: -8,
    right: -5,
  },
});
