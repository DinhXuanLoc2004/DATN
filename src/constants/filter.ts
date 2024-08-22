import { colors } from './colors';

export interface Props_Select {
  arr_select: string[];
  set_arr_select: (arr_selected: string[]) => void;
}

export const colors_select = [
  colors.Text_Color,
  colors.Gray_Light_Color,
  colors.Primary_Color,
  colors.Gray_Dark_Color,
  colors.Yellow_Light_Color,
  colors.Blue_Dark_Color,
];

export const sizes_select = ['XS', 'S', 'M', 'L', 'XL'];

export const categories_select = ['All', 'Women', 'Men', 'Boys', 'Girls'];
