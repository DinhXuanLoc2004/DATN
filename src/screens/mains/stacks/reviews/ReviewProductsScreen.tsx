import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {globalStyles} from '../../../../styles/globalStyle';
import {useQuery} from '@tanstack/react-query';
import {getReviewsForOrderQueryKey} from '../../../../constants/queryKeys';
import {getReviewsOrderAPI} from '../../../../helper/apis/order.api';
import {reviews_order} from '../../../../helper/types/order.type';
import ItemOrderReview from '../../../../components/layouts/items/ItemOrderReview';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';

type routeProp = RouteProp<stackParamListMain, 'ReviewProductsScreen'>;

const ReviewProductsScreen = ({route}: {route: routeProp}) => {
  const {order_id} = route.params;

  const [product_order_reviews, setproduct_order_reviews] = useState<
    reviews_order[]
  >([]);

  const {data} = useQuery({
    queryKey: [getReviewsForOrderQueryKey, order_id],
    queryFn: getReviewsOrderAPI,
  });

  useEffect(() => {
    if (data?.metadata) {
      setproduct_order_reviews(data.metadata);
    }
  }, [data?.metadata]);

  return (
    <ContainerComponent
      isHeader
      back
      styleHeader={globalStyles.headerElevation}
      title="Review products">
      <SpaceComponent height={10} />
      <SectionComponent>
        <FlatList
          data={product_order_reviews}
          keyExtractor={item => item.product_order_id}
          renderItem={({item}) => <ItemOrderReview item={item} />}
          ItemSeparatorComponent={() => <SpaceComponent height={10} />}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default ReviewProductsScreen;

const styles = StyleSheet.create({});
