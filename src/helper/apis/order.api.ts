import {create} from 'react-test-renderer';
import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  bodyCancalOrder,
  bodyContinueOrder,
  cancelOrderResponse,
  continueOrderResponse,
  createOrderRequet,
  findOrderIdResponse,
  getOrderDetailResponse,
  getOrdersForUserResponse,
  getProductDetailOrderResponse,
  getProductsContinueOrderResponse,
  getReviewsForOrderResponse,
  orderResponse,
} from '../types/order.type';

const URL_ORDER = '/order';

const getOrderDetailAPI = async (order_id: string) => {
  try {
    const queryString = createQueryString({order_id});
    const data = await axiosIntercreptor.get<undefined, getOrderDetailResponse>(
      `${URL_ORDER}/get_order_detail/?${queryString}`,
    );
    return data
  } catch (error) {
    console.log('error get order detail:: ', error);
  }
};

const getProductDetailOrderAPI = async (product_order_id: string) => {
  try {
    const queryString = createQueryString({product_order_id});
    const data = await axiosIntercreptor<
      undefined,
      getProductDetailOrderResponse
    >(`${URL_ORDER}/get_product_detail_order/?${queryString}`);
    return data;
  } catch (error) {
    console.log('Error get product detail order:: ', error);
  }
};

const getReviewsOrderAPI = async ({queryKey}: {queryKey: [string, string]}) => {
  try {
    const [, order_id] = queryKey;
    const queryString = createQueryString({order_id});
    const data = await axiosIntercreptor.get<
      undefined,
      getReviewsForOrderResponse
    >(`${URL_ORDER}/get_reviews_for_order/?${queryString}`);
    return data;
  } catch (error) {
    console.log('Error get review order:: ', error);
  }
};

const cancelOrderAPI = async (order_id: string, body: bodyCancalOrder) => {
  try {
    const queryString = createQueryString({order_id});
    const data = await axiosIntercreptor.post<
      bodyCancalOrder,
      cancelOrderResponse
    >(`${URL_ORDER}/cancel_order/?${queryString}`, body);
    return data;
  } catch (error) {
    console.log('Error cancel order:: ', error);
  }
};

const continueOrderAPI = async (order_id: string, body: bodyContinueOrder) => {
  try {
    const queryString = createQueryString({order_id});
    const data = await axiosIntercreptor.put<
      bodyContinueOrder,
      continueOrderResponse
    >(`${URL_ORDER}/continue_order/?${queryString}`, body);
    return data;
  } catch (error) {
    console.log('Error continue order:: ', error);
  }
};

const getProductsContinueOrderAPI = async (order_id: string) => {
  try {
    const queryString = createQueryString({order_id});
    const data = await axiosIntercreptor.get<
      undefined,
      getProductsContinueOrderResponse
    >(`${URL_ORDER}/get_products_continue_order/?${queryString}`);
    return data;
  } catch (error) {
    console.log('Error get products continue order:: ', error);
  }
};

const findZpTransTokenAPI = async (zp_trans_token: string) => {
  try {
    const queryString = createQueryString({zp_trans_token});
    const data = await axiosIntercreptor.get<undefined, findOrderIdResponse>(
      `${URL_ORDER}/find_orderid_by_zptranstoken/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error find order_id by zp_trans_token:: ', error);
  }
};

const findPaypalIdAPI = async (paypal_id: string) => {
  try {
    const queryString = createQueryString({paypal_id});
    const data = await axiosIntercreptor.get<undefined, findOrderIdResponse>(
      `${URL_ORDER}/find_orderid_by_paypalid/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error find order_id by paypal_id:: ', error);
  }
};

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
    return data;
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

export {
  orderAPI,
  getOrdersForUserAPI,
  findPaypalIdAPI,
  findZpTransTokenAPI,
  getProductsContinueOrderAPI,
  continueOrderAPI,
  cancelOrderAPI,
  getReviewsOrderAPI,
  getProductDetailOrderAPI,
  getOrderDetailAPI
};
