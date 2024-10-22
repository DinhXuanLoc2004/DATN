import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {store} from '../store/store';
import {
  addFavoriteBody,
  addFavoriteResponse,
  getAllFavoritesResponse,
  getCategoryIdsToFavoritesResponse,
} from '../types/favorite.type';

const URL_FAVORITE = '/favorite';

const userId = store.getState().auth.user.userId;

const getAllFavoritesAPI = async ({
  queryKey,
}: {
  queryKey: [string, string, string];
}) => {
  const [, user_id, category_id] = queryKey;
  const queryString = createQueryString({user_id, category_id});
  try {
    const data = await axiosIntercreptor.get<
      undefined,
      getAllFavoritesResponse
    >(`${URL_FAVORITE}/get_all_favorites/?${queryString}`);
    return data
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
}: {
  product_id: string;
}): Promise<addFavoriteResponse | undefined> => {
  const body: addFavoriteBody = {
    product_id,
    user_id: userId,
  };
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
