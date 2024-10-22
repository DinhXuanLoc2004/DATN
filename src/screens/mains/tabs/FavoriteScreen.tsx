import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import HeaderScreenAnimation from '../../../components/layouts/HeaderScreenAnimation';
import {useQuery} from '@tanstack/react-query';
import {useAppDispatch, useAppSelector} from '../../../helper/store/store';
import {
  getAllFavoritesAPI,
  getCategoryIdsToFavoritesAPI,
} from '../../../helper/apis/favorite.api';
import {colors} from '../../../constants/colors';
import SectionComponent from '../../../components/layouts/SectionComponent';
import {FlatList} from 'react-native-gesture-handler';
import {BottomSheetModal, TouchableOpacity} from '@gorhom/bottom-sheet';
import {
  categoryIdsResponse,
  favorite,
} from '../../../helper/types/favorite.type';
import TextComponent from '../../../components/texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {setColumnProductsCategory} from '../../../helper/store/slices/app.slice';
import LinearGradient from 'react-native-linear-gradient';
import {handleSize} from '../../../utils/handleSize';
import CustomBottomSheet from '../../../components/layouts/bottom_sheets/CustomBottomSheet';
import {listSort} from '../../../models/listSort';
import {setSort} from '../../../helper/store/slices/sort.slice';
import ItemColumnComponent from '../../../components/layouts/items/ItemColumnComponent';
import ItemRowComponent from '../../../components/layouts/items/ItemRowComponent';
import BottomSheetAddToCart from '../../../components/layouts/bottom_sheets/BottomSheetAddToCart';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import {
  getAllFavoritesQueryKey,
  getCategoryIdsToFavoritesQueryKey,
} from '../../../constants/queryKeys';

type stackProps = StackNavigationProp<stackParamListMain, 'BottomTab'>;

const FavoriteScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [categoryIds, setcategoryIds] = useState<categoryIdsResponse[]>([]);
  const [category_id_choose, setcategory_id_choose] = useState<string>('');
  const [product_id_choose, setproduct_id_choose] = useState<string>('');
  const [favorites, setfavorites] = useState<favorite[]>([]);
  const isColumn = useAppSelector(
    state => state.app.layoutItem.columnProductsCategory,
  );
  const sort = useAppSelector(state => state.sort.sort);

  const navigation = useNavigation<stackProps>();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -65],
    extrapolate: 'clamp',
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 30],
    extrapolate: 'clamp',
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.55],
    extrapolate: 'clamp',
  });

  const user_id = useAppSelector(state => state.auth.user.userId);

  const {data: dataCategoryIds} = useQuery({
    queryKey: [getCategoryIdsToFavoritesQueryKey, user_id],
    queryFn: getCategoryIdsToFavoritesAPI,
  });

  useEffect(() => {
    if (dataCategoryIds?.metadata && dataCategoryIds.metadata.length > 0) {
      setcategoryIds([
        {category_id: '', name_category: 'All'},
        ...dataCategoryIds.metadata,
      ]);
    } else {
      setcategoryIds([]);
    }
  }, [dataCategoryIds?.metadata]);

  const dispatch = useAppDispatch();

  const bottomSheet = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheet.current?.present();
  }, []);

  const {data: dataFavorites} = useQuery({
    queryKey: [getAllFavoritesQueryKey, user_id, category_id_choose],
    queryFn: getAllFavoritesAPI,
  });

  useEffect(() => {
    if (dataFavorites?.metadata) {
      setfavorites(dataFavorites.metadata);
    }
  }, [dataFavorites?.metadata]);

  const bottomSheetAddToCart = useRef<BottomSheetModal>(null);

  const handleBottomSheetAddToCart = useCallback((product_id: string) => {
    setproduct_id_choose(product_id);
    bottomSheetAddToCart.current?.present();
  }, []);

  return (
    <ContainerComponent style={styles.container}>
      <HeaderScreenAnimation
        title="Favorites"
        translateX={translateX}
        translateY={translateY}
        scale={scale}
        isBack={false}
      />
      {categoryIds && (
        <Animated.View
          style={{
            transform: [
              {
                translateY: translateY,
              },
            ],
            backgroundColor: colors.White_Color,
          }}>
          {categoryIds.length > 0 && (
            <SectionComponent
              flex={0}
              style={styles.containerListCategoriesItem}>
              <FlatList
                data={categoryIds}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.itemCategory,
                      {
                        backgroundColor:
                          item.category_id === category_id_choose
                            ? colors.Primary_Color
                            : colors.Text_Color,
                      },
                    ]}
                    onPress={() => setcategory_id_choose(item.category_id)}>
                    <TextComponent
                      text={item.name_category}
                      size={14}
                      color={colors.White_Color}
                      font={fontFamilies.medium}
                    />
                  </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <SpaceComponent width={7} />}
              />
            </SectionComponent>
          )}
          <SpaceComponent height={18} />
          <RowComponent style={styles.containerFiler}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('FilterScreen');
              }}>
              <RowComponent>
                <FontAwesome5
                  name="filter"
                  size={20}
                  color={colors.Text_Color}
                />
                <SpaceComponent width={7} />
                <TextComponent text="Filters" size={14} />
              </RowComponent>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePresentModalPress}>
              <RowComponent>
                <FontAwesome5
                  name={
                    sort.value === 'price_min: 1'
                      ? 'sort-amount-up-alt'
                      : sort.value === 'price_min: -1'
                      ? 'sort-amount-down-alt'
                      : 'newspaper'
                  }
                  size={20}
                  color={colors.Text_Color}
                />
                <SpaceComponent width={7} />
                <TextComponent text={sort.title} size={14} />
              </RowComponent>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                dispatch(setColumnProductsCategory());
              }}>
              <FontAwesome5
                name={isColumn ? 'th-list' : 'th-large'}
                size={20}
                color={colors.Text_Color}
              />
            </TouchableOpacity>
          </RowComponent>
          <LinearGradient
            colors={[colors.Black_Color_RGBA, colors.Transperen_Color]}
            style={{width: '100%', height: 5}}
          />
        </Animated.View>
      )}
      <SpaceComponent height={10} />

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
                    y: animatedValue,
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
          data={favorites}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <SectionComponent flex={0}>
              {isColumn ? (
                <ItemColumnComponent
                  _id={item.product_id}
                  onPress={() => {
                    navigation.navigate('DetailProductScreen', {
                      product_id: item.product_id,
                    });
                  }}
                  trademark={item.name_category}
                  name={item.name_product}
                  imageUrl={item.thumb}
                  createAt={item.createdAt}
                  price={item.price_min}
                  discount={0}
                  stock={item.inventory}
                  star={0}
                  reviewCount={0}
                  isItemFavorite
                  style={styles.itemColumn}
                  onPressBag={() => handleBottomSheetAddToCart(item.product_id)}
                />
              ) : (
                <ItemRowComponent
                  onPress={() => {
                    navigation.navigate('DetailProductScreen', {
                      product_id: item.product_id,
                    });
                  }}
                  trademark={item.name_category}
                  name={item.name_product}
                  img={item.thumb}
                  createAt={item.createdAt}
                  price={item.price_min}
                  discount={0}
                  stock={item.inventory}
                  star={0}
                  numberReviews={0}
                  isItemFavorite
                  _id={item.product_id}
                  onPressBag={() => handleBottomSheetAddToCart(item.product_id)}
                />
              )}
              <SpaceComponent height={26} />
            </SectionComponent>
          )}
          numColumns={isColumn ? 2 : 1}
          key={isColumn ? 2 : 1}
          columnWrapperStyle={isColumn ? styles.row : null}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>

      <BottomSheetAddToCart
        bottomSheet={bottomSheetAddToCart}
        product_id={product_id_choose}
      />

      <CustomBottomSheet
        title="Sort by"
        bottomSheet={bottomSheet}
        snapPoint={[100, handleSize(250)]}
        content={
          <SectionComponent flex={1}>
            <SectionComponent style={styles.contentBottomSheet}>
              {listSort.map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  style={[
                    styles.itemSort,
                    {
                      backgroundColor:
                        item.value === sort.value
                          ? colors.Primary_Color
                          : colors.White_Color,
                    },
                  ]}
                  onPress={() => {
                    dispatch(setSort(item));
                    bottomSheet.current?.close();
                  }}>
                  <TextComponent
                    text={item.title}
                    font={
                      item.value === sort.value
                        ? fontFamilies.semiBold
                        : fontFamilies.regular
                    }
                    color={
                      item.value === sort.value
                        ? colors.White_Color
                        : colors.Text_Color
                    }
                  />
                </TouchableOpacity>
              ))}
            </SectionComponent>
          </SectionComponent>
        }
      />
    </ContainerComponent>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: handleSize(26),
  },
  itemColumn: {
    width: handleSize(164),
    height: handleSize(260),
  },
  listProducts: {
    paddingHorizontal: handleSize(16),
  },
  itemSort: {
    width: '100%',
    height: handleSize(48),
    paddingLeft: handleSize(16),
    justifyContent: 'center',
  },
  contentBottomSheet: {
    justifyContent: 'flex-start',
    paddingVertical: handleSize(20),
  },
  containerFiler: {
    paddingHorizontal: handleSize(5),
    paddingVertical: handleSize(5),
    marginHorizontal: handleSize(16),
    borderRadius: handleSize(10),
  },
  itemCategory: {
    width: handleSize(100),
    height: handleSize(30),
    borderRadius: handleSize(29),
    backgroundColor: colors.Text_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerListCategoriesItem: {
    paddingLeft: handleSize(16),
  },
  container: {
    paddingHorizontal: 0,
  },
});
