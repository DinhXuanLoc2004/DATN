import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  addShippingAddressBody,
  addShippingAddressReponse,
  ApiResponse,
  getShippingAddressDefaultResponse,
  ShippingAddress,
  updateStatusDefaultShippingAddressResponse,
} from '../types/shippingaddress.type';

const URL_SHIPPING_ADDRESS = 'shipping_address';

export const getShippingAddressDefaultAPI = async ({queryKey}: {queryKey: string[]}) => {
  try {
    const [, user_id] = queryKey
    const queryString = createQueryString({user_id});
    const data = await axiosIntercreptor.get<
      undefined,
      getShippingAddressDefaultResponse
    >(`${URL_SHIPPING_ADDRESS}/get_default_shipping_address/?${queryString}`);
    return data
  } catch (error) {
    console.log('Error get default shipping address!');
  }
};

export const fetchShippingAddresses = async (user_id: string) => {
  try {
    const response: ApiResponse = await axiosIntercreptor.get(
      `${URL_SHIPPING_ADDRESS}/get_all_shipping_address?user_id=${user_id}`,
    );
    return response.metadata;
  } catch (error) {
    console.error('Error fetching shipping addresses:', error);
  }
};

export const updateDefaultShippingAddress = async (
  address: ShippingAddress,
) => {
  const updatedStatus = !address.is_default;
  try {
    const data = await axiosIntercreptor.put<
      undefined,
      updateStatusDefaultShippingAddressResponse
    >(
      `${URL_SHIPPING_ADDRESS}/update_default_shipping_address?_id=${address._id}`,
      {
        ...address,
        is_default: updatedStatus,
      },
    );
    return data;
  } catch (error) {
    console.error('Error updating default shipping address:', error);
  }
};

export const deleteShippingAddress = async (
  addressId: string,
): Promise<void> => {
  try {
    await axiosIntercreptor.delete(
      `${URL_SHIPPING_ADDRESS}/delete_shipping_address?_id=${addressId}`,
    );
  } catch (error) {
    console.error('Error deleting shipping address:', error);
  }
};

export const addShippingAddress = async (body: addShippingAddressBody) => {
  try {
    const data = await axiosIntercreptor.post<
      addShippingAddressBody,
      addShippingAddressReponse
    >(`${URL_SHIPPING_ADDRESS}/add_shipping_address`, body);
    return data;
  } catch (error) {
    console.error('Error adding address:', error);
  }
};
