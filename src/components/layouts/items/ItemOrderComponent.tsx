import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { fontFamilies } from '../../../constants/fontFamilies';
import { payment_methods } from '../../../constants/payment_methods';
import { order } from '../../../helper/types/order.type';
import { stackParamListMain } from '../../../navigation/StackMainNavigation';
import { fotmatedAmount } from '../../../utils/fotmats';
import { handleDate } from '../../../utils/handleDate';
import { handleSize } from '../../../utils/handleSize';
import ButtonOrderStatus from '../../buttons/ButtonOrderStatus';
import TextComponent from '../../texts/TextComponent';
import RowComponent from '../RowComponent';
import SectionComponent from '../SectionComponent';
import SpaceComponent from '../SpaceComponent';

type stackProp = StackNavigationProp<stackParamListMain, 'OrdersScreen'>;

const ItemOrderComponent = ({item}: {item: order}) => {
  const navigation = useNavigation<stackProp>();

  const payment_url = payment_methods.find(
    payment => payment.payment_name === item.payment_method,
  )?.thum_payment;

  const detaiOrder = () => {
    if (!item._id) return; // Check if `item._id` exists
    navigation.navigate('OrderDetailScreen', {order_id: item._id});
  };

  console.log(item);

  return (
    <SectionComponent
      style={[styles.containerOrder]}
      onPress={() => detaiOrder()}
    >
      <RowComponent>
        <TextComponent text="Order date" font={fontFamilies.semiBold} />
        {item.order_status &&
        item.order_status !== 'Unpaid' &&
        item.order_status !== 'Canceled' &&
        item.order_date ? (
          <TextComponent
            text={handleDate.convertDateToDDMMYYYY(item.order_date)} // Ensure valid date
            size={14}
            color={colors.Gray_Color}
          />
        ) : (
          <TextComponent
            text={item.order_status ?? ''}
            size={14}
            color={colors.Primary_Color}
          />
        )}
      </RowComponent>
      {item.leadtime &&
        item.order_status !== 'Unpaid' &&
        item.order_status !== 'Canceled' && (
          <SectionComponent flex={0}>
            <SpaceComponent height={10} />
            <RowComponent>
              <TextComponent
                text="Estimated delivery time: "
                color={colors.Gray_Color}
                size={14}
              />
              <TextComponent
                text={handleDate.convertDateToDDMMYYYY(item.leadtime)} // Ensure valid leadtime
                color={colors.Success_Color}
                size={14}
                style={styles.italicText}
              />
            </RowComponent>
          </SectionComponent>
        )}
          <SpaceComponent height={10} />
          <RowComponent>
            <TextComponent
              text="Delivery fee:"
              color={colors.Gray_Color}
              size={14}
            />
            <TextComponent
              text={fotmatedAmount(item?.delivery_fee ?? 0)}
              size={14}
              font={fontFamilies.medium}
            />
          </RowComponent>
      <SpaceComponent height={10} />
      <RowComponent>
        <RowComponent>
          <TextComponent
            text={'Quantity: '}
            color={colors.Gray_Color}
            size={14}
          />
          <TextComponent text={item.quantity?.toString() ?? '0'} />
        </RowComponent>
        <RowComponent>
          <TextComponent
            text={'Total amount: '}
            color={colors.Gray_Color}
            size={14}
          />
          <TextComponent
            text={fotmatedAmount(item.total_amount ?? 0)}
            size={14}
            font={fontFamilies.medium}
          />
        </RowComponent>
      </RowComponent>
      <SpaceComponent height={10} />
      <RowComponent>
        <TextComponent text={'Status: '} color={colors.Gray_Color} size={14} />
        <TextComponent
          text={item.order_status ?? 'Unknown'}
          size={14}
          color={
            item.order_status === 'Canceled' ||
            item.order_status === 'Unpaid' ||
            item.order_status === 'Delivery Failed'
              ? colors.Primary_Color
              : item.order_status === 'Delivering'
              ? colors.Yellow_Color
              : item.order_status === 'Delivered Successfully'
              ? colors.Success_Color
              : colors.Text_Color
          }
          font={fontFamilies.medium}
        />
      </RowComponent>
      {item.order_status && item.status_date && (
        <SectionComponent>
          <SpaceComponent height={10} />
          <RowComponent>
            <TextComponent
              text={
                item.order_status === 'Canceled'
                  ? 'Cancellation period'
                  : 'Order status update time'
              }
              color={colors.Gray_Color}
              size={14}
            />
            <TextComponent
              text={handleDate.formatDateTimeHHMM(item.status_date)}
              size={14}
              font={fontFamilies.medium}
            />
          </RowComponent>
        </SectionComponent>
      )}
      {item.order_status === 'Canceled' && item.cancellation_reason && (
        <SectionComponent flex={1}>
          <SpaceComponent height={10} />
          <RowComponent flex={0}>
            <TextComponent
              text={'Reason: '}
              color={colors.Gray_Color}
              size={14}
            />
            <TextComponent
              text={item.cancellation_reason}
              size={14}
              numberOfLines={1}
              ellipsizeMode="tail"
              font={fontFamilies.medium}
              flex={1}
              style={{textAlign: 'right'}}
            />
          </RowComponent>
        </SectionComponent>
      )}
      {item.order_status !== 'Unpaid' && item.order_status !== 'Canceled' && (
        <SectionComponent flex={0}>
          <SpaceComponent height={10} />
          <RowComponent>
            <TextComponent
              text="Payment method:"
              size={14}
              color={colors.Gray_Color}
            />
            {payment_url !== undefined ? (
              <Image
                style={styles.imgPayment}
                source={{
                  uri: payment_url,
                }}
              />
            ) : (
              <TextComponent text="Unavailable" size={14} />
            )}
          </RowComponent>
        </SectionComponent>
      )}
      <SpaceComponent height={10} />
      <ButtonOrderStatus order_id={item._id} order_status={item.order_status} />
    </SectionComponent>
  );
};

export default ItemOrderComponent;

const styles = StyleSheet.create({
  imgPayment: {
    width: handleSize(30),
    height: handleSize(30),
    borderRadius: 10,
  },
  italicText: {
    fontStyle: 'italic',
  },
  btnPayment: {
    marginTop: 10,
    width: '100%',
    elevation: 0,
    paddingVertical: handleSize(10),
  },
  containerOrder: {
    width: '100%',
    height: 'auto',
    borderRadius: handleSize(10),
    backgroundColor: colors.White_Color,
    elevation: 3,
    padding: handleSize(20),
  },
  btnOrderStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: handleSize(30),
    borderRadius: handleSize(29),
    paddingHorizontal: handleSize(11),
  },
});
