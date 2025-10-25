import {createQueryString} from '../../utils/handleString';
import axiosIntercreptor from '../config/axiosIntercreptor';
import {
  addReviewResponse,
  bodyAddReview,
  getAllReviewForProductResponse,
  propsAddReviewAPI,
} from '../types/review.type';

const URL_REVIEW = 'review';

const getAllReviewForProduct = async (product_id: string) => {
  try {
    const queryString = createQueryString({product_id});
    const data = await axiosIntercreptor.get<
      undefined,
      getAllReviewForProductResponse
    >(`${URL_REVIEW}/get_review_for_product/?${queryString}`);
    return data;
  } catch (error) {
    console.log('error get all review for product', error);
  }
};

const addReviewAPI = async (
  props: propsAddReviewAPI,
  set_progress: (val: number) => void,
) => {
  try {
    const formDatas = new FormData();

    for (let index = 0; index < props.images.length; index++) {
      const element = props.images[index];
      formDatas.append('images', {
        uri: element.uri,
        type: element.type,
        name: element.fileName,
      });
    }

    formDatas.append('rating', props.rating.toString());
    formDatas.append('content', props.content);
    formDatas.append('product_order_id', props.product_order_id);
    formDatas.append('user_id', props.user_id);

    const data = await axiosIntercreptor.post<any, addReviewResponse>(
      `${URL_REVIEW}/add_review`,
      formDatas,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress(progressEvent) {
          set_progress(progressEvent.progress ?? 0);
        },
      },
    );
    return data;
  } catch (error) {
    console.log('Error add review api:: ', error);
  }
};

export {addReviewAPI, getAllReviewForProduct};
