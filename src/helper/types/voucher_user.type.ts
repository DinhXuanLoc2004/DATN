export interface voucher_user {
  _id: string;
  is_used: boolean;
  voucher_name: string;
  voucher_type: string;
  voucher_value: number;
  voucher_code: string;
  thumb: string;
  time_start: string;
  time_end: string;
  quantity: number | string;
  min_order_value: number;
  voucher_id: string;
  is_new_voucher_user: boolean;
}

export interface getAllVoucherUserResponse extends Response {
  metadata: voucher_user[]
}

export interface saveVoucherUserBody {
  user_id: string;
  voucher_id: string;
}

export interface saveVoucherUserResponse extends Response {
  metadata: {
    _id: string;
    user_id: string;
    voucher_id: string;
    is_used: boolean;
  };
}
