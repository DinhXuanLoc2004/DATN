import BottomSheet from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import CustomBottomSheet from '../../../../components/layouts/CustomBottomSheet';
import HeaderScreenAnimation from '../../../../components/layouts/HeaderScreenAnimation';
import ItemColumnComponent from '../../../../components/layouts/items/ItemColumnComponent';
import ItemRowComponent from '../../../../components/layouts/items/ItemRowComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {getCategories} from '../../../../helper/apis/category.api';
import {getAllProductAPI} from '../../../../helper/apis/product.api';
import {setColumnProductsCategory} from '../../../../helper/store/slices/app.slice';
import {
  store,
  useAppDispatch,
  useAppSelector,
} from '../../../../helper/store/store';
import {category} from '../../../../helper/types/category.type';
import {productResponse} from '../../../../helper/types/product.type';
import {handleSize} from '../../../../utils/handleSize';
import {StackParamsListCategory} from '../CategoriesStacks';
import {listSort, sort} from '../../../../models/listSort';
import {setSort} from '../../../../helper/store/slices/sort.slice';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';

type ProductsToCategoryScreenRouteProp = RouteProp<
  StackParamsListCategory,
  'ProductsToCategoryScreen'
>;

type stackProp = NativeStackNavigationProp<stackParamListMain, 'BottomTab'>;

const ProductsToCategoryScreen = ({
  route,
}: {
  route: ProductsToCategoryScreenRouteProp;
}) => {
  const dispath = useAppDispatch();
  const navigation = useNavigation<stackProp>();
  const {parent_id, name_category_parent} = route.params;
  const [categories, setcategories] = useState<Array<category>>([]);
  const [category_id_choose, setcategory_id_choose] = useState<string>('');
  const [products, setproducts] = useState<Array<productResponse>>([]);

  const isColumn = useAppSelector(state => state.app.layoutItem.columnProductsCategory);
  const sort = useAppSelector(state => state.sort.sort)

  const stateFilter = useAppSelector(state => state.sort.filter);
  const price = [stateFilter.price.min, stateFilter.price.max];
  const colors_id = stateFilter.colors;
  const sizes_id = stateFilter.sizes;
  const rating = stateFilter.rating;
  const brands_id = stateFilter.brands;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const {
    data: dataCategories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ['categoriesDepth3', parent_id],
    queryFn: getCategories,
  });

  const categoryAll: category = {
    _id: parent_id,
    name_category: 'All',
    parent_id: '',
    depth: 1,
    image_category: {
      url: '',
      public_id: '',
    },
  };

  useEffect(() => {
    if (
      dataCategories?.metadata.categories.length &&
      dataCategories.metadata.categories.length > 0
    ) {
      setcategories([categoryAll, ...dataCategories.metadata.categories]);
      setcategory_id_choose(categoryAll._id);
    }
  }, [dataCategories?.metadata.categories]);

  const body = useMemo(
    () => ({price, colors_id, sizes_id, rating, brands_id}),
    [price, colors_id, sizes_id, rating, brands_id],
  );

  const {data, isLoading, error} = useQuery({
    queryKey: ['getProductsToCate', category_id_choose, sort.value, body],
    queryFn: getAllProductAPI,
    enabled: !!category_id_choose,
  });

  useEffect(() => {
    if (data?.metadata.products) {
      setproducts(data.metadata.products);
    }
  }, [data?.metadata.products]);

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

  const bottomSheet = useRef<BottomSheet>(null);

  return (
    <ContainerComponent style={styles.container}>
      <HeaderScreenAnimation
        title={name_category_parent}
        translateY={translateY}
        translateX={translateX}
        scale={scale}
      />

      <Animated.View
        style={{
          transform: [
            {
              translateY: translateY,
            },
          ],
          backgroundColor: colors.White_Color,
        }}>
        {categories.length > 0 && (
          <SectionComponent flex={0} style={styles.containerListCategoriesItem}>
            <FlatList
              data={categories}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.itemCategory,
                    {
                      backgroundColor:
                        item._id === category_id_choose
                          ? colors.Primary_Color
                          : colors.Text_Color,
                    },
                  ]}
                  onPress={() => setcategory_id_choose(item._id)}>
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
              navigation.navigate('FilterScreen');
            }}>
            <RowComponent>
              <FontAwesome5 name="filter" size={20} color={colors.Text_Color} />
              <SpaceComponent width={7} />
              <TextComponent text="Filters" size={14} />
            </RowComponent>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              bottomSheet.current?.expand();
            }}>
            <RowComponent>
              <FontAwesome5
                name={
                  sort.value === 'price: 1'
                    ? 'sort-amount-up-alt'
                    : sort.value === 'price: -1'
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
              dispath(setColumnProductsCategory());
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
          data={products}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <SectionComponent flex={0}>
              {isColumn ? (
                <ItemColumnComponent
                  trademark={item.name_category}
                  name={item.name_product}
                  imageUrl={item.thumb}
                  createAt={item.createdAt}
                  price={item.price}
                  discount={item.discount}
                  stock={item.inventory_quantity}
                  star={item.averageRating}
                  reviewCount={item.countReview}
                  isFavorite={item.isFavorite}
                  style={styles.itemColumn}
                />
              ) : (
                <ItemRowComponent
                  trademark={item.name_category}
                  name={item.name_product}
                  img={item.thumb}
                  createAt={item.createdAt}
                  price={item.price}
                  discount={item.discount}
                  stock={item.inventory_quantity}
                  star={item.averageRating}
                  numberReviews={item.countReview}
                  isFavorite={item.isFavorite}
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

      <Portal>
        <CustomBottomSheet
          title="Sort by"
          bottomSheet={bottomSheet}
          snapPoint={[handleSize(250)]}
          content={
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
                    dispath(setSort(item));
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
          }
        />
      </Portal>
    </ContainerComponent>
  );
};

export default ProductsToCategoryScreen;

const styles = StyleSheet.create({
  itemSort: {
    width: '100%',
    height: handleSize(48),
    paddingLeft: handleSize(16),
    justifyContent: 'center',
  },
  contentBottomSheet: {
    justifyContent: 'flex-end',
    paddingVertical: handleSize(20),
  },
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
  containerFiler: {
    paddingHorizontal: handleSize(5),
    paddingVertical: handleSize(5),
    marginHorizontal: handleSize(16),
    borderRadius: handleSize(10),
  },
  containerListCategoriesItem: {
    paddingLeft: handleSize(16),
  },
  itemCategory: {
    width: handleSize(100),
    height: handleSize(30),
    borderRadius: handleSize(29),
    backgroundColor: colors.Text_Color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHeader: {
    paddingHorizontal: handleSize(16),
  },
  header: {
    paddingVertical: handleSize(11),
    width: '100%',
    backgroundColor: colors.White_Color,
  },
  container: {paddingHorizontal: 0},
});
