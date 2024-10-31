import axiosIntercreptor from '../config/axiosIntercreptor';
import { ApiResponse, ShippingAddress } from '../types/shippingaddress.type';

const URL_SHIPPING_ADDRESS = 'shipping_address';

export const fetchShippingAddresses = async (user_id: string): Promise<ShippingAddress[]> => {
  try {
    const response: ApiResponse = await axiosIntercreptor.get(
      `${URL_SHIPPING_ADDRESS}/get_all_shipping_address?user_id=${user_id}`
    );
    return response.metadata; // Đảm bảo response.metadata là một mảng ShippingAddress
  } catch (error) {
    console.error('Error fetching shipping addresses:', error);
    throw error;
  }
};

export const updateDefaultShippingAddress = async (address: ShippingAddress): Promise<void> => {
  const updatedStatus = !address.is_default;
  try {
    await axiosIntercreptor.put(
      `${URL_SHIPPING_ADDRESS}/update_default_shipping_address?_id=${address._id}`,
      {
        ...address,
        is_default: updatedStatus,
      }
    );
  } catch (error) {
    console.error('Error updating default shipping address:', error);
    throw error;
  }
};

export const deleteShippingAddress = async (addressId: string): Promise<void> => {
  try {
    await axiosIntercreptor.delete(
      `${URL_SHIPPING_ADDRESS}/delete_shipping_address?_id=${addressId}`
    );
  } catch (error) {
    console.error('Error deleting shipping address:', error);
    throw error;
  }
};

export const addShippingAddress = async (addressData: ShippingAddress): Promise<ApiResponse> => {
  try {
    const response: ApiResponse = await axiosIntercreptor.post(
      `${URL_SHIPPING_ADDRESS}/add_shipping_address`,
      addressData
    );
    return response;
  } catch (error) {
    console.error('Error adding address:', error);
    throw error;
  }
};
