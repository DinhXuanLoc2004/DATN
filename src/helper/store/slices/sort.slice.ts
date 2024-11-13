import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {listSort} from '../../../models/listSort';
import {district, province, shipping_address_chooose, ward} from '../../types/shippingaddress.type';

interface actionSetSort {
  title: string;
  value: string;
}

export interface actionSetFilter {
  price: {
    min: number;
    max: number;
  };
  colors: Array<string>;
  sizes: Array<string>;
  rating: number;
  brands: Array<string>;
}

export interface actionSetDeliveryMethodDefault {
  delivery_id: string;
}

const initSort = {
  title: listSort[1].title,
  value: listSort[1].value,
};

const initialState = {
  sort: initSort,
  filter: {
    price: {
      min: 0,
      max: 0,
    },
    colors: [''],
    sizes: [''],
    rating: 0,
    brands: [''],
  },
  isDiaLogLogin: false,
  province: {
    province_id: 0,
    province_name: '',
  },
  district: {
    district_id: 0,
    district_name: '',
  },
  ward: {
    ward_code: '',
    ward_name: '',
  },
  address_choose: {
    full_name: '',
    phone: 0,
    province_name: '',
    province_id: 0,
    district_name: '',
    district_id: 0,
    ward_name: '',
    ward_code: '',
    specific_address: '',
  },
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<actionSetSort>) => {
      state.sort.title = action.payload.title;
      state.sort.value = action.payload.value;
    },
    setFilter: (state, action: PayloadAction<actionSetFilter>) => {
      state.filter.price.min = action.payload.price.min;
      state.filter.price.max = action.payload.price.max;
      state.filter.colors = action.payload.colors;
      state.filter.sizes = action.payload.sizes;
      state.filter.rating = action.payload.rating;
      state.filter.brands = action.payload.brands;
    },
    removeFilter: state => {
      state.filter.price.min = 0;
      state.filter.price.max = 0;
      state.filter.colors = [''];
      state.filter.sizes = [''];
      state.filter.rating = 0;
      state.filter.brands = [''];
    },
    setDiaLogLogin: (state, action) => {
      state.isDiaLogLogin = action.payload;
    },
    set_province: (state, action: PayloadAction<province>) => {
      if (state.province.province_id !== action.payload.ProvinceID) {
        state.district.district_id = 0;
        state.district.district_name = '';
        state.ward.ward_code = '';
        state.ward.ward_name = '';
      }
      state.province.province_id = action.payload.ProvinceID;
      state.province.province_name = action.payload.ProvinceName;
    },
    set_district: (state, action: PayloadAction<district>) => {
      if (state.district.district_id !== action.payload.DistrictID) {
        state.ward.ward_code = '';
        state.ward.ward_name = '';
      }
      state.district.district_id = action.payload.DistrictID;
      state.district.district_name = action.payload.DistrictName;
    },
    set_ward: (stata, action: PayloadAction<ward>) => {
      stata.ward.ward_code = action.payload.WardCode;
      stata.ward.ward_name = action.payload.WardName;
    },
    remove_select_address: state => {
      state.province.province_id = 0;
      state.province.province_name = '';
      state.district.district_id = 0;
      state.district.district_name = '';
      state.ward.ward_code = '';
      state.ward.ward_name = '';
    },
    set_address_choose: (state, action: PayloadAction<shipping_address_chooose>) => {
      state.address_choose.full_name = action.payload.full_name
      state.address_choose.phone = action.payload.phone
      state.address_choose.province_id = action.payload.province_id
      state.address_choose.province_name = action.payload.province_name
      state.address_choose.district_id = action.payload.district_id
      state.address_choose.district_name = action.payload.district_name
      state.address_choose.ward_code = action.payload.ward_code
      state.address_choose.ward_name = action.payload.ward_name
      state.address_choose.specific_address = action.payload.specific_address
    },
    remove_address_choose: (state) => {
      state.address_choose.full_name = ''
      state.address_choose.phone = 0
      state.address_choose.province_id = 0
      state.address_choose.province_name = ''
      state.address_choose.district_id = 0
      state.address_choose.district_name = ''
      state.address_choose.ward_code = ''
      state.address_choose.ward_name = ''
      state.address_choose.specific_address = ''
    }
  },
});

export const sortReducer = sortSlice.reducer;
export const {
  setSort,
  setFilter,
  removeFilter,
  setDiaLogLogin,
  set_province,
  set_district,
  set_ward,
  remove_select_address,
  set_address_choose,
  remove_address_choose
} = sortSlice.actions;
