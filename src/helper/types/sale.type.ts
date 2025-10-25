export interface productSale {
  _id: string;
  name_product: string;
  price_min: number;
  inventory: number;
  name_category: string;
  name_brand: string;
  thumb: string;
  category_id: string;
  discount: number;
  isFavorite: boolean;
  createdAt: string;
  averageRating: number;
  countReview: number;
}

export interface getProductsSaleResponse extends Response {
  metadata: productSale[]
}

export interface categorySale {
  category_id: string;
  name_category: string;
}

export interface getCategoriesSale extends Response {
  metadata: categorySale[];
}

export interface sale {
  _id: string;
  discount: number;
  time_start: string;
  time_end: string;
  name_sale: string;
  thumb: string;
}

export interface getSalesActive extends Response {
  metadata: sale[];
}
