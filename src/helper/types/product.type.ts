import {brandType} from './brand.type';
import {colorType} from './color.type';
import {imageType} from './image.type';
import { media } from './media.type';
import {sizeType} from './size.type';

export interface colors_size_toProduct extends Response {
  metadata: {
    thumb: string;
    variant: {
      _id: null;
      quantity_default: number;
      price_min: number;
      sizes: Array<sizeType>;
      image_colors: Array<{
        _id: string;
        url: string;
        name_color: string;
        hex_color: string;
      }>;
      price_max: number;
    };
  };
}

export interface productResponse {
  _id: string;
  name_product: string;
  price_min: number;
  inventory_quantity: number;
  createdAt: string;
  averageRating: number;
  countReview: number;
  thumb: string;
  discount: number;
  name_brand: string;
  name_category: string;
  isFavorite: boolean;
}

export interface saleProductDetail {
  discount: number;
  time_end: string;
  name_sale: string;
  image_sale: string;
  _id: string
}

export interface productDetailResponse {
  _id: string;
  name_product: string;
  price: number;
  inventory_quantity: number;
  description: string;
  images_product: media[];
  category_id: string;
  createdAt: string;
  sizes: Array<sizeType>;
  colors: Array<colorType>;
  isFavorite: boolean;
  name_brand: string;
  name_category: string;
  averageRating: number;
  countReview: number;
  sales_active: saleProductDetail[];
  discount: number
}

export interface getDetailProductResponse extends Response {
  metadata: productDetailResponse;
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
