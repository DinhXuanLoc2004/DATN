export interface favorite {
  _id: string;
  name_product: string;
  thumb: string;
  name_category: string;
  name_brand: string;
  category_id: string;
  price_min: number;
  inventory: number;
  createdAt: string;
  product_id: string
}

export interface getAllFavoritesResponse extends Response {
    metadata: favorite[]
}

export interface categoryIdsResponse {
  category_id: string;
  name_category: string;
}

export interface getCategoryIdsToFavoritesResponse extends Response {
  metadata: categoryIdsResponse[];
}

export interface addFavoriteBody {
  user_id: string;
  product_id: string;
}

export interface addFavoriteResponse extends Response {
  metadata: boolean;
}
