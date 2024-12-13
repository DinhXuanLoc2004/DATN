import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  getAllProductRequet,
  getAllProductsResponse,
} from '../types/product.type';
import {
  getCategoriesSale,
  getProductsSaleResponse,
  getSalesActive,
} from '../types/sale.type';
import {URL_PRODUCT} from './product.api';

const URL_SALE = '/sale';

const getProductsSaleAPI = async ({
  queryKey,
}: {
  queryKey: [string, string, string, string, string, getAllProductRequet];
}) => {
  try {
    const [, sale_id, user_id, category_id, sort, body] = queryKey;
    const queryString = createQueryString({
      sale_id,
      user_id,
      category_id,
      sort,
    });
    const data = await axiosIntercreptor.post<
      getAllProductRequet,
      getAllProductsResponse
    >(`${URL_PRODUCT}/get_all_products/?${queryString}`, body);
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
    const queryString = createQueryString({active: 'true'});
    const data = await axiosIntercreptor.get<undefined, getSalesActive>(
      `${URL_SALE}/get_sales_active/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error get sales active!', error);
  }
};

export {getSalesActiveAPI, getCategoriesSaleAPI, getProductsSaleAPI};
