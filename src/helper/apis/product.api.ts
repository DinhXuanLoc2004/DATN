import {sort} from '../../models/listSort';
import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {store, useAppSelector} from '../store/store';
import {
  getAllProductRequet,
  getAllProductsResponse,
  getDataFilerResponse,
} from '../types/product.type';

const URL_PRODUCT = '/product';

const getDataFiler = async () => {
  const dataFiler = await axiosIntercreptor.get<
    undefined,
    getDataFilerResponse
  >(`${URL_PRODUCT}/get_data_filter`);
  return dataFiler;
};

const getAllProductAPI = async ({
  queryKey,
}: {
  queryKey: [string, string?, string?, getAllProductRequet?];
}) => {
  const getStore = store.getState();
  const user_id = getStore.auth.user?.userId ?? '';
  const [, category_id, sort, body] = queryKey;
  const queryString = createQueryString({
    user_id,
    category_id,
    sort,
  });

  try {
    const products = await axiosIntercreptor.post<
      getAllProductRequet,
      getAllProductsResponse
    >(`${URL_PRODUCT}/get_all_products/?${queryString}`, body);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export {getAllProductAPI, getDataFiler};
