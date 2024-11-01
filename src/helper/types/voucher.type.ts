import {imageType} from './image.type';
import { Response } from './response.type';

export interface voucherDetail {
  _id: string;
  voucher_name: string;
  voucher_description: string;
  voucher_type: string;
  voucher_code: string;
  image_voucher: imageType;
  time_start: string;
  time_end: string;
  quantity: number;
  min_order_value: number;
  is_voucher_new_user: boolean;
  is_active: boolean;
  is_saved: boolean;
  voucher_value: number;
  is_used: boolean;
}

export interface voucherDetailResponse extends Response {
  metadata: voucherDetail;
}

export interface voucher {
  _id: string;
  voucher_description: string;
  voucher_type: string;
  voucher_value: number;
  voucher_code: string;
  time_start: string;
  time_end: string;
  quantity: string | number;
  min_order_value: number;
  thumb: string;
  is_saved: boolean;
  is_used: boolean;
  voucher_name: string
}

export interface getAllVoucherResponse extends Response {
  metadata: voucher[];
}
