import axiosIntercreptor from '../config/axiosIntercreptor';
import {getSalesActive} from '../types/sale.type';

const URL_SALE = '/sale';

const getSalesActiveAPI = async () => {
  try {
    const data = await axiosIntercreptor.get<undefined, getSalesActive>(
      `${URL_SALE}/get_sales_active`,
    );
    return data
  } catch (error) {
    console.log('Error get sales active!', error);
  }
};

export {
    getSalesActiveAPI
}
