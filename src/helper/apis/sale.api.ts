import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  getCategoriesSale,
  getProductsSaleResponse,
  getSalesActive,
} from '../types/sale.type';

const URL_SALE = '/sale';

const getProductsSaleAPI = async ({
  queryKey,
}: {
  queryKey: [string, string, string, string];
}) => {
  try {
    const [, sale_id, user_id, category_id] = queryKey;
    const queryString = createQueryString({sale_id, user_id, category_id});
    const data = await axiosIntercreptor.get<
      undefined,
      getProductsSaleResponse
    >(`${URL_SALE}/get_products_sale/?${queryString}`);
    return data;
  } catch (error) {
    console.log('Error get products sale:: ', error);
  }
};

const getCategoriesSaleAPI = async (sale_id: string) => {
  try {
    const queryString = createQueryString({sale_id});
    const data = await axiosIntercreptor.get<undefined, getCategoriesSale>(
      `${URL_SALE}/get_categories_sale/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error get categories sale:: ', error);
  }
};

const getSalesActiveAPI = async () => {
  try {
    const data = await axiosIntercreptor.get<undefined, getSalesActive>(
      `${URL_SALE}/get_sales_active`,
    );
    return data;
  } catch (error) {
    console.log('Error get sales active!', error);
  }
};

export {getSalesActiveAPI, getCategoriesSaleAPI, getProductsSaleAPI};
