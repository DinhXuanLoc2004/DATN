import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {productResponse} from '../../../helper/types/product.type';
import {handleSize} from '../../../utils/handleSize';
import ItemRowOrColumn from '../items/ItemRowOrColumn';
import {useAppSelector} from '../../../helper/store/store';

interface Props {
  data: productResponse[];
  translateY: Animated.AnimatedInterpolation<string | number>;
  contentOffsetY: Animated.Value;
  navigation: any;
  isItemFavorite?: boolean;
}

const ListProductsAnimation: FC<Props> = ({
  data,
  contentOffsetY,
  translateY,
  navigation,
  isItemFavorite
}) => {
  const isColumn = useAppSelector(
    state => state.app.layoutItem.columnProductsCategory,
  );
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: translateY,
          },
        ],
        flex: 0,
        paddingBottom: handleSize(150),
      }}>
      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: contentOffsetY,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews={true}
        style={styles.listProducts}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <ItemRowOrColumn
            item={item}
            navigation={navigation}
            isColumn={isColumn}
            isItemFavorite={isItemFavorite}
          />
        )}
        numColumns={isColumn ? 2 : 1}
        key={isColumn ? 2 : 1}
        columnWrapperStyle={isColumn ? styles.row : null}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
};

export default ListProductsAnimation;

const styles = StyleSheet.create({
  listProducts: {
    paddingHorizontal: handleSize(16),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: handleSize(10),
  },
});
