import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import { findProductVariantReponse } from '../types/product_variant.type';

const URL_PRODUCT_VARIANT = '/product_variant';

const findProductVariant = async ({
  queryKey,
}: {
  queryKey: [string, string, string, string];
}) => {
  const [, product_id, image_product_color_id, size_id] = queryKey;
  const queryString = createQueryString({
    product_id,
    image_product_color_id,
    size_id,
  });

  try {
    const product_variant = await axiosIntercreptor.get<undefined, findProductVariantReponse>(
      `${URL_PRODUCT_VARIANT}/find_product_variant/?${queryString}`,
    );
    return product_variant
  } catch (error) {
    console.log('Error find product variant', error);
  }
};

export {findProductVariant}
