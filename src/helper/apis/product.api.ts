import {sort} from '../../models/listSort';
import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {store, useAppSelector} from '../store/store';
import {
  colors_size_toProduct,
  getAllProductRequet,
  getAllProductsResponse,
  getDataFilerResponse,
  getDetailProductResponse,
} from '../types/product.type';

const URL_PRODUCT = '/product';

const getColorsSizesToProduct = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, product_id] = queryKey;
  const queryString = createQueryString({product_id});
  try {
    const data = await axiosIntercreptor.get<undefined, colors_size_toProduct>(
      `${URL_PRODUCT}/get_colors_sizes_to_product/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error fetching colors and sizes to product', error);
  }
};

const getDataFiler = async () => {
  try {
    const dataFiler = await axiosIntercreptor.get<
      undefined,
      getDataFilerResponse
    >(`${URL_PRODUCT}/get_data_filter`);
    return dataFiler;
  } catch (error) {
    console.log('Error get data filter:: ', error);
  }
};

const getDetailProductAPI = async ({
  queryKey,
}: {
  queryKey: [string, string, string];
}) => {
  const [, user_id ,product_id] = queryKey;
  const queryString = createQueryString({product_id, user_id});
  try {
    const product = await axiosIntercreptor.get<
      undefined,
      getDetailProductResponse
    >(`${URL_PRODUCT}/get_detail_product/?${queryString}`);
    return product;
  } catch (error) {
    console.log('Get detail product error::', error);
  }
};

const getAllProductAPI = async ({
  queryKey,
}: {
  queryKey: [string, string?, string?, string?, getAllProductRequet?];
}) => {
  const [, user_id, category_id, sort, body] = queryKey;
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

export {
  getAllProductAPI,
  getDataFiler,
  getDetailProductAPI,
  getColorsSizesToProduct,
};
