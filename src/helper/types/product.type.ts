import {brandType} from './brand.type';
import {colorType} from './color.type';
import {sizeType} from './size.type';

export interface productResponse {
  _id: string;
  name_product: string;
  price: number;
  inventory_quantity: number;
  description: string;
  createdAt: string;
  averageRating: number;
  countReview: number;
  thumb: string;
  discount: number;
  name_brand: string;
  name_category: string;
  isFavorite: boolean;
}

export interface getAllProductsResponse extends Response {
  metadata: {
    products: Array<productResponse>;
  };
}

export interface getAllProductRequet {
  price: Array<number>;
  colors_id: Array<string>;
  sizes_id: Array<string>;
  rating: number;
  brands_id: Array<string>;
}

export interface filterResponse {
  colors: Array<colorType>;
  sizes: Array<sizeType>;
  brands: Array<brandType>;
  price: Array<{maxPrice: number; minPrice: number}>;
}

export interface getDataFilerResponse extends Response {
  metadata: {
    dataFilter: filterResponse;
  };
}
