import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  getAllVoucherResponse,
  voucherDetailResponse,
} from '../types/voucher.type';

const URL_VOUCHER = '/voucher';

const getVoucherDetailAPI = async (voucher_id: string, user_id: string) => {
  try {
    const queryString = createQueryString({_id: voucher_id, user_id});
    const data = await axiosIntercreptor.get<undefined, voucherDetailResponse>(
      `${URL_VOUCHER}/get_detail_voucher/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error get voucher detail:: ', error);
  }
};

const getAllVoucherAPI = async (user_id: string) => {
  try {
    const queryString = createQueryString({user_id, active: 'true', is_public: 'true'});
    const data = await axiosIntercreptor.get<undefined, getAllVoucherResponse>(
      `${URL_VOUCHER}/get_all_vouchers/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error get all voucher:: ', error);
  }
};

export {getAllVoucherAPI, getVoucherDetailAPI};
