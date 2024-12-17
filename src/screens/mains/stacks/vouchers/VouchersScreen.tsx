import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import SearchComponent from '../../../../components/layouts/SearchComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import ItemVoucherComponent from '../../../../components/layouts/items/ItemVoucherComponent';
import {colors} from '../../../../constants/colors';
import {getAllVoucherAPI} from '../../../../helper/apis/voucher.api';
import {saveVoucherUserAPI} from '../../../../helper/apis/voucher_user.api';
import {useAppSelector} from '../../../../helper/store/store';
import {voucher} from '../../../../helper/types/voucher.type';
import {saveVoucherUserBody} from '../../../../helper/types/voucher_user.type';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {globalStyles} from '../../../../styles/globalStyle';
import {handleSize} from '../../../../utils/handleSize';

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
      setvouchers(data.metadata);
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
              <ItemVoucherComponent
                item={item}
                handleSaveVoucher={handleSaveVoucher}
              />
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
