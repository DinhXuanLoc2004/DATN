import { createQueryString } from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {categoriesResponse} from '../types/category.type';

const URL_CATEGORY = '/category';

const getCategories = async ({queryKey}: {queryKey: string[]}) => {
  const [, parent_id] = queryKey;
  const queryString = createQueryString({is_delete: 'false', parent_id})
  const categories = await axiosIntercreptor.get<undefined, categoriesResponse>(
    `${URL_CATEGORY}/get_categories/?${queryString}`,
  );
  return categories;
};

export {getCategories};
