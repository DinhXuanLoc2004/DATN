import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  findImageColorProductVariantResponse,
  findProductVariantReponse,
  findSizeProductVariantResponse,
} from '../types/product_variant.type';

const URL_PRODUCT_VARIANT = '/product_variant';

const findImageColorProductVariant = async (
  product_id: string,
) => {
  const queryString = createQueryString({
    product_id
  });
  try {
    const data = await axiosIntercreptor.get<
      undefined,
      findImageColorProductVariantResponse
    >(`${URL_PRODUCT_VARIANT}/find_image_color_product_variant/?${queryString}`);
    return data
  } catch (error) {
    console.log('Error find image color product variant:: ', error);
  }
};

const findSizeProductVariant = async (
  product_id: string,
  image_product_color_id: string,
) => {
  const queryString = createQueryString({
    product_id,
    image_product_color_id,
  });
  try {
    const data = await axiosIntercreptor.get<
      undefined,
      findSizeProductVariantResponse
    >(`${URL_PRODUCT_VARIANT}/find_size_product_variant/?${queryString}`);
    return data;
  } catch (error) {
    console.log('Error find size product variant:: ', error);
  }
};

const findProductVariant = async ({
  queryKey,
}: {
  queryKey: [string, string, string, string, string];
}) => {
  const [, product_id, image_product_color_id, size_id, user_id] = queryKey;
  const queryString = createQueryString({
    product_id,
    image_product_color_id,
    size_id,
    user_id
  });

  try {
    const product_variant = await axiosIntercreptor.get<
      undefined,
      findProductVariantReponse
    >(`${URL_PRODUCT_VARIANT}/find_product_variant/?${queryString}`);
    return product_variant;
  } catch (error) {
    console.log('Error find product variant', error);
  }
};

export {findProductVariant, findSizeProductVariant, findImageColorProductVariant};
