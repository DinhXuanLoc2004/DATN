import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {order_status} from '../../helper/types/order.type';
import {order_status_name} from '../../helper/types/order_status.type';
import BtnForUnpidStatusOrder from './BtnForUnpidStatusOrder';
import BtnCancelOrder from './BtnCancelOrder';
import BtnForCanceledStatusOrder from './BtnForCanceledStatusOrder';
import BtnForDeliveredSuccessStatusOrder from './BtnForDeliveredSuccessStatusOrder';

interface Props {
  order_status: order_status_name;
  order_id: string;
}

const ButtonOrderStatus: FC<Props> = ({order_id, order_status}) => {
  switch (order_status) {
    case 'Unpaid':
        return <BtnForUnpidStatusOrder order_id={order_id}/>;
    case 'Confirming':
        return <BtnCancelOrder order_id={order_id}/>;
    case 'Canceled':
        return <BtnForCanceledStatusOrder order_id={order_id}/>;
    case 'Delivered Successfully':
        return <BtnForDeliveredSuccessStatusOrder order_id={order_id}/>;
    default:
        return <View/>
  }
};

export default ButtonOrderStatus;

const styles = StyleSheet.create({});
