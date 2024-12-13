import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import DoubleButtonComponent from '../../../../components/buttons/DoubleButtonComponent';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import ItemProductOrderComponent from '../../../../components/layouts/items/ItemProductOrderComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import TextOrderInformation from '../../../../components/texts/TextOrderInformation';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {handleDate} from '../../../../utils/handleDate';
import {handleSize} from '../../../../utils/handleSize';
import {onLayout} from '../../../../utils/onLayout';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {order_detail} from '../../../../helper/types/order.type';
import {getOrderDetailAPI} from '../../../../helper/apis/order.api';
import StatusOrderBar from '../../../../components/bars/StatusOrderBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import DisplayPaymentMethod from '../../../../components/layouts/DisplayPaymentMethod';
import {globalStyles} from '../../../../styles/globalStyle';
import {fotmatedAmount} from '../../../../utils/fotmats';
import {ActivityIndicator} from 'react-native';
import ButtonOrderStatus from '../../../../components/buttons/ButtonOrderStatus';

type routeProp = RouteProp<stackParamListMain, 'OrderDetailScreen'>;
type stackProp = StackNavigationProp<stackParamListMain, 'OrderDetailScreen'>;

const OrderDetailScreen = ({route}: {route: routeProp}) => {
  const {order_id} = route.params;
  console.log(order_id);
  const [status, setstatus] = useState('Delivered');
  const [height_bottom, setheight_bottom] = useState<number>(0);
  const [order_detail, setorder_detail] = useState<order_detail>();
  const [is_loading, setis_loading] = useState(false);
  const setOrderDetail = async () => {
    setis_loading(true);
    const data = await getOrderDetailAPI(order_id);
    if (data?.metadata) setorder_detail(data.metadata);
    setis_loading(false);
  };
  useEffect(() => {
    setOrderDetail();
  }, []);

  const navigation = useNavigation<stackProp>();

  if (is_loading)
    return (
      <ContainerComponent
        isHeader
        back
        style={{justifyContent: 'center', alignItems: 'center'}}
        styleHeader={globalStyles.headerElevation}>
        <ActivityIndicator color={colors.Primary_Color} size={handleSize(30)} />
      </ContainerComponent>
    );

  return (
    <ContainerComponent
      isHeader
      customHeader={
        <RowComponent style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={handleSize(24)}
              color={colors.Text_Color}
            />
          </TouchableOpacity>
          <SpaceComponent width={10} />
          <SectionComponent>
            <TextComponent
              text={order_detail?.current_status ?? ''}
              size={18}
              font={fontFamilies.bold}
              color={
                order_detail?.current_status === 'Canceled'
                  ? colors.Primary_Color
                  : colors.Text_Color
              }
            />
            {order_detail?.current_status !== 'Canceled' &&
              order_detail?.leadtime && (
                <SectionComponent>
                  <SpaceComponent height={5} />
                  <RowComponent justify="flex-start">
                    <TextComponent
                      text="Estimated delivery date: "
                      size={12}
                      color={colors.Gray_Color}
                      font={fontFamilies.medium}
                    />
                    <TextComponent
                      text={handleDate.formatDate(
                        new Date(order_detail.leadtime),
                      )}
                      size={12}
                      font={fontFamilies.medium}
                      style={{fontStyle: 'italic'}}
                    />
                  </RowComponent>
                </SectionComponent>
              )}
          </SectionComponent>
        </RowComponent>
      }
      styleHeader={globalStyles.headerElevation}
      style={styles.container}>
      <ContainerComponent isScroll style={{paddingBottom: height_bottom}}>
        <SpaceComponent height={31} />
        {order_detail?.current_status && order_detail.payment_method && (
          <StatusOrderBar
            current_status={order_detail.current_status}
            payment_method={order_detail.payment_method}
            previous_status={
              order_detail.current_status === 'Delivering'
                ? order_detail.order_status[1].status
                : order_detail.current_status
            }
          />
        )}
        <SpaceComponent height={20} />
        <RowComponent>
          <TextComponent text="Order date" font={fontFamilies.semiBold} />
          <TextComponent
            text={
              order_detail?.current_status !== 'Canceled' &&
              order_detail?.order_date
                ? handleDate.formatDate(new Date(order_detail.order_date))
                : 'Canceled'
            }
            size={14}
            color={
              order_detail?.current_status !== 'Canceled'
                ? colors.Gray_Color
                : colors.Primary_Color
            }
          />
        </RowComponent>
        {order_detail?.current_status &&
          order_detail.current_status === 'Canceled' && (
            <SectionComponent>
              <SpaceComponent height={10} />
              <RowComponent>
                <TextComponent
                  text="Reason for canceltion"
                  size={14}
                  color={colors.Gray_Color}
                  font={fontFamilies.medium}
                />
                <TextComponent
                  text={order_detail.order_status[0].cancellation_reason}
                  size={14}
                  font={fontFamilies.medium}
                />
              </RowComponent>
            </SectionComponent>
          )}
        <SpaceComponent height={15} />
        <TextComponent
          text={`${order_detail?.products_order.length} items`}
          size={14}
          font={fontFamilies.medium}
        />
        <SpaceComponent height={16} />
        {order_detail?.products_order && (
          <FlatList
            data={order_detail.products_order}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ItemProductOrderComponent
                name_product={item.name_product}
                category={item.name_category}
                brand={item.name_brand}
                color={item.color}
                size={item.size}
                price={item.price}
                quantity={item.quantity}
                thumb={item.thumb_color}
                discount={item.discount}
              />
            )}
            scrollEnabled={false}
          />
        )}
        <TextComponent
          text="Order information"
          size={15}
          font={fontFamilies.semiBold}
        />
        <SpaceComponent height={15} />
        <TextOrderInformation
          lable="Shipping Address:"
          content={`${order_detail?.specific_address}, ${order_detail?.ward_name}, ${order_detail?.district_name}, ${order_detail?.province_name}`}
        />
        <SpaceComponent height={26} />
        <RowComponent justify="flex-start" flex={1}>
          <TextComponent
            text="Payment method:"
            size={14}
            color={colors.Gray_Color}
            flex={0.4}
            lineHeight={20}
          />
          <DisplayPaymentMethod
            payment_method={order_detail?.payment_method ?? 'COD'}
          />
        </RowComponent>
        <SpaceComponent height={26} />
        <TextOrderInformation
          lable="Delivery fee:"
          content={fotmatedAmount(order_detail?.delivery_fee ?? 0)}
        />
        <SpaceComponent height={26} />
        <TextOrderInformation
          lable="Discount:"
          content={`- ${
            order_detail?.value_voucher && order_detail?.value_voucher > 0
              ? fotmatedAmount(
                  order_detail?.type_voucher === 'percent'
                    ? (order_detail.value_voucher * order_detail.total_amount) /
                        100
                    : order_detail?.value_voucher,
                )
              : 0
          }`}
        />
        <SpaceComponent height={26} />
        <TextOrderInformation
          lable="Total Amount:"
          content={fotmatedAmount(order_detail?.total_amount ?? 0)}
        />
        <SpaceComponent height={34} />
      </ContainerComponent>
      {order_detail?._id && order_detail.current_status && (
        <SectionComponent style={styles.containerButtons}>
          <ButtonOrderStatus
            order_id={order_detail._id}
            order_status={order_detail?.current_status}
          />
        </SectionComponent>
      )}
      <SpaceComponent height={50} />
    </ContainerComponent>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  containerButtons: {
    padding: handleSize(16),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.White_Color,
    elevation: 100,
  },
  containerHeader: {
    backgroundColor: colors.White_Color,
    elevation: handleSize(1),
  },
  container: {
    paddingHorizontal: 0,
  },
});
