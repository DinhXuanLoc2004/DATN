import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {voucher} from '../../../helper/types/voucher.type';
import RowComponent from '../RowComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import SpaceComponent from '../SpaceComponent';
import SectionComponent from '../SectionComponent';
import TextComponent from '../../texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import CountDownTime from '../times/CountDownTime';
import {colors} from '../../../constants/colors';
import {handleSize} from '../../../utils/handleSize';
import {saveVoucherUserBody} from '../../../helper/types/voucher_user.type';
import {useAppSelector} from '../../../helper/store/store';
import {saveVoucherUserAPI} from '../../../helper/apis/voucher_user.api';
import {fotmatedAmount} from '../../../utils/fotmats';

interface Props {
  item: voucher;
  handleSaveVoucher: (voucher_is: string, is_saved: boolean) => void;
}

type stackProp = StackNavigationProp<stackParamListMain, 'VouchersScreen'>;

const ItemVoucherComponent: FC<Props> = ({item, handleSaveVoucher}) => {
  const navigation = useNavigation<stackProp>();
  const [is_loading, setis_loading] = useState(false);
  const [is_saved_local, setis_saved_local] = useState(item.is_saved);
  const user_id = useAppSelector(state => state.auth.user.userId);
  const handleSave = async () => {
    if (is_saved_local) {
      navigation.navigate('CartScreen', {});
    } else {
      setis_loading(true);
      const body: saveVoucherUserBody = {
        user_id,
        voucher_id: item._id,
      };
      const data = await saveVoucherUserAPI(body);
      setis_loading(false);
      if (data?.status === 201) {
        setis_saved_local(true);
      }
    }
  };
  return (
    <RowComponent
      style={styles.item}
      justify="space-between"
      onPress={() =>
        navigation.navigate('VoucherDetailScreen', {
          voucher_id: item._id,
        })
      }>
      <Image source={{uri: item.thumb}} style={styles.img} />
      <SpaceComponent width={10} />
      <RowComponent flex={1}>
        <SectionComponent>
          <TextComponent
            text={`${item.voucher_name}`}
            size={14}
            font={fontFamilies.semiBold}
            numberOfLines={1}
          />
          <SpaceComponent height={4} />
          <TextComponent
            text={`Code: ${item.voucher_code}`}
            size={11}
            font={fontFamilies.medium}
          />
          <SpaceComponent height={4} />
          <TextComponent
            text={`Get up to ${
              item.voucher_type === 'deduct_money'
                ? fotmatedAmount(item.voucher_value)
                : `${item.voucher_value}%`
            } off on orders of at least ${fotmatedAmount(
              item.min_order_value,
            )}.`}
            size={11}
            numberOfLines={1}
            lineHeight={15}
            style={{width: '95%'}}
          />
        </SectionComponent>
        <SectionComponent style={styles.containerRight} flex={1}>
          <CountDownTime time_end={item.time_end} is_not_end_later />
          <TouchableOpacity
            disabled={item.is_used || is_loading}
            style={[
              styles.btn,
              {
                backgroundColor: is_loading
                  ? colors.White_Color
                  : is_saved_local && item.is_used === false
                  ? colors.White_Color
                  : is_saved_local && item.is_used
                  ? colors.Gray_Color
                  : colors.Primary_Color,
                opacity: item.is_used ? 0.55 : 1,
                borderColor: item?.is_used
                  ? colors.Gray_Color
                  : colors.Primary_Color,
              },
            ]}
            onPress={() => handleSave()}>
            {is_loading ? (
              <ActivityIndicator color={colors.Primary_Color} size={20} />
            ) : (
              <TextComponent
                text={
                  is_saved_local && item.is_used === false
                    ? 'Use'
                    : is_saved_local && item.is_used
                    ? 'Used'
                    : 'Save'
                }
                size={14}
                font={fontFamilies.semiBold}
                color={
                  is_saved_local && item.is_used === false
                    ? colors.Primary_Color
                    : colors.White_Color
                }
              />
            )}
          </TouchableOpacity>
        </SectionComponent>
      </RowComponent>
    </RowComponent>
  );
};

export default ItemVoucherComponent;

const styles = StyleSheet.create({
  btn: {
    width: handleSize(93),
    height: handleSize(36),
    backgroundColor: colors.Primary_Color,
    borderRadius: handleSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.Primary_Color,
    borderWidth: 1.5,
  },
  containerRight: {
    paddingRight: handleSize(15),
    paddingVertical: handleSize(11),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  img: {
    width: handleSize(80),
    height: handleSize(80),
    borderTopLeftRadius: handleSize(8),
    borderBottomLeftRadius: handleSize(8),
    resizeMode: 'stretch',
  },
  item: {
    width: '100%',
    height: handleSize(80),
    borderRadius: handleSize(8),
    backgroundColor: colors.White_Color,
    elevation: 3,
  },
});
