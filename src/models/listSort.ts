export interface sort {
  title: string;
  value: string;
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
];
