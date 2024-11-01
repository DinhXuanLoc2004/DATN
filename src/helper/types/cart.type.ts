export interface product_order_sale {
  product_sale_id: string;
  discount: number;
  name_sale: string;
  time_end: string;
  thumb_sale: string
}

export interface cartCheck {
  cart_id: string;
  product_variant_id: string;
  quantity: number;
  price: number;
  thumb: string;
  size: string;
  name_color: string;
  hex_color: string;
  name_product: string;
  name_category: string;
  name_brand: string;
  product_sales: product_order_sale[];
  total_discount: number
}

export interface getCartChecksResponse extends Response {
  metadata: cartCheck[]
}

export interface getLengthCartResponse extends Response {
  metadata: number;
}

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
  isFavorite: boolean;
  product_id: string;
  product_variant_id: string;
}

export interface getAllCartResponse extends Response {
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
  _id: string;
}

export interface cartDeleteResponse extends Response {
  metadata: cart_delet;
}
