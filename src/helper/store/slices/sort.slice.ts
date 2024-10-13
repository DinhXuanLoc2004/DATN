import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {listSort} from '../../../models/listSort';

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
      state.filter.colors = ['']
      state.filter.sizes = ['']
      state.filter.rating = 0
      state.filter.brands = ['']
    },
  },
});

export const sortReducer = sortSlice.reducer;
export const {setSort, setFilter, removeFilter} = sortSlice.actions;
