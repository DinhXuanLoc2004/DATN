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
import {voucher_user} from '../../../../helper/types/voucher_user.type';
import {useAppSelector} from '../../../../helper/store/store';
import {getAllVoucherUserAPI} from '../../../../helper/apis/voucher_user.api';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import {colors} from '../../../../constants/colors';
import RowComponent from '../../../../components/layouts/RowComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import TextComponent from '../../../../components/texts/TextComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';
import CountDownTime from '../../../../components/layouts/times/CountDownTime';
import {handleSize} from '../../../../utils/handleSize';
import SearchComponent from '../../../../components/layouts/SearchComponent';

type stackProp = StackNavigationProp<stackParamListMain, 'VouchersUserScreen'>;

const VouchersUserNotUsed = () => {
  const [voucher_user_not_used, setvoucher_user_not_used] = useState<
    voucher_user[]
  >([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [search, setsearch] = useState<string>('');
  const [vouchersFilter, setvouchersFilter] = useState<voucher_user[]>([]);

  const navigation = useNavigation<stackProp>();

  const user_id = useAppSelector(state => state.auth.user.userId);

  const getAllVoucherUser = async () => {
    setisLoading(true);
    const data = await getAllVoucherUserAPI({user_id, is_used: 'false'});
    setisLoading(false);
    if (data?.metadata) {
      setvoucher_user_not_used(data.metadata);
    }
  };

  const filterVoucher = (value: String) => {
    if (value) {
      const filtered = voucher_user_not_used.filter(voucher => {
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
    getAllVoucherUser();
  }, []);

  useEffect(() => {
    setisLoading(true);
    const timeOut = setTimeout(() => {
      setisLoading(false);
      filterVoucher(search);
    }, 200);
    return () => clearTimeout(timeOut);
  }, [search, voucher_user_not_used]);

  return (
    <ContainerComponent>
      <SectionComponent>
        <SpaceComponent height={10} />
        <SearchComponent
          value={search}
          onChange={setsearch}
          placeholder="Search voucher..."
          onClear
          style={{flex: 0, borderColor: colors.Gray_Color}}
          colorIconSearch={colors.Gray_Color}
        />
        <SpaceComponent height={10} />
        {isLoading ? (
          <ActivityIndicator color={colors.Primary_Color} />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={getAllVoucherUser}
                refreshing={isLoading}
                colors={[colors.Primary_Color]}
              />
            }
            data={
              vouchersFilter.length > 0 || search
                ? vouchersFilter
                : voucher_user_not_used
            }
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <RowComponent
                style={styles.item}
                justify="space-between"
                onPress={() =>
                  navigation.navigate('VoucherDetailScreen', {
                    voucher_id: item.voucher_id,
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
                    style={[styles.btn]}
                    onPress={() => navigation.navigate('CartScreen', {})}>
                    <TextComponent
                      text={'Use'}
                      size={14}
                      font={fontFamilies.semiBold}
                      color={colors.Primary_Color}
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

export default VouchersUserNotUsed;

const styles = StyleSheet.create({
  btn: {
    width: handleSize(93),
    height: handleSize(36),
    backgroundColor: colors.White_Color,
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
