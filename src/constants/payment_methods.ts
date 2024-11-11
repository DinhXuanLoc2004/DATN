import {colors} from './colors';

export type payment_name = 'COD' | 'Zalo Pay' | 'PayPal'

interface payment_method {
  payment_name: payment_name;
  thum_payment: string;
  color_payment: string;
}

export const payment_methods: payment_method[] = [
  {
    payment_name: 'COD',
    thum_payment:
      'https://res.cloudinary.com/domzhzpk5/image/upload/v1730304501/qvpt7pbf5mamcau5a4go.jpg',
    color_payment: colors.Primary_Color,
  },
  {
    payment_name: 'Zalo Pay',
    thum_payment:
      'https://cdn.prod.website-files.com/5fb85f262823b4390bcfe076/66965d8419182b6ff385a01f_zalopay_logo_preview.webp',
    color_payment: '#0068FF',
  },
  {
    payment_name: 'PayPal',
    thum_payment:
      'https://kaxmedia.com/cdn-cgi/image/f=webp,q=86,g=auto,w=600,h=465/https://objects.kaxmedia.com/auto/o/174240/15fe119533.png',
    color_payment: '#00457C',
  },
];
