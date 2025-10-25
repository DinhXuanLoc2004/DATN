import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import CustomBottomSheet from '../../../../components/layouts/bottom_sheets/CustomBottomSheet';
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
import {getProductsToCategoryScreen} from '../../../../constants/queryKeys';
import ItemRowOrColumn from '../../../../components/layouts/items/ItemRowOrColumn';
import ListProductsAnimation from '../../../../components/layouts/lists/ListProductsAnimation';
import FilterBar from '../../../../components/bars/FilterBar';

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

  const isColumn = useAppSelector(
    state => state.app.layoutItem.columnProductsCategory,
  );

  const sort = useAppSelector(state => state.sort.sort);

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

  const user_id = useAppSelector(state => state.auth.user.userId);

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: [
      getProductsToCategoryScreen,
      user_id,
      category_id_choose,
      sort.value,
      body,
    ],
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
    outputRange: [0, 60],
    extrapolate: 'clamp',
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.55],
    extrapolate: 'clamp',
  });

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
        <FilterBar navigation={navigation}/>
        <LinearGradient
          colors={[colors.Black_Color_RGBA, colors.Transperen_Color]}
          style={{width: '100%', height: 5}}
        />
      </Animated.View>

      <SpaceComponent height={10} />

      <ListProductsAnimation
        data={products}
        contentOffsetY={animatedValue}
        translateY={translateY}
        navigation={navigation}
      />
    </ContainerComponent>
  );
};

export default ProductsToCategoryScreen;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: handleSize(10),
  },
  itemColumn: {
    width: handleSize(164),
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
