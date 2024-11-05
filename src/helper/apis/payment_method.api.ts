import axiosIntercreptor from '../config/axiosIntercreptor';
import {getAllPaymentMethodResponse} from '../types/payment_method.type';

const URL_PAYMENT_METHOD = 'payment_method';

const getAllPaymentMethodAPI = async ({queryKey}: {queryKey: [string]}) => {
  try {
    return axiosIntercreptor.get<undefined, getAllPaymentMethodResponse>(
      `${URL_PAYMENT_METHOD}/get_all_payment`,
    );
  } catch (error) {
    console.log('err get all peyment method:: ', error);
  }
};

export {getAllPaymentMethodAPI}
