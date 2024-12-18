import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorComponent,
  Alert,
  FlatList,
  Image,
  Modal,
  NativeEventEmitter,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import CustomBottomSheet from '../../../../components/layouts/bottom_sheets/CustomBottomSheet';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import LinearGradientComponet from '../../../../components/layouts/LinearGradientComponet';
import RowComponent from '../../../../components/layouts/RowComponent';
import SearchComponent from '../../../../components/layouts/SearchComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import CountDownTime from '../../../../components/layouts/times/CountDownTime';
import SalePriceComponent from '../../../../components/texts/SalePriceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {
  payment_methods,
  payment_name,
} from '../../../../constants/payment_methods';
import {
  getAllCartQueryKey,
  getAllFavoritesQueryKey,
  getAllProductsHomeSreen,
  getCategoryIdsToFavoritesQueryKey,
  getDetailProductQueryKey,
  getLengthCartQuerykey,
  getProductsQueryKey,
  getProductsSaleQuerykey,
  getProductsToCategoryScreen,
  searchProductsQueryKey,
} from '../../../../constants/queryKeys';
import {getCartChecksAPI} from '../../../../helper/apis/cart.api';
import {
  continueOrderAPI,
  findZpTransTokenAPI,
  getProductsContinueOrderAPI,
  orderAPI,
} from '../../../../helper/apis/order.api';
import {
  getDeliveryFeeAPI,
  getShippingAddressDefaultAPI,
} from '../../../../helper/apis/shippingaddress.api';
import {getAllVoucherUserAPI} from '../../../../helper/apis/voucher_user.api';
import {set_address_choose} from '../../../../helper/store/slices/sort.slice';
import {useAppDispatch, useAppSelector} from '../../../../helper/store/store';
import {cartCheck} from '../../../../helper/types/cart.type';
import {
  bodyContinueOrder,
  createOrderRequet,
  product_order,
  products_orderResquet,
} from '../../../../helper/types/order.type';
import {voucher_user} from '../../../../helper/types/voucher_user.type';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {globalStyles} from '../../../../styles/globalStyle';
import {formatOrder, fotmatedAmount} from '../../../../utils/fotmats';
import {handleDate} from '../../../../utils/handleDate';
import {handleSize} from '../../../../utils/handleSize';
import DialogErrorIOS from '../../../../components/dialogs/DialogErrorIOS';
import ItemProductCheckout from '../../../../components/layouts/items/ItemProductCheckout';

type stackProp = StackNavigationProp<stackParamListMain, 'CheckoutScreen'>;
type routeProp = RouteProp<stackParamListMain, 'CheckoutScreen'>;

const payZaloBridgeEmitter = new NativeEventEmitter(
  NativeModules.PayZaloBridge,
);

const CheckoutScreen = ({route}: {route: routeProp}) => {
  const {cart_ids, is_continue_checkout, order_id, is_re_order} = route.params;
  const [product_variant_carts, setproduct_variant_carts] = useState<
    cartCheck[] | product_order[]
  >();
  const [total_quantity, settotal_quantity] = useState<number>(0);
  const [total_amount, settotal_amount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [search_voucher_code, setsearch_voucher_code] = useState<string>('');
  const [your_vouchers, setyour_vouchers] = useState<voucher_user[]>([]);
  const [name_voucher, setname_voucher] = useState<string>('');
  const [voucher_id, setvoucher_id] = useState<string>('');
  const [voucher_type, setvoucher_type] = useState<string>('');
  const [voucher_value, setvoucher_value] = useState<number>(0);
  const [voucher_thumb, setvoucher_thumb] = useState<string>('');
  const [voucher_time_end, setvoucher_time_end] = useState<string>('');
  const [voucher_code, setvoucher_code] = useState<string>('');
  const [voucher_user_id, setvoucher_user_id] = useState<string>('');
  const [voucher_is_used, setvoucher_is_used] = useState<boolean>(false);
  const [voucher_is_active, setvoucher_is_active] = useState<boolean>(true);
  const [voucher_quantity, setvoucher_quantity] = useState<string | number>('');
  const [mes_err_voucher, setmes_err_voucher] = useState<string>('');
  const [payment_name_choose, setpayment_name_choose] =
    useState<payment_name>('COD');
  const [total_amount_final, settotal_amount_final] = useState<number>(0);
  const [isLoadingOrder, setisLoadingOrder] = useState<boolean>(false);
  const navigaiton = useNavigation<stackProp>();
  const address_choose = useAppSelector(state => state.sort.address_choose);
  const [delivery_fee, setdelivery_fee] = useState<number>(0);
  const [leadtime, setleadtime] = useState<number>(0);
  const [is_visible_dialog_err, setis_visible_dialog_err] =
    useState<boolean>(false);
  const [is_loading_products, setis_loading_products] = useState(false);
  const [is_err_order, setis_err_order] = useState(false);

  useEffect(() => {
    if (voucher_id) {
      if (!voucher_is_active) {
        setmes_err_voucher('Voucher is not valid!');
      } else if (handleDate.handleTimeEndVoucher(voucher_time_end)) {
        setmes_err_voucher('Voucher expires!');
      } else if (voucher_is_used) {
        setmes_err_voucher('Used vouchers!');
      } else if (
        (typeof voucher_quantity === 'string' &&
          voucher_quantity !== 'Infinity') ||
        (typeof voucher_quantity === 'number' && voucher_quantity <= 0)
      ) {
        setmes_err_voucher('The number of vouchers has expired!');
      } else {
        setmes_err_voucher('');
      }
    }
  }, [voucher_time_end, voucher_is_used, voucher_is_active, voucher_quantity]);

  useEffect(() => {
    if (is_continue_checkout) {
      getProductsContinueOrder();
    } else {
      getCartChecks();
    }
    getAddressChoose();
  }, []);

  const getProductsContinueOrder = async () => {
    setis_loading_products(true);
    const data = await getProductsContinueOrderAPI(order_id ?? '');
    if (data?.metadata) {
      setproduct_variant_carts(data.metadata.products_order);
      const result = data.metadata.products_order.reduce(
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
      dispatch(
        set_address_choose({
          full_name: data.metadata.full_name,
          phone: Number(data.metadata.phone),
          province_id: data.metadata.province_id,
          province_name: data.metadata.province_name,
          district_id: data.metadata.district_id,
          district_name: data.metadata.district_name,
          ward_code: data.metadata.ward_code,
          ward_name: data.metadata.ward_name,
          specific_address: data.metadata.specific_address,
        }),
      );
      setpayment_name_choose(data.metadata.payment_method);
      if (
        data.metadata.voucher_detail &&
        data.metadata.voucher_user_id &&
        !is_re_order
      ) {
        setvoucher_id(data.metadata.voucher_detail.voucher_id);
        setvoucher_code(data.metadata.voucher_detail.voucher_code);
        setvoucher_thumb(data.metadata.voucher_detail.voucher_thumb);
        setvoucher_value(data.metadata.voucher_detail.voucher_value);
        setvoucher_type(data.metadata.voucher_detail.voucher_type);
        setvoucher_time_end(data.metadata.voucher_detail.time_end);
        setname_voucher(data.metadata.voucher_detail.voucher_name);
        setvoucher_user_id(data.metadata.voucher_user_id);
        setvoucher_quantity(data.metadata.voucher_detail.quantity);
      }
    }
    setis_loading_products(false);
  };

  const getCartChecks = async () => {
    const str_cart_ids = JSON.stringify(cart_ids);
    setis_loading_products(true);
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
    setis_loading_products(false);
  };

  const user_id = useAppSelector(state => state.auth.user.userId);

  const getVouchersUserNotUsed = async () => {
    const data = await getAllVoucherUserAPI({
      user_id,
      is_used: is_continue_checkout && voucher_id ? 'all' : 'false',
      min_order_value: (total_amount + delivery_fee).toString(),
    });
    if (data?.metadata) {
      setyour_vouchers(data.metadata);
    }
  };

  const getAddressChoose = async () => {
    const data = await getShippingAddressDefaultAPI(user_id);
    if (data?.metadata) {
      dispatch(
        set_address_choose({
          full_name: data.metadata.full_name,
          phone: data.metadata.phone,
          province_id: data.metadata.province_id,
          province_name: data.metadata.province_name,
          district_id: data.metadata.district_id,
          district_name: data.metadata.district_name,
          ward_code: data.metadata.ward_code,
          ward_name: data.metadata.ward_name,
          specific_address: data.metadata.specific_address,
        }),
      );
    }
  };

  useEffect(() => {
    if (total_amount > 0) {
      getVouchersUserNotUsed();
    }
  }, [total_amount, voucher_id, delivery_fee]);
  
  getVouchersUserNotUsed();
  
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
    voucher_user_id_choose: string,
    voucher_is_used: boolean,
    voucher_is_active: boolean,
    voucher_quantity: number | string,
  ) => {
    if (voucher_id === voucher_id_choose) {
      setvoucher_id('');
      setvoucher_code('');
      setname_voucher('');
      setvoucher_type('');
      setvoucher_value(0);
      setvoucher_thumb('');
      setvoucher_time_end('');
      setvoucher_user_id('');
      setvoucher_is_used(false);
      setvoucher_is_active(true);
      setvoucher_quantity('');
    } else {
      setvoucher_id(voucher_id_choose);
      setvoucher_code(voucher_code_choose);
      setname_voucher(name_voucher_choose);
      setvoucher_type(voucher_type_choose);
      setvoucher_value(voucher_value_choose);
      setvoucher_thumb(voucher_thumb_choose);
      setvoucher_time_end(voucher_time_end_choose);
      setvoucher_user_id(voucher_user_id_choose);
      setvoucher_is_used(voucher_is_used);
      setvoucher_is_active(voucher_is_active);
      setvoucher_quantity(voucher_quantity);
    }
    bottomsheet.current?.close();
  };

  useEffect(() => {
    if (total_amount) {
      const deliveryFee = delivery_fee;
      const total =
        voucher_type === 'deduct_money'
          ? total_amount + deliveryFee - voucher_value
          : voucher_type === 'percent'
          ? total_amount - (total_amount * voucher_value) / 100 + deliveryFee
          : total_amount + deliveryFee;
      settotal_amount_final(total);
    }
  }, [total_amount, delivery_fee, voucher_value, voucher_type]);

  const queryClient = useQueryClient();

  useEffect(() => {
    const subscription = payZaloBridgeEmitter.addListener(
      'EventPayZalo',
      data => {
        if (data.returnCode == 1) {
          navigaiton.navigate('OrderSuccessScreen');
        } else {
          navigatePaymentFail(data.zpTranstoken);
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const navigatePaymentFail = async (zp_trans_token: string) => {
    const data = await findZpTransTokenAPI(zp_trans_token);
    navigaiton.navigate('PaymentFailScreen', {order_id: data?.metadata ?? ''});
  };

  const handleCheckout = async () => {
    if (mes_err_voucher) {
      setis_visible_dialog_err(true);
    } else {
      if (product_variant_carts) {
        if (is_continue_checkout && order_id && !is_re_order) {
          const body: bodyContinueOrder = {
            full_name: address_choose.full_name,
            phone: address_choose.phone.toString(),
            province_id: address_choose.province_id,
            province_name: address_choose.province_name,
            district_id: address_choose.district_id,
            district_name: address_choose.district_name,
            ward_code: address_choose.ward_code,
            ward_name: address_choose.ward_name,
            specific_address: address_choose.specific_address,
            voucher_user_id: voucher_user_id,
            type_voucher: voucher_type,
            value_voucher: voucher_value,
            delivery_fee: delivery_fee,
            leadtime: handleDate.convertTimestampToDate(leadtime).toJSON(),
            payment_method: payment_name_choose,
            total_amount: total_amount_final,
          };
          setisLoadingOrder(true);
          const data = await continueOrderAPI(order_id, body);
          setisLoadingOrder(false);
          if (
            data &&
            data.status === 200 &&
            data.metadata.payment_method === 'Zalo Pay' &&
            data.metadata.zp_trans_token
          ) {
            const payZP = NativeModules.PayZaloBridge;
            payZP.payOrder(data.metadata.zp_trans_token);
          } else if (
            data &&
            data.status === 200 &&
            data.metadata.payment_method === 'PayPal' &&
            data.metadata.approve
          ) {
            navigaiton.navigate('PaypalWebview', {
              approve: data.metadata.approve,
            });
          } else if (
            data &&
            data.status === 200 &&
            data.metadata.payment_method === 'COD'
          ) {
            navigaiton.navigate('OrderSuccessScreen');
          } else if (data && data.status === 203) {
            setis_err_order(true);
          }
        } else {
          const products_order: products_orderResquet[] =
            product_variant_carts.map(product_variant => {
              const product_order: products_orderResquet = {
                product_variant_id: product_variant.product_variant_id,
                quantity: product_variant.quantity,
                price: product_variant.price,
                discount: product_variant.total_discount,
                name_product: product_variant.name_product,
              };
              return product_order;
            });
          const body: createOrderRequet = {
            user_id,
            full_name: address_choose.full_name,
            phone: address_choose.phone.toString(),
            province_id: address_choose.province_id,
            province_name: address_choose.province_name,
            district_id: address_choose.district_id,
            district_name: address_choose.district_name,
            ward_code: address_choose.ward_code,
            ward_name: address_choose.ward_name,
            specific_address: address_choose.specific_address,
            voucher_user_id: voucher_user_id,
            type_voucher: voucher_type,
            value_voucher: voucher_value,
            delivery_fee: delivery_fee,
            leadtime: handleDate.convertTimestampToDate(leadtime).toJSON(),
            payment_method: payment_name_choose,
            total_amount: total_amount_final,
            products_order,
            cart_ids,
          };
          setisLoadingOrder(true);
          const data = await orderAPI(body);
          setisLoadingOrder(false);
          queryClient.invalidateQueries({queryKey: [getAllCartQueryKey]});
          if (
            data &&
            data.status === 201 &&
            data.metadata.payment_method === 'Zalo Pay' &&
            data.metadata.zp_trans_token
          ) {
            const payZP = NativeModules.PayZaloBridge;
            payZP.payOrder(data.metadata.zp_trans_token);
          } else if (
            data &&
            data.status === 201 &&
            data.metadata.payment_method === 'PayPal' &&
            data.metadata.approve
          ) {
            navigaiton.navigate('PaypalWebview', {
              approve: data.metadata.approve,
            });
          } else if (
            data &&
            data.status === 201 &&
            data.metadata.payment_method === 'COD'
          ) {
            navigaiton.navigate('OrderSuccessScreen');
          } else if (data && data.status === 203) {
            setis_err_order(true);
          }
        }
      }
    }
  };

  const handleClickErrOrder = () => {
    queryClient.invalidateQueries({queryKey: [getAllProductsHomeSreen]});
    queryClient.invalidateQueries({queryKey: [getProductsToCategoryScreen]});
    queryClient.invalidateQueries({queryKey: [getDetailProductQueryKey]});
    queryClient.invalidateQueries({queryKey: [getAllFavoritesQueryKey]});
    queryClient.invalidateQueries({
      queryKey: [getCategoryIdsToFavoritesQueryKey],
    });
    queryClient.invalidateQueries({queryKey: [searchProductsQueryKey]});
    queryClient.invalidateQueries({queryKey: [getLengthCartQuerykey]});
    queryClient.invalidateQueries({queryKey: [getProductsSaleQuerykey]});
    queryClient.invalidateQueries({queryKey: [getProductsQueryKey]});
    queryClient.invalidateQueries({queryKey: [getAllCartQueryKey]});
    navigaiton.navigate('BottomTab');
    setis_err_order(false);
  };

  const [is_loading_delivery, setis_loading_delivery] = useState(false);

  const getDeliveryFee = async () => {
    setis_loading_delivery(true);
    const data = await getDeliveryFeeAPI({
      to_district_id: address_choose.district_id,
      to_ward_code: address_choose.ward_code,
    });
    if (data?.metadata) {
      setdelivery_fee(data.metadata.delivery_fee);
      setleadtime(data.metadata.leadtime);
    }
    setis_loading_delivery(false);
  };

  useEffect(() => {
    if (address_choose.district_id > 0 && address_choose.ward_code) {
      getDeliveryFee();
    }
  }, [address_choose]);

  if (is_loading_products)
    return (
      <SectionComponent
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.Primary_Color} size={handleSize(25)} />
      </SectionComponent>
    );

  return (
    <ContainerComponent
      isHeader
      back
      title="Checkout"
      styleHeader={globalStyles.headerElevation}
      style={{paddingHorizontal: 0}}>
      <ContainerComponent isScroll style={styles.container}>
        <SpaceComponent height={5} />

        <SectionComponent
          style={styles.section}
          onPress={() =>
            navigaiton.navigate('SelectShippingAddressScreen', {
              is_select: true,
            })
          }>
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
                    text={address_choose.full_name}
                    size={14}
                    font={fontFamilies.semiBold}
                  />
                  <SpaceComponent width={5} />
                  <TextComponent
                    text={address_choose.phone.toString()}
                    size={12}
                    font={fontFamilies.medium}
                    color={colors.Gray_Color}
                  />
                </RowComponent>
                <SpaceComponent height={7} />
                <TextComponent
                  text={address_choose.specific_address}
                  size={12}
                  style={styles.txtAddress}
                  font={fontFamilies.medium}
                />
                <SpaceComponent height={5} />
                <TextComponent
                  text={`${address_choose.ward_name}, ${address_choose.district_name}, ${address_choose.province_name}`}
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
                <ItemProductCheckout
                  item={item}
                  navigation={navigaiton}
                  key={item.product_variant_id}
                />
              ))}
          </SectionComponent>
          <SpaceComponent height={10} />
          <RowComponent>
            <TextComponent
              text={`Total amount (${total_quantity} products)`}
              size={15}
              font={fontFamilies.medium}
            />
            <SalePriceComponent
              price={total_amount}
              discount={0}
              flex={0}
              flex_left={0}
            />
          </RowComponent>
        </SectionComponent>

        <SectionComponent
          style={[styles.section, {opacity: mes_err_voucher ? 0.5 : 1}]}
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
                  color={
                    voucher_code ? colors.Primary_Color : colors.Gray_Color
                  }
                  size={12}
                  font={fontFamilies.medium}
                />
              </View>
              <SpaceComponent width={7} />
              <FontAwesome5 name="chevron-right" />
            </RowComponent>
          </RowComponent>
          <SectionComponent>
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
                      voucher_type === 'deduct_money' ? 'reduced by ' : 'are '
                    }${
                      voucher_type === 'deduct_money'
                        ? `${fotmatedAmount(voucher_value)} `
                        : `${voucher_value}% off`
                    }`}
                    size={11}
                    numberOfLines={3}
                    lineHeight={15}
                  />
                )}
              </SectionComponent>
            </RowComponent>
            {mes_err_voucher && (
              <SectionComponent>
                <RowComponent justify="center">
                  <TextComponent text={mes_err_voucher} size={12} />
                </RowComponent>
              </SectionComponent>
            )}
          </SectionComponent>
        </SectionComponent>

        <SectionComponent style={styles.section}>
          <TextComponent text="Delivery" size={15} font={fontFamilies.medium} />
          <SpaceComponent height={10} />
          {is_loading_delivery ? (
            <ActivityIndicator
              color={colors.Primary_Color}
              size={handleSize(16)}
            />
          ) : (
            <SectionComponent>
              {delivery_fee > 0 && (
                <RowComponent>
                  <TextComponent
                    text={'Delivery fee'}
                    size={13}
                    font={fontFamilies.regular}
                  />
                  <TextComponent
                    text={fotmatedAmount(delivery_fee)}
                    size={12}
                    font={fontFamilies.medium}
                  />
                </RowComponent>
              )}
              <SpaceComponent height={10} />
              {leadtime > 0 && (
                <RowComponent>
                  <TextComponent
                    text={'Estimated delivery time'}
                    size={13}
                    font={fontFamilies.regular}
                  />
                  <TextComponent
                    text={handleDate
                      .convertTimestampToDate(leadtime)
                      .toDateString()}
                    size={13}
                    font={fontFamilies.medium}
                    color={colors.Success_Color}
                    style={{fontStyle: 'italic'}}
                  />
                </RowComponent>
              )}
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
          </RowComponent>
          <SpaceComponent height={10} />
          {payment_methods &&
            payment_methods.map(item => (
              <SectionComponent
                key={item.payment_name}
                onPress={() => setpayment_name_choose(item.payment_name)}
                style={styles.containerPayment}>
                <RowComponent>
                  <RowComponent>
                    <Image
                      source={{uri: item.thum_payment}}
                      style={styles.imgPayment}
                    />
                    <SpaceComponent width={10} />
                    <TextComponent
                      text={item.payment_name}
                      size={14}
                      font={fontFamilies.semiBold}
                      color={item.color_payment}
                    />
                  </RowComponent>
                  {item.payment_name === payment_name_choose && (
                    <FontAwesome5
                      name="check-circle"
                      color={colors.Primary_Color}
                      size={handleSize(16)}
                    />
                  )}
                </RowComponent>
                <SpaceComponent style={styles.line} />
              </SectionComponent>
            ))}
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
              text={fotmatedAmount(total_amount)}
              size={12}
              font={fontFamilies.medium}
            />
          </RowComponent>
          <SpaceComponent height={10} />
          <RowComponent>
            <TextComponent text="Total shipping cost" size={12} />
            <TextComponent
              text={fotmatedAmount(delivery_fee)}
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
                  ? voucher_value
                  : total_amount * (voucher_value / 100),
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
              text={fotmatedAmount(total_amount_final)}
              size={12}
              font={fontFamilies.medium}
            />
          </RowComponent>
          <SpaceComponent style={styles.line} />
        </SectionComponent>
      </ContainerComponent>

      <SectionComponent flex={0}>
        <LinearGradientComponet
          ArrColor={[colors.Transperen_Color, colors.Black_Color_RGBA]}
          style={{width: '100%', height: 9, opacity: 0.3}}
        />
        <SpaceComponent height={10} />
        <SectionComponent flex={0} style={styles.containerBtnOder}>
          <RowComponent>
            <RowComponent justify="flex-start">
              <TextComponent
                text="Total amout: "
                size={14}
                font={fontFamilies.semiBold}
              />
              <TextComponent
                text={formatOrder(total_amount_final)}
                size={14}
                font={fontFamilies.medium}
              />
            </RowComponent>
            <ButtonComponent
              disable={is_loading_delivery || is_loading_products}
              text="Order"
              onPress={() => {
                handleCheckout();
              }}
              style={{
                width: '50%',
                backgroundColor:
                  is_loading_delivery || is_loading_products
                    ? colors.Gray_Color
                    : colors.Primary_Color,
                borderColor:
                  is_loading_delivery || is_loading_products
                    ? colors.Gray_Color
                    : colors.Primary_Color,
              }}
            />
          </RowComponent>
        </SectionComponent>
        <SpaceComponent height={10} />
      </SectionComponent>

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
            <RowComponent>
              <TextComponent
                text="Your voucher"
                size={18}
                font={fontFamilies.semiBold}
              />
              <TouchableOpacity
                onPress={() => {
                  bottomsheet.current?.close();
                  navigaiton.navigate({
                    name: 'VouchersScreen',
                    key: Date.now.toString()
                  });
                }}>
                <TextComponent
                  text="Get more vouchers"
                  size={14}
                  style={{textDecorationLine: 'underline'}}
                />
              </TouchableOpacity>
            </RowComponent>
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
                      numberOfLines={1}
                    />
                    <SpaceComponent height={7} />
                    <TextComponent
                      text={item.voucher_code}
                      size={11}
                      font={fontFamilies.medium}
                    />
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
                          item._id,
                          item.is_used,
                          item.is_active,
                          item.quantity,
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
              ItemSeparatorComponent={() => <SpaceComponent height={10} />}
            />
          </SectionComponent>
        }
      />

      {/* Modal loading */}
      <Modal animationType="slide" transparent visible={isLoadingOrder}>
        <SectionComponent style={styles.modal}>
          <ActivityIndicator color={colors.Primary_Color} />
          <SpaceComponent height={10} />
          <TextComponent
            text="Ordering..."
            size={20}
            font={fontFamilies.semiBold}
            color={colors.White_Color}
          />
        </SectionComponent>
      </Modal>

      <DialogErrorIOS
        isVisible={is_visible_dialog_err}
        setIsvisble={setis_visible_dialog_err}
        title="Voucher is not valid"
        content="Voucher is invalid, please choose another voucher or cancel voucher!"
      />

      <DialogErrorIOS
        content="Please try again later"
        isVisible={is_err_order}
        setIsvisble={setis_err_order}
        onPress={handleClickErrOrder}
      />
    </ContainerComponent>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  containerBtnOder: {
    paddingHorizontal: handleSize(16),
  },
  btnCancelModalPaypal: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPayment: {
    backgroundColor: colors.White_Color,
    paddingHorizontal: handleSize(5),
  },
  imgPayment: {
    width: handleSize(30),
    height: handleSize(30),
    borderRadius: 4,
  },
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
    elevation: 3,
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
