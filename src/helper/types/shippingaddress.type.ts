import { Response } from "./response.type";

export interface getShippingAddressDefaultResponse extends Response {
  metadata: ShippingAddress
}

export type updateShippingAddressBody = Omit<addShippingAddressBody, 'user_id'>
export interface updateShippingAddressResponse extends Response {
  metadata: ShippingAddress
}

export interface ShippingAddress {
  _id: string;
  full_name: string;
  phone: string;
  province_city: string;
  district: string;
  ward_commune: string;
  specific_address: string;
  is_default: boolean;
  user_id: string;
}

export interface ApiResponse {
  message: string;
  status: number;
  metadata: ShippingAddress[];
}

export interface addShippingAddressBody {
  full_name: string;
  phone: number;
  province_city: string;
  district: string;
  ward_commune: string;
  specific_address: string;
  is_default: boolean;
  user_id: string
}

export interface addShippingAddressReponse extends Response {
  metadata: ShippingAddress;
}

export interface updateStatusDefaultShippingAddressResponse extends Response {
  metadata: ShippingAddress | string
}
