import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import {productResponse} from '../../../helper/types/product.type';
import ListProductsAnimation from '../../../components/layouts/lists/ListProductsAnimation';
import FilterBar from '../../../components/bars/FilterBar';

type stackProps = StackNavigationProp<stackParamListMain, 'BottomTab'>;

const FavoriteScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [categoryIds, setcategoryIds] = useState<categoryIdsResponse[]>([]);
  const [category_id_choose, setcategory_id_choose] = useState<string>('');
  const [favorites, setfavorites] = useState<productResponse[]>([]);

  const sort = useAppSelector(state => state.sort.sort);
  const stateFilter = useAppSelector(state => state.sort.filter);
  const price = [stateFilter.price.min, stateFilter.price.max];
  const colors_id = stateFilter.colors;
  const sizes_id = stateFilter.sizes;
  const rating = stateFilter.rating;
  const brands_id = stateFilter.brands;

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
    outputRange: [0, -40],
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

  const user_id = useAppSelector(state => state.auth.user.userId);

  const {data: dataCategoryIds} = useQuery({
    queryKey: [getCategoryIdsToFavoritesQueryKey, user_id],
    queryFn: getCategoryIdsToFavoritesAPI,
  });

  useEffect(() => {
    if (dataCategoryIds?.metadata && dataCategoryIds.metadata.length > 0) {
      setcategoryIds([
        {_id: '', name_category: 'All'},
        ...dataCategoryIds.metadata,
      ]);
    } else {
      setcategoryIds([]);
    }
  }, [dataCategoryIds?.metadata]);

  const body = useMemo(
    () => ({price, colors_id, sizes_id, rating, brands_id}),
    [price, colors_id, sizes_id, rating, brands_id],
  );

  const {data: dataFavorites} = useQuery({
    queryKey: [
      getAllFavoritesQueryKey,
      user_id,
      category_id_choose,
      sort.value,
      body,
    ],
    queryFn: getAllFavoritesAPI,
  });

  useEffect(() => {
    if (dataFavorites?.metadata) {
      setfavorites(dataFavorites.metadata.products);
    }
  }, [dataFavorites?.metadata]);

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
          <FilterBar navigation={navigation} />
          <LinearGradient
            colors={[colors.Black_Color_RGBA, colors.Transperen_Color]}
            style={{width: '100%', height: 5}}
          />
        </Animated.View>
      )}
      <SpaceComponent height={10} />

      <ListProductsAnimation
        data={favorites}
        contentOffsetY={animatedValue}
        navigation={navigation}
        translateY={translateY}
        isItemFavorite
      />
    </ContainerComponent>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: handleSize(5),
  },
  itemColumn: {
    width: handleSize(164),
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
