import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {colors} from '../../../../constants/colors';
import {voucher} from '../../../../helper/types/voucher.type';
import {useAppSelector} from '../../../../helper/store/store';
import {getAllVoucherAPI} from '../../../../helper/apis/voucher.api';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import {handleSize} from '../../../../utils/handleSize';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import LinearGradientComponet from '../../../../components/layouts/LinearGradientComponet';
import TextComponent from '../../../../components/texts/TextComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';
import CountDownTime from '../../../../components/layouts/times/CountDownTime';
import {color} from 'react-native-elements/dist/helpers';
import {saveVoucherUserBody} from '../../../../helper/types/voucher_user.type';
import {saveVoucherUserAPI} from '../../../../helper/apis/voucher_user.api';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '../../../../styles/globalStyle';
import SearchComponent from '../../../../components/layouts/SearchComponent';

type stackProp = StackNavigationProp<stackParamListMain, 'VouchersScreen'>;

const VouchersScreen = () => {
  const [vouchers, setvouchers] = useState<voucher[]>([]);
  const [isRefreshing, setisRefreshing] = useState<boolean>(false);
  const [search, setsearch] = useState<string>('');
  const [vouchersFilter, setvouchersFilter] = useState<voucher[]>([]);
  const [isLoadingvouchers, setisLoadingvouchers] = useState<boolean>(false);

  const user_id = useAppSelector(state => state.auth.user.userId);

  const navigation = useNavigation<stackProp>();

  const getVouchers = async () => {
    setisRefreshing(true);
    setisLoadingvouchers(true);
    const data = await getAllVoucherAPI(user_id);
    setisRefreshing(false);
    setisLoadingvouchers(false);
    if (data?.metadata) {
      setvouchers(data.metadata)
    }
  };

  useEffect(() => {
    getVouchers();
  }, []);

  const filterVoucher = (value: String) => {
    if (value) {
      const filtered = vouchers.filter(voucher => {
        const name = voucher.voucher_name
          ? voucher.voucher_name.toLowerCase()
          : '';

        const code = voucher.voucher_code
          ? voucher.voucher_code.toLowerCase()
          : '';

        return (
          name.includes(value.toLowerCase()) ||
          code.includes(value.toLowerCase())
        );
      });
      setvouchersFilter(filtered);
    } else {
      setvouchersFilter([]);
    }
  };

  useEffect(() => {
    setisLoadingvouchers(true);
    const timeOut = setTimeout(() => {
      setisLoadingvouchers(false);
      filterVoucher(search);
    }, 200);
    return () => clearTimeout(timeOut);
  }, [search, vouchers]);

  const handleSaveVoucher = async (voucher_id: string, is_saved: boolean) => {
    if (is_saved) {
      navigation.navigate('CartScreen', {});
    } else {
      const body: saveVoucherUserBody = {
        user_id,
        voucher_id,
      };
      const data = await saveVoucherUserAPI(body);
      if (data?.status === 201) {
        getVouchers();
      }
    }
  };

  return (
    <ContainerComponent
      isHeader
      back
      title="Vouchers"
      styleHeader={globalStyles.headerElevation}>
      <SpaceComponent height={15} />
      <SearchComponent
        value={search}
        onChange={setsearch}
        placeholder="Search voucher..."
        onClear
        style={{flex: 0, borderColor: colors.Gray_Color}}
        colorIconSearch={colors.Gray_Color}
      />
      <SectionComponent>
        <SpaceComponent height={15} />
        {isLoadingvouchers ? (
          <ActivityIndicator color={colors.Primary_Color} />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={getVouchers}
                refreshing={isRefreshing}
                colors={[colors.Primary_Color]}
              />
            }
            data={
              vouchersFilter.length > 0 || search ? vouchersFilter : vouchers
            }
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <RowComponent
                style={styles.item}
                justify="space-between"
                onPress={() =>
                  navigation.navigate('VoucherDetailScreen', {
                    voucher_id: item._id,
                  })
                }>
                <RowComponent justify="flex-start">
                  <Image source={{uri: item.thumb}} style={styles.img} />
                </RowComponent>
                <SpaceComponent width={10} />
                <SectionComponent flex={1.5}>
                  <TextComponent
                    text={`${item.voucher_name}`}
                    size={14}
                    font={fontFamilies.semiBold}
                  />
                  <SpaceComponent height={4} />
                  <TextComponent
                    text={`Code: ${item.voucher_code}`}
                    size={11}
                    font={fontFamilies.medium}
                  />
                  <SpaceComponent height={4} />
                  <TextComponent
                    text={`Get up to ${item.voucher_value}${
                      item.voucher_type === 'deduct_money' ? '$' : '%'
                    } off on orders of at least $${item.min_order_value}.`}
                    size={11}
                    numberOfLines={3}
                    lineHeight={15}
                  />
                </SectionComponent>
                <SectionComponent style={styles.containerRight} flex={1}>
                  <CountDownTime time_end={item.time_end} is_not_end_later />
                  <SpaceComponent height={5} />
                  <TouchableOpacity
                    disabled={item.is_used}
                    style={[
                      styles.btn,
                      {
                        backgroundColor:
                          item?.is_saved && item.is_used === false
                            ? colors.White_Color
                            : item?.is_saved && item.is_used
                            ? colors.Gray_Color
                            : colors.Primary_Color,
                        opacity: item.is_used ? 0.55 : 1,
                        borderColor: item?.is_used
                          ? colors.Gray_Color
                          : colors.Primary_Color,
                      },
                    ]}
                    onPress={() => handleSaveVoucher(item._id, item.is_saved)}>
                    <TextComponent
                      text={
                        item?.is_saved && item.is_used === false
                          ? 'Use'
                          : item?.is_saved && item.is_used
                          ? 'Used'
                          : 'Save'
                      }
                      size={14}
                      font={fontFamilies.semiBold}
                      color={
                        item.is_saved && item.is_used === false
                          ? colors.Primary_Color
                          : colors.White_Color
                      }
                    />
                  </TouchableOpacity>
                </SectionComponent>
              </RowComponent>
            )}
            ItemSeparatorComponent={() => <SpaceComponent height={24} />}
          />
        )}
      </SectionComponent>
    </ContainerComponent>
  );
};

export default VouchersScreen;

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
    alignItems: 'center',
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
