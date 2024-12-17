import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SectionComponent from '../SectionComponent';
import {review} from '../../../helper/types/review.type';
import ItemReviewComponent from '../items/ItemReviewComponent';
import SpaceComponent from '../SpaceComponent';

interface Props {
  reviews: review[];
  scrollEnabled?: boolean
}

const ListReviews: FC<Props> = ({reviews, scrollEnabled = false}) => {
  return (
    <SectionComponent>
      <FlatList
        data={reviews}
        keyExtractor={(item, key) => item._id}
        renderItem={({item}) => (
          <ItemReviewComponent review={item}/>
        )}
        scrollEnabled={scrollEnabled}
        ItemSeparatorComponent={() => <SpaceComponent height={10}/>}
      />
    </SectionComponent>
  );
};

export default ListReviews;

const styles = StyleSheet.create({});
