import {Response} from './response.type';

export interface delivery_fee {
  delivery_fee: number;
  leadtime: number
}
export interface getDeliveryFeeResponse extends Response {
  metadata: delivery_fee
}

export interface ward {
  WardCode: string;
  WardName: string;
}

export interface get_wards_response extends Response {
  metadata: ward[];
}

export interface district {
  DistrictID: number;
  DistrictName: string;
}

export interface get_districts_response extends Response {
  metadata: district[];
}

export interface province {
  ProvinceID: number;
  ProvinceName: string;
}

export interface get_all_province_response extends Response {
  metadata: province[];
}

export interface getShippingAddressDefaultResponse extends Response {
  metadata: shipping_address;
}

export interface updateShippingAddressBody
  extends Omit<addShippingAddressBody, 'user_id'> {}

export interface updateShippingAddressResponse extends Response {
  metadata: shipping_address;
}

export interface shipping_address_chooose
  extends Omit<shipping_address, '_id' | 'user_id' | 'is_default'> {}

export interface shipping_address extends addShippingAddressBody {
  _id: string;
}

export interface getShippingAddressDetailResponse extends Response {
  metadata: shipping_address;
}

export interface deleteShippingAddressResponse extends Response {
  metadata: shipping_address;
}

export interface getAllShippingAddressResponse extends Response {
  metadata: shipping_address[];
}

export interface addShippingAddressBody {
  full_name: string;
  phone: number;
  province_name: string;
  province_id: number;
  district_name: string;
  district_id: number;
  ward_code: string;
  ward_name: string;
  specific_address: string;
  is_default: boolean;
  user_id: string;
}

export interface addShippingAddressReponse extends Response {
  metadata: shipping_address;
}

export interface updateStatusDefaultShippingAddressResponse extends Response {
  metadata: shipping_address;
}
