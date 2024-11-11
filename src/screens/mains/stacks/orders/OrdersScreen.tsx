import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {globalStyles} from '../../../../styles/globalStyle';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {handleSize} from '../../../../utils/handleSize';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {useAppSelector} from '../../../../helper/store/store';
import {getOrdersForUserAPI} from '../../../../helper/apis/order.api';
import {order} from '../../../../helper/types/order.type';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import {handleDate} from '../../../../utils/handleDate';
import {color} from 'react-native-elements/dist/helpers';

const OrdersScreen = () => {
  const [orderStatusChoose, setorderStatusChoose] = useState<string>('all');
  const [orders, setorders] = useState<order[]>([]);
  interface typeDataOrderStatus {
    title: string;
    value: string;
  }
  const dataOrderStatus: typeDataOrderStatus[] = [
    {
      title: 'All',
      value: 'all',
    },
    {
      title: 'Unpaid',
      value: 'unpaid',
    },
    {
      title: 'Confirming',
      value: 'confirming',
    },
    {
      title: 'Confirmed',
      value: 'confirmed',
    },
    {
      title: 'Delivering',
      value: 'delivering',
    },
    {
      title: 'Delivered Successfully',
      value: 'delivered_successfully',
    },
    {
      title: 'Delivery Failed',
      value: 'delivery_failed',
    },
    {
      title: 'canceled',
      value: 'Canceled',
    },
  ];

  const user_id = useAppSelector(state => state.auth.user.userId);

  const getOrders = async () => {
    const order_status = orderStatusChoose === 'all' ? '' : orderStatusChoose;
    const data = await getOrdersForUserAPI({user_id, order_status});
    if (data?.metadata) {
      setorders(data.metadata);
    }
  };

  useEffect(() => {
    getOrders();
  }, [orderStatusChoose]);

  console.log(orders);

  return (
    <ContainerComponent
      isHeader
      back
      title="My Orders"
      styleHeader={globalStyles.headerElevation}>
      <SpaceComponent height={10} />
      <FlatList
        data={dataOrderStatus}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setorderStatusChoose(item.value);
            }}
            style={[
              styles.btnOrderStatus,
              {
                backgroundColor:
                  orderStatusChoose === item.value
                    ? colors.Text_Color
                    : colors.Backgournd_Color,
              },
            ]}>
            <TextComponent
              text={item.title}
              color={
                item.value === orderStatusChoose
                  ? colors.White_Color
                  : colors.Text_Color
              }
              font={fontFamilies.medium}
              size={14}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <SpaceComponent width={10} />}
      />
      <SpaceComponent height={10} />
      {orders && (
            <FlatList
          data={orders}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <SectionComponent style={styles.containerOrder}>
              <RowComponent>
                <TextComponent text="Order date" font={fontFamilies.semiBold} />
                <TextComponent
                  text={handleDate.convertDateToDDMMYYYY(item.createdAt)}
                  size={14}
                  color={colors.Gray_Color}
                />
              </RowComponent>
              <SpaceComponent height={10} />
              <RowComponent>
                <RowComponent>
                  <TextComponent
                    text={'Quantity: '}
                    color={colors.Gray_Color}
                  />
                  <TextComponent text={item.quantity.toString()} />
                </RowComponent>
                <RowComponent>
                  <TextComponent
                    text={'Total amount: '}
                    color={colors.Gray_Color}
                  />
                  <TextComponent text={item.total_amount.toString()} />
                </RowComponent>
              </RowComponent>
              <SpaceComponent height={10} />
              <RowComponent>
                <TextComponent
                  text={'Status: '}
                  color={colors.Gray_Color}
                />
                <TextComponent text={item.order_status.toString()} />
              </RowComponent>
            </SectionComponent>
          )}
          ItemSeparatorComponent={() => <SpaceComponent height={10} />}
        />
    )}
    </ContainerComponent>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  containerOrder: {
    width: '100%',
    height: handleSize(164),
    borderRadius: handleSize(8),
    backgroundColor: colors.White_Color,
    elevation: 2,
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
