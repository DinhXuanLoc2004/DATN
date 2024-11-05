import {Response} from './response.type';

export interface orderResponse extends Response {
  metadata: Omit<createOrderRequet, 'products_order' | 'cart_ids'> & {
    _id: string;
    payment_type: string;
    zp_trans_token: string
  };
}

export interface products_orderResquet {
  product_variant_id: string;
  quantity: number;
  price: number;
  discount: number;
  name_product: string;
}

export interface createOrderRequet {
  user_id: string;
  full_name: string;
  phone: string;
  province_city: string;
  district: string;
  ward_commune: string;
  specific_address: string;
  voucher_user_id: string;
  type_voucher: string;
  value_voucher: number;
  delivery_method_id: string;
  delivery_fee: number;
  payment_method_id: string;
  total_amount: number;
  products_order: products_orderResquet[];
  cart_ids?: string[];
}
