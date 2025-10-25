import {payment_name} from '../../constants/payment_methods';
import {cartCheck} from './cart.type';
import {order_status_name} from './order_status.type';
import {Response} from './response.type';
import {shipping_address_chooose} from './shippingaddress.type';
import {voucher} from './voucher.type';

export interface product_order
  extends Omit<
    product_detail_order,
    'product_order_id' | 'thumb' | 'name_color'
  > {
  thumb_color: string;
  color: string;
  quantity: number;
  discount: number;
}

export interface order_status {
  status: order_status_name;
  province_name: string;
  district_name: string;
  ward_name: string;
  specific_address: string;
  cancellation_reason: string;
  createdAt: string;
}

export interface voucher_used_for_order {
  voucher_id: string;
  voucher_name: string;
  voucher_code: string;
  thumb_voucher: string;
}

export interface order_detail {
  _id: string;
  user_id: string;
  full_name: string;
  phone: string;
  province_id: number;
  province_name: string;
  district_id: number;
  district_name: string;
  ward_code: string;
  ward_name: string;
  specific_address: string;
  voucher_user_id: string;
  type_voucher: string;
  value_voucher: number;
  delivery_fee: number;
  leadtime: string | null;
  payment_method: payment_name;
  payment_status: boolean;
  total_amount: number;
  order_date: string | null;
  products_order: product_order[];
  order_status: order_status[];
  voucher_used: voucher_used_for_order;
  current_status: order_status_name;
  email: string;
}

export interface getOrderDetailResponse extends Response {
  metadata: order_detail;
}

export interface product_detail_order {
  product_order_id: string;
  product_id: string;
  thumb: string;
  name_product: string;
  name_category: string;
  name_brand: string;
  size: string;
  name_color: string;
  price: number;
  order_id: string;
}

export interface getProductDetailOrderResponse extends Response {
  metadata: product_detail_order;
}

export interface reviews_order {
  product_order_id: string;
  quantity: number;
  price: number;
  discount: number;
  is_reviewed: boolean;
  review_id: string;
  name_product: string;
  name_category: string;
  name_brand: string;
  thumb: string;
  name_color: string;
  size: string;
  product_id: string;
}

export interface getReviewsForOrderResponse extends Response {
  metadata: reviews_order[];
}

export interface cancelOrderResponse extends Response {
  metadata: boolean;
}

export interface bodyCancalOrder {
  cancellation_reason: string;
}

export interface continueOrderResponse extends orderResponse {}

export interface bodyContinueOrder
  extends Omit<createOrderRequet, 'products_order' | 'cart_id' | 'user_id'> {}

export interface voucher_detail_order_continue
  extends Omit<voucher, '_id' | 'voucher_description' | 'thumb' | 'is_saved'> {
  voucher_thumb: string;
  quantity: number;
  voucher_id: string;
}

export interface product_order extends Omit<cartCheck, 'cart_id'> {}

export interface getProductsContinueOrderResponse extends Response {
  metadata: {
    full_name: string;
    phone: string;
    province_id: number;
    province_name: string;
    district_id: number;
    district_name: string;
    ward_code: string;
    ward_name: string;
    specific_address: string;
    voucher_user_id: null | string;
    type_voucher: string;
    value_voucher: number;
    payment_method: payment_name;
    products_order: product_order[];
    voucher_detail: voucher_detail_order_continue | null;
  };
}

export interface findOrderIdResponse extends Response {
  metadata: string;
}

export interface order {
  _id: string;
  delivery_fee: number | null;
  leadtime: string | null;
  payment_method: payment_name;
  payment_status: boolean;
  total_amount: number;
  order_date: string | null;
  createdAt: string;
  items: number;
  quantity: number;
  order_status: order_status_name;
  cancellation_reason: string;
  status_date: string;
}

export interface getOrdersForUserResponse extends Response {
  metadata: order[];
}

export interface orderResponse extends Response {
  metadata: Omit<createOrderRequet, 'products_order' | 'cart_ids'> & {
    _id: string;
    zp_trans_token: string;
    approve: string;
  };
}

export interface products_orderResquet {
  product_variant_id: string;
  quantity: number;
  price: number;
  discount: number;
  name_product: string;
}

export interface createOrderRequet
  extends Omit<shipping_address_chooose, 'phone'> {
  phone: string;
  user_id: string;
  voucher_user_id: string;
  type_voucher: string;
  value_voucher: number;
  delivery_fee: number;
  leadtime: string;
  payment_method: payment_name;
  total_amount: number;
  products_order: products_orderResquet[];
  cart_ids?: string[];
}
