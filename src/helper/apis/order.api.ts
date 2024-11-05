import axiosIntercreptor from '../config/axiosIntercreptor';
import {createOrderRequet, orderResponse} from '../types/order.type';

const URL_ORDER = '/order';

const orderAPI = async (body: createOrderRequet) => {
  try {
    const data = await axiosIntercreptor.post<createOrderRequet, orderResponse>(
      `${URL_ORDER}/create_order`,
      body
    );
    return data
  } catch (error) {
    console.log('Error create order:: ', error);
  }
};

export {orderAPI}
