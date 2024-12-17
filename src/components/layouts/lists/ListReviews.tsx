import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useRef} from 'react';
import SectionComponent from '../SectionComponent';
import {review} from '../../../helper/types/review.type';
import ItemReviewComponent from '../items/ItemReviewComponent';
import SpaceComponent from '../SpaceComponent';

interface Props {
  reviews: review[];
  review_id?: string;
  scrollEnabled?: boolean;
}

const ListReviews: FC<Props> = ({
  reviews,
  scrollEnabled = false,
  review_id,
}) => {
  const flatListRef = useRef<FlatList<review>>(null);

  React.useEffect(() => {
    if (review_id && flatListRef.current) {
      const index = reviews.findIndex(review => review._id === review_id);
      if (index !== -1) {
        flatListRef.current.scrollToIndex({animated: true, index});
      }
    }
  }, [review_id, reviews]);

  return (
    <SectionComponent>
      <FlatList
        data={reviews}
        keyExtractor={(item, key) => item._id}
        renderItem={({item}) => <ItemReviewComponent review={item} />}
        scrollEnabled={scrollEnabled}
        ItemSeparatorComponent={() => <SpaceComponent height={10} />}
      />
    </SectionComponent>
  );
};

export default ListReviews;

const styles = StyleSheet.create({});
