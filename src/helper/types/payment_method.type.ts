import { imageType } from "./image.type";
import { Response } from "./response.type";

export interface payment_method {
    _id: string;
    name_payment: string;
    image_payment: imageType;
    background_color: string
}

export interface getAllPaymentMethodResponse extends Response {
  metadata: payment_method[]
}
