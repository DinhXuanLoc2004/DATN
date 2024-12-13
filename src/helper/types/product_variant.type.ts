export interface product_variant {
  _id: string;
  product_id: string;
  image_product_color_id: string;
  size_id: string;
  quantity: number;
  price: number;
}

export interface findProductVariantReponse extends Response {
  metadata: {
    variant: product_variant | null;
    max_quantity: number
  };
}

export interface findSizeProductVariantResponse extends Response {
  metadata: string[]
}

export interface findImageColorProductVariantResponse extends Response {
  metadata: string[]
}
