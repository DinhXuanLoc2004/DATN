import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {animationInterpolate} from '../../../../utils/animations';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {
  getCategoriesSaleAPI,
  getProductsSaleAPI,
} from '../../../../helper/apis/sale.api';
import {categorySale, productSale} from '../../../../helper/types/sale.type';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import HeaderScreenAnimation from '../../../../components/layouts/HeaderScreenAnimation';
import {colors} from '../../../../constants/colors';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {handleSize} from '../../../../utils/handleSize';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useAppDispatch, useAppSelector} from '../../../../helper/store/store';
import {setColumnProductsCategory} from '../../../../helper/store/slices/app.slice';
import IconBagOrFavoriteComponent from '../../../../components/layouts/IconBagOrFavoriteComponent';
import StarComponent from '../../../../components/layouts/StarComponent';
import SalePriceComponent from '../../../../components/texts/SalePriceComponent';
import NewOrDiscountComponent from '../../../../components/texts/NewOrDiscountComponent';
import ItemColumnComponent from '../../../../components/layouts/items/ItemColumnComponent';
import {useQuery} from '@tanstack/react-query';
import {getProductsSaleQuerykey} from '../../../../constants/queryKeys';
import {StackNavigationProp} from '@react-navigation/stack';

type routeProp = RouteProp<stackParamListMain, 'ProductsSaleScreen'>;

type stackProp = StackNavigationProp<stackParamListMain, 'ProductsSaleScreen'>;

const ProductsSaleScreen = ({route}: {route: routeProp}) => {
  const {sale_id, name_sale} = route.params;
  const [categories, setcategories] = useState<categorySale[]>([]);
  const [category_id_choose, setcategory_id_choose] = useState<string>('');
  const [products, setproducts] = useState<productSale[]>([]);
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const navigation = useNavigation<stackProp>();

  const inputAnimation = [0, 100];

  const translateY = animationInterpolate(
    animatedValue,
    inputAnimation,
    [0, -65],
  );

  const translateX = animationInterpolate(
    animatedValue,
    inputAnimation,
    [0, 30],
  );

  const scale = animationInterpolate(animatedValue, inputAnimation, [1, 0.55]);

  const getCategoriesSale = async () => {
    const data = await getCategoriesSaleAPI(sale_id);
    if (data?.metadata) {
      setcategories([
        {name_category: 'All', category_id: ''},
        ...data.metadata,
      ]);
    }
  };

  useEffect(() => {
    getCategoriesSale();
  }, []);

  const bottomSheet = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheet.current?.present();
  }, []);

  const isColumn = useAppSelector(
    state => state.app.layoutItem.columnProductsCategory,
  );
  const sort = useAppSelector(state => state.sort.sort);

  const dispath = useAppDispatch();

  const user_id = useAppSelector(state => state.auth.user.userId);

  const {data, isLoading} = useQuery({
    queryKey: [getProductsSaleQuerykey, sale_id, user_id, category_id_choose],
    queryFn: getProductsSaleAPI,
  });

  useEffect(() => {
    if (data?.metadata) {
      setproducts(data.metadata);
    }
  }, [data?.metadata]);

  return (
    <ContainerComponent style={styles.container}>
      <HeaderScreenAnimation
        title={name_sale}
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
        {/* <RowComponent style={styles.containerFiler}>
          <TouchableOpacity
            onPress={() => {
              //   navigation.navigate('FilterScreen');
            }}>
            <RowComponent>
              <FontAwesome5Icon
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
              <FontAwesome5Icon
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
              dispath(setColumnProductsCategory());
            }}>
            <FontAwesome5Icon
              name={isColumn ? 'th-list' : 'th-large'}
              size={20}
              color={colors.Text_Color}
            />
          </TouchableOpacity>
        </RowComponent> */}
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
          data={products}
          keyExtractor={item => item._id}
          style={styles.listProducts}
          renderItem={({item}) => (
            <SectionComponent flex={0}>
              <ItemColumnComponent
                onPress={() =>
                  navigation.navigate('DetailProductScreen', {
                    product_id: item._id,
                  })
                }
                style={styles.itemColumn}
                _id={item._id}
                name={item.name_product}
                createAt={item.createdAt}
                isFavorite={item.isFavorite}
                imageUrl={item.thumb}
                price={item.price_min}
                stock={item.inventory}
                trademark={`${item.name_brand} - ${item.name_category}`}
                reviewCount={item.countReview}
                star={item.averageRating}
                discount={item.discount}
              />
            </SectionComponent>
          )}
          numColumns={2}
          key={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
        />
      </Animated.View>
    </ContainerComponent>
  );
};

export default ProductsSaleScreen;

const styles = StyleSheet.create({
  itemColumn: {
    width: handleSize(164),
    height: handleSize(260),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: handleSize(26),
  },
  containerTextSorry: {
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  image: {
    width: '100%',
    height: 'auto',
    left: 1,
    borderRadius: 10,
    aspectRatio: 0.8,
  },
  containerItem: {
    width: '50%',
    height: 'auto',
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
  container: {paddingHorizontal: 0},
});
