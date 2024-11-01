import { createQueryString } from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {getAllDeliveryMethodResponse, getDetailDeliveryMethodResponse} from '../types/delivery_method.type';

const URL_DELIVERY_METHOD = '/delivery_method';

const getDetailDeliveryMethodAPI = async ({_id}: {_id: string}) => {
    try {
        const queryString = createQueryString({_id})
      return axiosIntercreptor.get<undefined, getDetailDeliveryMethodResponse>(
        `${URL_DELIVERY_METHOD}/get_detail_delivery_method/?${queryString}`,
      );
    } catch (error) {
      console.log('Error get detail delivery method!');
    }
  };

const getAllDeliveryMethodAPI = async () => {
  try {
    return axiosIntercreptor.get<undefined, getAllDeliveryMethodResponse>(
      `${URL_DELIVERY_METHOD}/get_all_delivery_method`,
    );
  } catch (error) {
    console.log('Error get all delivery method!');
  }
};

export {getAllDeliveryMethodAPI, getDetailDeliveryMethodAPI}
