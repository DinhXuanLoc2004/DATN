import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {globalStyles} from '../../../../styles/globalStyle';
import {handleSize} from '../../../../utils/handleSize';
import {colors} from '../../../../constants/colors';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TextComponent from '../../../../components/texts/TextComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {cartCheck} from '../../../../helper/types/cart.type';
import {getCartChecksAPI} from '../../../../helper/apis/cart.api';
import SalePriceComponent from '../../../../components/texts/SalePriceComponent';
import {useAppDispatch, useAppSelector} from '../../../../helper/store/store';
import {
  getAllDeliveryMethodAPI,
  getDetailDeliveryMethodAPI,
} from '../../../../helper/apis/delivery_method.api';
import {setDeliveryMethod} from '../../../../helper/store/slices/sort.slice';
import {delivery_method} from '../../../../helper/types/delivery_method.type';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../../../../components/layouts/bottom_sheets/CustomBottomSheet';
import SearchComponent from '../../../../components/layouts/SearchComponent';
import {voucher_user} from '../../../../helper/types/voucher_user.type';
import {getAllVoucherUserAPI} from '../../../../helper/apis/voucher_user.api';
import CountDownTime from '../../../../components/layouts/times/CountDownTime';
import {fotmatedAmount} from '../../../../utils/fotmats';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import {getShippingAddressDefaultAPI} from '../../../../helper/apis/shippingaddress.api';
import {useQuery} from '@tanstack/react-query';
import {getShippingAddressDefaultQuerykey} from '../../../../constants/queryKeys';

type stackProp = StackNavigationProp<stackParamListMain, 'CheckoutScreen'>;
type routeProp = RouteProp<stackParamListMain, 'CheckoutScreen'>;

const CheckoutScreen = ({route}: {route: routeProp}) => {
  const {cart_ids} = route.params;
  const [product_variant_carts, setproduct_variant_carts] =
    useState<cartCheck[]>();
  const [fullname, setfullname] = useState<string>('');
  const [phone, setphone] = useState<string>('');
  const [province_city, setprovince_city] = useState<string>('');
  const [district, setdistrict] = useState<string>('');
  const [ward_commune, setward_commune] = useState<string>('');
  const [specific_address, setspecific_address] = useState<string>('');
  const [total_quantity, settotal_quantity] = useState<number>(0);
  const [total_amount, settotal_amount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const delivery_id_defau = useAppSelector(
    state => state.sort.delivery_method_default.dilivery_id,
  );
  const [delivery_method, setdelivery_method] = useState<delivery_method>();
  const [search_voucher_code, setsearch_voucher_code] = useState<string>('');
  const [your_vouchers, setyour_vouchers] = useState<voucher_user[]>([]);
  const [name_voucher, setname_voucher] = useState<string>('');
  const [voucher_id, setvoucher_id] = useState<string>('');
  const [voucher_type, setvoucher_type] = useState<string>('');
  const [voucher_value, setvoucher_value] = useState<number>(0);
  const [voucher_thumb, setvoucher_thumb] = useState<string>('');
  const [voucher_time_end, setvoucher_time_end] = useState<string>('');
  const [voucher_code, setvoucher_code] = useState<string>('');

  const navigaiton = useNavigation<stackProp>();

  const getCartChecks = async () => {
    const str_cart_ids = JSON.stringify(cart_ids);
    const data = await getCartChecksAPI({cart_ids: str_cart_ids});
    if (data?.metadata) {
      setproduct_variant_carts(data.metadata);
      const result = data.metadata.reduce(
        (acc, item) => {
          const itemTotal =
            item.price * item.quantity * (1 - item.total_discount / 100);
          acc.totalAmount += itemTotal;
          acc.totalQuantity += item.quantity;
          acc.totalDiscount += item.total_discount;
          return acc;
        },
        {totalAmount: 0, totalQuantity: 0, totalDiscount: 0},
      );
      settotal_amount(result.totalAmount);
      settotal_quantity(result.totalQuantity);
    }
  };

  const getAllDeliveryMethod = async () => {
    const data = await getAllDeliveryMethodAPI();
    if (data?.metadata) {
      dispatch(setDeliveryMethod({delivery_id: data.metadata[0]._id}));
    }
  };

  const user_id = useAppSelector(state => state.auth.user.userId);

  const {data: shipping_address_default} = useQuery({
    queryKey: [getShippingAddressDefaultQuerykey, user_id],
    queryFn: getShippingAddressDefaultAPI,
  });

  const getVouchersUserNotUsed = async () => {
    const data = await getAllVoucherUserAPI({
      user_id,
      is_used: 'false',
      min_order_value: total_amount.toString(),
    });
    if (data?.metadata) {
      setyour_vouchers(data.metadata);
    }
  };

  useEffect(() => {
    getCartChecks();
    getAllDeliveryMethod();
  }, []);

  useEffect(() => {
    if (shipping_address_default?.metadata) {
      setfullname(shipping_address_default.metadata.full_name);
      setphone(shipping_address_default.metadata.phone);
      setprovince_city(shipping_address_default.metadata.province_city);
      setdistrict(shipping_address_default.metadata.district);
      setward_commune(shipping_address_default.metadata.ward_commune);
      setward_commune(shipping_address_default.metadata.ward_commune);
      setspecific_address(shipping_address_default.metadata.specific_address);
    }
  }, [shipping_address_default]);

  useEffect(() => {
    if (total_amount > 0) {
      getVouchersUserNotUsed();
    }
  }, [total_amount]);

  const getDetailDeliveryMethod = async (delivery_id: string) => {
    const data = await getDetailDeliveryMethodAPI({_id: delivery_id});
    if (data?.metadata) {
      setdelivery_method(data.metadata);
    }
  };

  useEffect(() => {
    if (delivery_id_defau) {
      getDetailDeliveryMethod(delivery_id_defau);
    }
  }, [delivery_id_defau]);

  const bottomsheet = useRef<BottomSheetModal>(null);

  const handleBottomSheet = () => {
    bottomsheet.current?.present();
  };

  const handleChooseVoucher = (
    voucher_id_choose: string,
    voucher_code_choose: string,
    name_voucher_choose: string,
    voucher_type_choose: string,
    voucher_value_choose: number,
    voucher_thumb_choose: string,
    voucher_time_end_choose: string,
  ) => {
    if (voucher_id === voucher_id_choose) {
      setvoucher_id('');
      setvoucher_code('');
      setname_voucher('');
      setvoucher_type('');
      setvoucher_value(0);
      setvoucher_thumb('');
      setvoucher_time_end('');
    } else {
      setvoucher_id(voucher_id_choose);
      setvoucher_code(voucher_code_choose);
      setname_voucher(name_voucher_choose);
      setvoucher_type(voucher_type_choose);
      setvoucher_value(voucher_value_choose);
      setvoucher_thumb(voucher_thumb_choose);
      setvoucher_time_end(voucher_time_end_choose);
    }
    bottomsheet.current?.close();
  };

  return (
    <ContainerComponent
      isHeader
      back
      title="Checkout"
      styleHeader={globalStyles.headerElevation}
      isScroll
      style={styles.container}>
      <SpaceComponent height={5} />

      <SectionComponent
        style={styles.section}
        onPress={() => navigaiton.navigate('SelectShippingAddressScreen')}>
        <RowComponent>
          <RowComponent style={styles.rowAddress} flex={0.8}>
            <FontAwesome5
              name="map-marker-alt"
              size={handleSize(15)}
              color={colors.Primary_Color}
            />
            <SpaceComponent width={7} />
            <SectionComponent flex={0}>
              <RowComponent justify="flex-start">
                <TextComponent
                  text={fullname}
                  size={14}
                  font={fontFamilies.semiBold}
                />
                <SpaceComponent width={5} />
                <TextComponent
                  text={phone}
                  size={12}
                  font={fontFamilies.medium}
                  color={colors.Gray_Color}
                />
              </RowComponent>
              <SpaceComponent height={7} />
              <TextComponent
                text={specific_address}
                size={12}
                style={styles.txtAddress}
                font={fontFamilies.medium}
              />
              <SpaceComponent height={5} />
              <TextComponent
                text={`${ward_commune}, ${district}, ${province_city}`}
                size={12}
                style={styles.txtAddress}
                font={fontFamilies.medium}
              />
            </SectionComponent>
          </RowComponent>
          <FontAwesome5 name="chevron-right" />
        </RowComponent>
      </SectionComponent>

      <SectionComponent style={styles.section}>
        <SectionComponent>
          {product_variant_carts &&
            product_variant_carts.map((item, index) => (
              <SectionComponent key={item.cart_id} style={styles.itemProduct}>
                <TextComponent
                  text={item.name_product}
                  size={14}
                  font={fontFamilies.semiBold}
                />
                <SpaceComponent height={5} />
                <RowComponent
                  onPress={() =>
                    navigaiton.navigate('DetailProductScreen', {
                      product_id: item.product_id,
                    })
                  }>
                  <Image source={{uri: item.thumb}} style={styles.imgProduct} />
                  <SpaceComponent width={5} />
                  <SectionComponent style={styles.containerContentProduct}>
                    <SectionComponent>
                      <TextComponent
                        text={`${item.name_brand} - ${item.name_category}`}
                        size={14}
                        font={fontFamilies.medium}
                      />
                      <SpaceComponent height={5} />
                      <RowComponent justify="flex-start">
                        <RowComponent
                          justify="flex-start"
                          style={{opacity: 0.75}}>
                          <TextComponent
                            text={`size: ${item.size} - color: ${item.name_color} `}
                            size={13}
                            font={fontFamilies.medium}
                          />
                          <View
                            style={[
                              styles.viewColor,
                              {backgroundColor: item.hex_color},
                            ]}
                          />
                        </RowComponent>
                      </RowComponent>
                    </SectionComponent>
                    <RowComponent>
                      <SalePriceComponent
                        price={item.price}
                        discount={item.total_discount}
                      />
                      <TextComponent
                        text={`x${item.quantity}`}
                        size={12}
                        font={fontFamilies.semiBold}
                        color={colors.Gray_Color}
                      />
                    </RowComponent>
                  </SectionComponent>
                </RowComponent>
                <SpaceComponent height={7} />
                <RowComponent>
                  <TextComponent text="Total amount of item: " size={13} />
                  <SalePriceComponent
                    price={item.quantity * item.price}
                    discount={item.total_discount}
                  />
                </RowComponent>
                <View style={styles.line} />
              </SectionComponent>
            ))}
        </SectionComponent>
        <SpaceComponent height={10} />
        <RowComponent>
          <TextComponent
            text={`Total amount (${total_quantity} products)`}
            size={15}
            font={fontFamilies.medium}
          />
          <SalePriceComponent price={total_amount} discount={0} />
        </RowComponent>
      </SectionComponent>

      <SectionComponent
        style={styles.section}
        onPress={() => handleBottomSheet()}>
        <RowComponent>
          <RowComponent justify="flex-start">
            <Image
              source={{
                uri: 'https://redymr.com/imgs/icon/promo-code.png',
              }}
              style={styles.iconVoucher}
            />
            <SpaceComponent width={5} />
            <TextComponent
              text="Voucher"
              size={14}
              font={fontFamilies.medium}
            />
          </RowComponent>
          <RowComponent justify="flex-end">
            <View
              style={[
                styles.containerNameVoucher,
                {
                  borderColor: voucher_code
                    ? colors.Primary_Color
                    : colors.Gray_Color,
                  backgroundColor: voucher_code
                    ? 'rgba(219, 48, 34, 0.13)'
                    : 'rgba(128, 128, 128, 0.13)',
                },
              ]}>
              <TextComponent
                text={voucher_code ? voucher_code : 'Not voucher'}
                color={voucher_code ? colors.Primary_Color : colors.Gray_Color}
                size={12}
                font={fontFamilies.medium}
              />
            </View>
            <SpaceComponent width={7} />
            <FontAwesome5 name="chevron-right" />
          </RowComponent>
        </RowComponent>
        <RowComponent>
          {voucher_thumb && (
            <Image
              source={{uri: voucher_thumb}}
              style={styles.imgVoucherChoose}
            />
          )}
          <SpaceComponent width={10} />
          <SectionComponent>
            {name_voucher && (
              <TextComponent
                text={name_voucher}
                size={13}
                font={fontFamilies.medium}
              />
            )}
            {voucher_type && voucher_value && (
              <TextComponent
                text={`Order is ${
                  voucher_type === 'deduct_money' ? 'reduced by ' : ''
                }${
                  voucher_type === 'deduct_money'
                    ? `${fotmatedAmount(voucher_value * 1000)} `
                    : '%'
                }`}
                size={11}
                numberOfLines={3}
                lineHeight={15}
              />
            )}
          </SectionComponent>
        </RowComponent>
      </SectionComponent>

      <SectionComponent
        style={styles.section}
        onPress={() => {
          navigaiton.navigate('DeliveryMethodScreen', {
            delivery_id: delivery_id_defau,
          });
        }}>
        <RowComponent>
          <TextComponent
            text="Delivery methods"
            size={15}
            font={fontFamilies.medium}
          />
          <RowComponent style={styles.txtAddress}>
            <TextComponent text="See all" size={12} />
            <SpaceComponent width={5} />
            <FontAwesome5 name="chevron-right" />
          </RowComponent>
        </RowComponent>
        <SpaceComponent height={10} />
        {delivery_method && (
          <SectionComponent style={styles.contentDelivery}>
            <RowComponent>
              <TextComponent
                text={delivery_method.name_delivery}
                size={13}
                font={fontFamilies.medium}
              />
              <TextComponent
                text={fotmatedAmount(delivery_method.delivery_fee ?? 0)}
                size={12}
                font={fontFamilies.medium}
              />
            </RowComponent>
          </SectionComponent>
        )}
      </SectionComponent>

      <SectionComponent style={styles.section}>
        <RowComponent>
          <TextComponent
            text="Payment methods"
            size={15}
            font={fontFamilies.medium}
          />
          <RowComponent style={styles.txtAddress}>
            <TextComponent text="See all" size={12} />
            <SpaceComponent width={5} />
            <FontAwesome5 name="chevron-right" />
          </RowComponent>
        </RowComponent>
        <SpaceComponent height={10} />
        <ButtonComponent colorButton="#d82d8b" text="momo" onPress={() => {}} />
      </SectionComponent>

      <SectionComponent style={styles.section}>
        <TextComponent
          text="Payment details"
          size={14}
          font={fontFamilies.medium}
        />
        <SpaceComponent height={15} />
        <RowComponent>
          <TextComponent text="Total cost of goods" size={12} />
          <TextComponent
            text={fotmatedAmount(total_amount * 1000)}
            size={12}
            font={fontFamilies.medium}
          />
        </RowComponent>
        <SpaceComponent height={10} />
        <RowComponent>
          <TextComponent text="Total shipping cost" size={12} />
          <TextComponent
            text={fotmatedAmount(delivery_method?.delivery_fee ?? 0)}
            size={12}
            font={fontFamilies.medium}
          />
        </RowComponent>
        <SpaceComponent height={10} />
        <RowComponent>
          <TextComponent text="Total voucher amount reduced" size={12} />
          <TextComponent
            text={`-${fotmatedAmount(
              voucher_type === 'deduct_money'
                ? voucher_value * 1000
                : total_amount * 1000 * (voucher_value / 100),
            )}`}
            size={12}
            font={fontFamilies.medium}
            color={colors.Primary_Color}
          />
        </RowComponent>
        <SpaceComponent height={15} />
        <RowComponent>
          <TextComponent
            text="Total amount"
            size={12}
            font={fontFamilies.semiBold}
          />
          <TextComponent
            text={fotmatedAmount(
              delivery_method?.delivery_fee
                ? total_amount * 1000 +
                    delivery_method.delivery_fee -
                    (voucher_type === 'deduct_money'
                      ? voucher_value * 1000
                      : total_amount * 1000 * (voucher_value / 100))
                : 0,
            )}
            size={12}
            font={fontFamilies.medium}
          />
        </RowComponent>
        <SpaceComponent style={styles.line} />
      </SectionComponent>

      <SpaceComponent height={10} />
      <ButtonComponent text="Order" onPress={() => {}} />
      <SpaceComponent height={20} />

      <CustomBottomSheet
        style={{backgroundColor: colors.Backgournd_Color}}
        bottomSheet={bottomsheet}
        snapPoint={['50%', '60%']}
        content={
          <SectionComponent style={styles.containerBottomSheet}>
            <SpaceComponent height={5} />
            <SearchComponent
              value={search_voucher_code}
              onChange={setsearch_voucher_code}
              onClear
              placeholder="Search your voucher"
              colorIconSearch={colors.Gray_Color}
              style={styles.search}
            />
            <SpaceComponent height={32} />
            <TextComponent
              text="Your voucher"
              size={18}
              font={fontFamilies.semiBold}
            />
            <SpaceComponent height={18} />
            <FlatList
              data={your_vouchers}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <RowComponent
                  style={styles.itemVoucher}
                  onPress={() => {
                    bottomsheet.current?.close();
                    navigaiton.navigate('VoucherDetailScreen', {
                      voucher_id: item.voucher_id,
                    });
                  }}>
                  <Image source={{uri: item.thumb}} style={styles.imgVoucher} />
                  <SpaceComponent width={14} />
                  <SectionComponent style={styles.contentVoucher}>
                    <TextComponent
                      text={item.voucher_name}
                      size={14}
                      font={fontFamilies.medium}
                    />
                    <SpaceComponent height={7} />
                    <TextComponent
                      text={item.voucher_code}
                      size={11}
                      font={fontFamilies.medium}
                    />
                    <TextComponent
                      text={`Get up to ${item.voucher_value}${
                        item.voucher_type === 'deduct_money' ? '$' : '%'
                      } off on orders of at least $${item.min_order_value}.`}
                      size={11}
                      numberOfLines={3}
                      lineHeight={15}
                    />
                  </SectionComponent>
                  <SectionComponent
                    style={{
                      alignItems: 'flex-end',
                      paddingRight: handleSize(10),
                    }}>
                    <CountDownTime time_end={item.time_end} is_not_end_later />
                    <SpaceComponent height={5} />
                    <TouchableOpacity
                      style={[
                        styles.btnApply,
                        {
                          backgroundColor:
                            voucher_id === item.voucher_id
                              ? colors.White_Color
                              : colors.Primary_Color,
                        },
                      ]}
                      onPress={() => {
                        handleChooseVoucher(
                          item.voucher_id,
                          item.voucher_code,
                          item.voucher_name,
                          item.voucher_type,
                          item.voucher_value,
                          item.thumb,
                          item.time_end,
                        );
                      }}>
                      <TextComponent
                        text={
                          voucher_id === item.voucher_id ? 'Cancel' : 'Apply'
                        }
                        color={
                          voucher_id === item.voucher_id
                            ? colors.Primary_Color
                            : colors.White_Color
                        }
                        size={14}
                        font={fontFamilies.medium}
                      />
                    </TouchableOpacity>
                  </SectionComponent>
                </RowComponent>
              )}
            />
          </SectionComponent>
        }
      />
    </ContainerComponent>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  imgVoucherChoose: {
    width: handleSize(50),
    height: handleSize(50),
    borderRadius: handleSize(8),
  },
  btnApply: {
    width: handleSize(93),
    height: handleSize(36),
    borderRadius: handleSize(25),
    borderColor: colors.Primary_Color,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  contentVoucher: {
    justifyContent: 'center',
  },
  imgVoucher: {
    width: handleSize(80),
    height: '100%',
    borderTopLeftRadius: handleSize(8),
    borderBottomLeftRadius: handleSize(8),
  },
  itemVoucher: {
    width: '100%',
    height: handleSize(80),
    borderRadius: handleSize(8),
    backgroundColor: colors.White_Color,
    elevation: 5,
  },
  search: {
    flex: 0,
    borderColor: colors.White_Color,
  },
  containerBottomSheet: {
    paddingHorizontal: handleSize(16),
  },
  containerNameVoucher: {
    paddingHorizontal: handleSize(30),
    paddingVertical: handleSize(3),
    borderRadius: 5,
    borderWidth: 1,
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconVoucher: {
    width: handleSize(20),
    height: handleSize(20),
  },
  contentDelivery: {
    paddingHorizontal: handleSize(8),
    paddingVertical: handleSize(10),
    borderRadius: handleSize(6),
    borderWidth: 1,
    borderColor: 'rgba(144, 238, 144, 1)',
    backgroundColor: 'rgba(144, 238, 144, 0.2)',
  },
  line: {
    width: '100%',
    height: handleSize(1),
    backgroundColor: colors.Gray_Color,
    marginVertical: handleSize(10),
    opacity: 0.5,
  },
  viewColor: {
    width: handleSize(14),
    height: handleSize(14),
    borderRadius: 100,
    elevation: 3,
  },
  containerContentProduct: {
    justifyContent: 'space-between',
    paddingVertical: handleSize(5),
  },
  itemProduct: {
    marginVertical: handleSize(3),
  },
  imgProduct: {
    width: handleSize(70),
    height: handleSize(70),
    borderRadius: handleSize(10),
  },
  txtAddress: {
    opacity: 0.7,
  },
  rowAddress: {
    alignItems: 'flex-start',
  },
  section: {
    paddingHorizontal: handleSize(8),
    borderRadius: handleSize(10),
    elevation: handleSize(4.5),
    backgroundColor: colors.White_Color,
    paddingVertical: handleSize(10),
    marginVertical: handleSize(5),
  },
  container: {
    paddingHorizontal: handleSize(8),
  },
});
