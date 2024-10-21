import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {store} from '../store/store';
import {
  addToCartResponse,
  bodyAddToCart,
  bodyChangeQuantityCart,
  cartDeleteResponse,
  changeQuantityCartResponse,
  getAllCartResponse,
} from '../types/cart.type';

const URL_CART = '/cart';

const getStore = store.getState();
const user_id = getStore.auth.user.userId;

const deleteCartAPI = async (cart_id: string) => {
  try {
    const queryString = createQueryString({cart_id});
    const data = await axiosIntercreptor.delete<undefined, cartDeleteResponse>(
      `${URL_CART}/delete_cart/?${queryString}`,
    );
    return data
  } catch (error) {
    console.log('Error delete cart', error);
  }
};

const changeQuantityCartAPI = async (body: bodyChangeQuantityCart) => {
  try {
    const data = await axiosIntercreptor.put<
      bodyChangeQuantityCart,
      changeQuantityCartResponse
    >(`${URL_CART}/change_quantity_cart`, body);
    return data;
  } catch (error) {
    console.log('Error change quantity cart', error);
  }
};

const getAllCartAPI = async ({queryKey}: {queryKey: [string, string]}) => {
  const [, userId] = queryKey
  const queryString = createQueryString({user_id: userId});
  try {
    const data = await axiosIntercreptor.get<undefined, getAllCartResponse>(
      `${URL_CART}/get_all_cart/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error get all item cart::', error);
  }
};

const addToCartAPI = async ({
  product_variant_id,
  quantity,
}: {
  product_variant_id: string;
  quantity: number;
}) => {
  const body: bodyAddToCart = {
    product_variant_id,
    quantity,
    user_id,
  };
  try {
    const data = await axiosIntercreptor.post<bodyAddToCart, addToCartResponse>(
      `${URL_CART}/add_to_cart`,
      body,
    );
    return data;
  } catch (error) {
    console.log('Error add to cart::', error);
  }
};

export {addToCartAPI, getAllCartAPI, changeQuantityCartAPI, deleteCartAPI};
