export interface sale {
  _id: string;
  discount: number;
  time_start: string;
  time_end: string;
  name_sale: string;
  thumb: string
}

export interface getSalesActive extends Response {
    metadata: sale[]
}
