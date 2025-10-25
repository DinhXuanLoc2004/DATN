import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {store} from '../store/store';
import {
  addFavoriteBody,
  addFavoriteResponse,
  getAllFavoritesResponse,
  getCategoryIdsToFavoritesResponse,
} from '../types/favorite.type';
import {
  getAllProductRequet,
  getAllProductsResponse,
} from '../types/product.type';
import {URL_PRODUCT} from './product.api';

const URL_FAVORITE = '/favorite';

const userId = store.getState().auth.user.userId;

const getAllFavoritesAPI = async ({
  queryKey,
}: {
  queryKey: [string, string, string, string?, getAllProductRequet?];
}) => {
  const [, user_id, category_id, sort, body] = queryKey;
  const queryString = createQueryString({
    user_id,
    category_id,
    sort,
    get_products_to_favorite: 'true',
  });
  try {
    const data = await axiosIntercreptor.post<
      getAllProductRequet,
      getAllProductsResponse
    >(`${URL_PRODUCT}/get_all_products/?${queryString}`, body);
    return data;
  } catch (error) {
    console.log('Error get all favorite:: ', error);
  }
};

const getCategoryIdsToFavoritesAPI = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, user_id] = queryKey;
  const queryString = createQueryString({user_id});
  try {
    const data = await axiosIntercreptor.get<
      undefined,
      getCategoryIdsToFavoritesResponse
    >(`${URL_FAVORITE}/get_category_ids_to_favorites/?${queryString}`);
    return data;
  } catch (error) {
    console.log('Error get categoryIds to favorites', error);
  }
};

const addFavoriteAPI = async ({
  product_id,
  user_id,
}: {
  product_id: string;
  user_id: string;
}): Promise<addFavoriteResponse | undefined> => {
  const body: addFavoriteBody = {
    product_id,
    user_id,
  };
  console.log(product_id);
  try {
    const data: addFavoriteResponse = await axiosIntercreptor.post<
      addFavoriteBody,
      addFavoriteResponse
    >(`${URL_FAVORITE}/add_favorite`, body);
    return data;
  } catch (error) {
    console.log('Error add favorite:: ', error);
  }
};

export {addFavoriteAPI, getCategoryIdsToFavoritesAPI, getAllFavoritesAPI};
