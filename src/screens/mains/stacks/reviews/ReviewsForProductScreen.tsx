import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import ListReviews from '../../../../components/layouts/lists/ListReviews';
import RatingComponent from '../../../../components/layouts/RatingComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import { colors } from '../../../../constants/colors';
import { fontFamilies } from '../../../../constants/fontFamilies';
import { getAllReviewForProduct } from '../../../../helper/apis/review.api';
import { review } from '../../../../helper/types/review.type';
import { stackParamListMain } from '../../../../navigation/StackMainNavigation';
import { handleSize } from '../../../../utils/handleSize';

type routeProp = RouteProp<stackParamListMain, 'ReviewsForProductScreen'>;

const ReviewsForProductScreen = ({route}: {route: routeProp}) => {
  const {product_id} = route.params;
  const [reviews, setreviews] = useState<review[]>([]);
  const [avgRating, setavgRating] = useState<number>(0);
  const [count5Rating, setcount5Rating] = useState(0);
  const [count4Rating, setcount4Rating] = useState(0);
  const [count3Rating, setcount3Rating] = useState(0);
  const [count2Rating, setcount2Rating] = useState(0);
  const [count1Rating, setcount1Rating] = useState(0);
  const [is_loading, setis_loading] = useState(false);

  const calculateAverageRating = (reviews: review[]): number => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const setReviews = async () => {
    setis_loading(true);
    const data = await getAllReviewForProduct(product_id);
    if (data?.metadata) {
      console.log(data.metadata);
      setreviews(data.metadata);
      const averageRating = calculateAverageRating(data.metadata);
      setavgRating(Number(averageRating.toFixed(2)));
      setcount5Rating(data.metadata.filter(item => item.rating === 5).length);
      setcount4Rating(data.metadata.filter(item => item.rating === 4).length);
      setcount3Rating(data.metadata.filter(item => item.rating === 3).length);
      setcount2Rating(data.metadata.filter(item => item.rating === 2).length);
      setcount1Rating(data.metadata.filter(item => item.rating === 1).length);
    }
    setis_loading(false);
  };

  useEffect(() => {
    setReviews();
  }, []);

  if (is_loading)
    return (
      <SectionComponent
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.Primary_Color} />
      </SectionComponent>
    );

  return (
    <ContainerComponent isScroll isHeader back>
      <TextComponent text="Rating&Reviews" size={34} font={fontFamilies.bold} />
      <SpaceComponent height={30} />
      <RatingComponent
        avegare_star={avgRating}
        arr_star={[
          count5Rating,
          count4Rating,
          count3Rating,
          count2Rating,
          count1Rating,
        ]}
        sumRating={reviews.length}
      />
      <SpaceComponent height={10} />
      <ListReviews reviews={reviews} />
      <SpaceComponent height={20}/>
    </ContainerComponent>
  );
};

export default ReviewsForProductScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: handleSize(16),
    flex: 1,
  },
});
