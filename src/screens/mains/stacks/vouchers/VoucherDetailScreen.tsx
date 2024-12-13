import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import CountDownTime from '../../../../components/layouts/times/CountDownTime';
import TextComponent from '../../../../components/texts/TextComponent';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {getVoucherDetailAPI} from '../../../../helper/apis/voucher.api';
import {saveVoucherUserAPI} from '../../../../helper/apis/voucher_user.api';
import {useAppSelector} from '../../../../helper/store/store';
import {voucherDetail} from '../../../../helper/types/voucher.type';
import {saveVoucherUserBody} from '../../../../helper/types/voucher_user.type';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {globalStyles} from '../../../../styles/globalStyle';
import {handleSize} from '../../../../utils/handleSize';
import {fotmatedAmount} from '../../../../utils/fotmats';

type routeProp = RouteProp<stackParamListMain, 'VoucherDetailScreen'>;
type stackProp = StackNavigationProp<stackParamListMain, 'VoucherDetailScreen'>;

const VoucherDetailScreen = ({route}: {route: routeProp}) => {
  const {voucher_id} = route.params;
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [voucher, setvoucher] = useState<voucherDetail>();
  const [isLoadingSave, setisLoadingSave] = useState<boolean>(false);

  const navigation = useNavigation<stackProp>();

  const user_id = useAppSelector(state => state.auth.user.userId);

  const getVoucherDetail = async () => {
    setisLoading(true);
    const data = await getVoucherDetailAPI(voucher_id, user_id);
    setisLoading(false);
    if (data?.metadata) {
      setvoucher(data.metadata);
    }
  };

  useEffect(() => {
    getVoucherDetail();
  }, []);

  const handleSaveVoucher = async (voucher_id: string, is_saved: boolean) => {
    if (is_saved) {
      navigation.navigate('CartScreen', {});
    } else {
      setisLoadingSave(true);
      const body: saveVoucherUserBody = {
        user_id,
        voucher_id,
      };
      setisLoadingSave(false);
      const data = await saveVoucherUserAPI(body);
      if (data?.status === 201) {
        getVoucherDetail();
      }
    }
  };

  return (
    <ContainerComponent
      isHeader
      back
      title="Voucher Detail"
      styleHeader={globalStyles.headerElevation}>
      <ContainerComponent
        isScroll
        onRefresh={getVoucherDetail}
        refreshing={isLoading}
        style={styles.containerContent}>
        <SpaceComponent height={10} />
        <RowComponent>
          {voucher?.image_voucher.url && (
            <RowComponent justify="flex-start">
              <Image
                source={{uri: voucher?.image_voucher.url}}
                style={styles.img}
              />
              <SpaceComponent width={10} />
            </RowComponent>
          )}
          <SectionComponent>
            <TextComponent
              text={`${voucher?.voucher_name}`}
              font={fontFamilies.semiBold}
            />
            <SpaceComponent height={5} />
            <TextComponent
              text={`- Code: ${voucher?.voucher_code}`}
              font={fontFamilies.medium}
              size={14}
            />
            <SpaceComponent height={5} />
            <TextComponent
              text={`- Quantity: ${voucher?.quantity}`}
              font={fontFamilies.medium}
              size={14}
            />
            <SpaceComponent height={5} />
            {voucher?.time_end && (
              <CountDownTime time_end={voucher?.time_end} />
            )}
          </SectionComponent>
        </RowComponent>
        <SpaceComponent height={7} />
        <TextComponent
          text={`- Get up to ${
            voucher?.voucher_type === 'deduct_money'
              ? fotmatedAmount(voucher.voucher_value)
              : `${voucher?.voucher_value}%`
          } off on orders of at least ${fotmatedAmount(
            voucher?.min_order_value ?? 0,
          )}.`}
          size={15}
          numberOfLines={3}
          font={fontFamilies.medium}
        />
        <SpaceComponent height={7} />
        <TextComponent
          text={`- Description: ${voucher?.voucher_description}`}
          size={15}
          lineHeight={22}
          style={{opacity: 0.85}}
        />
      </ContainerComponent>
      <SectionComponent style={styles.containerBtn}>
        {voucher && (
          <ButtonComponent
            isLoading={isLoadingSave}
            disable={voucher?.is_used}
            onPress={() => {
              handleSaveVoucher(voucher?._id, voucher?.is_saved);
            }}
            text={
              voucher?.is_saved && !voucher.is_used
                ? 'Use'
                : voucher?.is_saved && voucher.is_used
                ? 'Used'
                : 'Save'
            }
            colorText={
              voucher?.is_saved && !voucher.is_used
                ? colors.Primary_Color
                : colors.White_Color
            }
            colorButton={
              voucher?.is_saved && !voucher.is_used
                ? colors.White_Color
                : voucher?.is_saved && voucher.is_used
                ? colors.Gray_Color
                : colors.Primary_Color
            }
            style={{
              borderColor: voucher?.is_used
                ? colors.Gray_Color
                : colors.Primary_Color,
              borderWidth: 1.5,
              opacity: voucher?.is_used ? 0.5 : 1,
            }}
          />
        )}
        <SpaceComponent height={20} />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default VoucherDetailScreen;

const styles = StyleSheet.create({
  containerContent: {
    paddingHorizontal: 0,
  },
  containerBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  img: {
    width: handleSize(130),
    height: handleSize(130),
    borderRadius: handleSize(20),
  },
});
