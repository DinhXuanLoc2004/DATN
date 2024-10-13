export interface bodyAddToCart {
  product_variant_id: string;
  quantity: number;
  user_id: string;
}

export interface cart {
  _id: string;
  product_variant_id: string;
  quantity: number;
  user_id: string;
}

export interface addToCartResponse extends Response {
  metadata: cart;
}

export interface item_cart {
  _id: string;
  quantity: number;
  name_product: string;
  inventory: number;
  price: number;
  thumb: string;
  name_color: string;
  hex_color: string;
  size: string;
  create_at: string;
}

export interface getAllCartResponse {
  metadata: Array<item_cart>;
}

export interface bodyChangeQuantityCart {
  cart_id: string;
  value: number;
}

export interface changeQuantityCartResponse extends Response {
  metadata: cart;
}

export interface cart_delet {
    _id: string
}

export interface cartDeleteResponse extends Response {
    metadata: cart_delet
}
