import { payment_name } from '../../constants/payment_methods';
import {Response} from './response.type';
import { shipping_address_chooose } from './shippingaddress.type';

export interface order {
  _id: string;
  total_amount: number;
  order_status: string;
  createdAt: string;
  items: number;
  quantity: number
}

export interface getOrdersForUserResponse extends Response {
  metadata: order[]
}

export interface orderResponse extends Response {
  metadata: Omit<createOrderRequet, 'products_order' | 'cart_ids'> & {
    _id: string;
    zp_trans_token: string;
    approve: string
  };
}

export interface products_orderResquet {
  product_variant_id: string;
  quantity: number;
  price: number;
  discount: number;
  name_product: string;
}

export interface createOrderRequet extends Omit<shipping_address_chooose, 'phone'> {
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
