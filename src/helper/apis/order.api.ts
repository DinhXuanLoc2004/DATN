import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  createOrderRequet,
  getOrdersForUserResponse,
  orderResponse,
} from '../types/order.type';

const URL_ORDER = '/order';

const getOrdersForUserAPI = async ({
  user_id,
  order_status,
}: {
  user_id: string;
  order_status: string;
}) => {
  try {
    const queryString = createQueryString({user_id, order_status});
    const data = await axiosIntercreptor.get<
      undefined,
      getOrdersForUserResponse
    >(`${URL_ORDER}/get_orders_for_user/?${queryString}`);
    return data
  } catch (error) {
    console.log('Error get orders for user:: ', error);
  }
};

const orderAPI = async (body: createOrderRequet) => {
  try {
    const data = await axiosIntercreptor.post<createOrderRequet, orderResponse>(
      `${URL_ORDER}/create_order`,
      body,
    );
    return data;
  } catch (error) {
    console.log('Error create order:: ', error);
  }
};

export {orderAPI, getOrdersForUserAPI};
