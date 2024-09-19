import axiosIntercreptor from '../config/axiosIntercreptor';
import {categoriesResponse} from '../types/category.type';

const URL_CATEGORY = '/category';

const getCategories = async ({queryKey}: {queryKey: string[]}) => {
  const [, parent_id] = queryKey;
  const categories = await axiosIntercreptor.get<undefined, categoriesResponse>(
    `${URL_CATEGORY}/get_categories/${parent_id}`,
  );
  return categories;
};

export {getCategories};
