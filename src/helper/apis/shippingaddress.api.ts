import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  addShippingAddressBody,
  addShippingAddressReponse,
  deleteShippingAddressResponse,
  get_all_province_response,
  get_districts_response,
  get_wards_response,
  getAllShippingAddressResponse,
  getDeliveryFeeResponse,
  getShippingAddressDefaultResponse,
  getShippingAddressDetailResponse,
  updateShippingAddressBody,
  updateShippingAddressResponse,
  updateStatusDefaultShippingAddressResponse,
} from '../types/shippingaddress.type';

const URL_SHIPPING_ADDRESS = 'shipping_address';

export const getDeliveryFeeAPI = async ({
  to_district_id,
  to_ward_code,
}: {
  to_district_id: number;
  to_ward_code: string;
}) => {
  try {
    const queryString = createQueryString({to_district_id: to_district_id.toString(), to_ward_code});
    const data = axiosIntercreptor.get<undefined, getDeliveryFeeResponse>(
      `${URL_SHIPPING_ADDRESS}/get_delivery_fee/?${queryString}`,
    );
    return data
  } catch (error) {
    console.log('Error get delivery fee:: ', error);
  }
};

export const getWardAPI = async (district_id: number) => {
  try {
    const queryString = createQueryString({
      district_id: district_id.toString(),
    });
    const data = await axiosIntercreptor.get<undefined, get_wards_response>(
      `${URL_SHIPPING_ADDRESS}/get_wards/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error get wards:: ', error);
  }
};

export const getDistrictsAPI = async (province_id: number) => {
  try {
    const queryString = createQueryString({
      province_id: province_id.toString(),
    });
    const data = await axiosIntercreptor.get<undefined, get_districts_response>(
      `${URL_SHIPPING_ADDRESS}/get_districts/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.log('Error get districts:: ', error);
  }
};

export const getAllProviceAPI = async () => {
  try {
    const data = await axiosIntercreptor.get<
      undefined,
      get_all_province_response
    >(`${URL_SHIPPING_ADDRESS}/get_all_province`);
    return data;
  } catch (error) {
    console.log('Error get all province:: ', error);
  }
};

export const getShippingAddressDefaultAPI = async (user_id: string) => {
  try {
    const queryString = createQueryString({user_id});
    const data = await axiosIntercreptor.get<
      undefined,
      getShippingAddressDefaultResponse
    >(`${URL_SHIPPING_ADDRESS}/get_default_shipping_address/?${queryString}`);
    return data;
  } catch (error) {
    console.log('Error get default shipping address!');
  }
};

export const getShippingAddressDetailAPI = async (_id: string) => {
  try {
    const queryString = createQueryString({_id});
    const data = await axiosIntercreptor.get<
      undefined,
      getShippingAddressDetailResponse
    >(`${URL_SHIPPING_ADDRESS}/get_detail_shipping_address/?${queryString}`);
    return data;
  } catch (error) {
    console.log('Error get shipping address detail:: ', error);
  }
};

export const fetchShippingAddresses = async ({
  queryKey,
}: {
  queryKey: string[];
}) => {
  try {
    const [, user_id] = queryKey;
    const queryString = createQueryString({user_id});
    const response = await axiosIntercreptor.get<
      undefined,
      getAllShippingAddressResponse
    >(`${URL_SHIPPING_ADDRESS}/get_all_shipping_address/?${queryString}`);
    return response;
  } catch (error) {
    console.error('Error fetching shipping addresses:', error);
  }
};

export const updateShippingAddressAPI = async (
  _id: string,
  body: updateShippingAddressBody,
) => {
  try {
    const queryString = createQueryString({_id});
    const data = await axiosIntercreptor.put<
      updateShippingAddressBody,
      updateShippingAddressResponse
    >(`${URL_SHIPPING_ADDRESS}/update_shipping_address/?${queryString}`, body);
    return data
  } catch (error) {
    console.log('Error update shipping address:: ', error);
  }
};

export const updateDefaultShippingAddress = async (_id: string) => {
  try {
    const queryString = createQueryString({_id});
    const data = await axiosIntercreptor.put<
      undefined,
      updateStatusDefaultShippingAddressResponse
    >(
      `${URL_SHIPPING_ADDRESS}/update_default_shipping_address/?${queryString}`,
    );
    return data;
  } catch (error) {
    console.error('Error updating default shipping address:', error);
  }
};

export const deleteShippingAddressAPI = async (addressId: string) => {
  try {
    const queryString = createQueryString({_id: addressId});
    return await axiosIntercreptor.delete<
      undefined,
      deleteShippingAddressResponse
    >(`${URL_SHIPPING_ADDRESS}/delete_shipping_address/?${queryString}`);
  } catch (error) {
    console.error('Error deleting shipping address:', error);
  }
};

export const addShippingAddressAPI = async (body: addShippingAddressBody) => {
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
