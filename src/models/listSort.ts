export type valueSort = | 'createdAt: -1'
| 'price_min: 1'
| 'price_min: -1'
| 'total_orders: -1'
export interface sort {
  title: string;
  value: valueSort;
}

export const listSort: Array<sort> = [
  {
    title: 'Newest',
    value: 'createdAt: -1',
  },
  {
    title: 'Price: lowest to height',
    value: 'price_min: 1',
  },
  {
    title: 'Price: heightest to low',
    value: 'price_min: -1',
  },
  {
    title: 'Popular products',
    value: 'total_orders: -1',
  },
];
