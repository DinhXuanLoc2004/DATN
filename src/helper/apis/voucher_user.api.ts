import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  getAllVoucherUserResponse,
  saveVoucherUserBody,
  saveVoucherUserResponse,
} from '../types/voucher_user.type';

const URL_VOUCHER_USER = '/voucher_user';

const getAllVoucherUserAPI = async ({
  user_id,
  is_used,
  min_order_value
}: {
  user_id: string;
  is_used: string;
  min_order_value?: string
}) => {
  try {
    const queryString = createQueryString({user_id, is_used, min_order_value});
    const data = await axiosIntercreptor.get<
      undefined,
      getAllVoucherUserResponse
    >(`${URL_VOUCHER_USER}/get_vouchers_user/?${queryString}`);
    return data
  } catch (error) {
    console.log('Error get all voucher user:: ',error);
  }
};

const saveVoucherUserAPI = async (body: saveVoucherUserBody) => {
  try {
    const data = await axiosIntercreptor.post<
      saveVoucherUserBody,
      saveVoucherUserResponse
    >(`${URL_VOUCHER_USER}/save_voucher_user`, body);
    return data;
  } catch (error) {
    console.log('Error save voucher user:: ', error);
  }
};

export {saveVoucherUserAPI, getAllVoucherUserAPI};
