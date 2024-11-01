export interface delivery_method {
    _id: string;
    name_delivery: string;
    delivery_fee: number
}

export interface getAllDeliveryMethodResponse extends Response {
    metadata: delivery_method[]
}

export interface getDetailDeliveryMethodResponse extends Response {
    metadata: delivery_method
}