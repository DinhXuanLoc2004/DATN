import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  layoutItem: {
    columnProductsCategory: false,
    columnProductsFavorite: false,
  }
};

const settingAppSlice = createSlice({
  name: 'settingApp',
  initialState,
  reducers: {
    setColumnProductsCategory: state => {
      state.layoutItem.columnProductsCategory =
        !state.layoutItem.columnProductsCategory;
    },
  },
});

export const settingAppReducer = settingAppSlice.reducer;
export const {setColumnProductsCategory} = settingAppSlice.actions;
