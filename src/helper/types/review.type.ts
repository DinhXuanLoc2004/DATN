import {Asset} from 'react-native-image-picker';
import { imageType } from './image.type';
import { media } from './media.type';
import { Response } from './response.type';

export interface addReviewResponse extends Response {
    metadata: addReviewMetadata
}

interface addReviewMetadata extends Omit<bodyAddReview, 'images'>{
    images: media[]
}

export interface propsAddReviewAPI extends Omit<bodyAddReview, 'images'> {
    images: Asset[]
}

export interface bodyAddReview {
  rating: number;
  content: string;
  images: FormData;
  product_order_id: string;
  user_id: string
}
