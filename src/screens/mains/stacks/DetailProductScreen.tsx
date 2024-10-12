import {RouteProp, useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {
  default as Icon,
  default as Ionicons,
} from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SliderImageComponent from '../../../components/layouts/SliderImageComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import StarComponent from '../../../components/layouts/StarComponent';
import ItemColumnComponent from '../../../components/layouts/items/ItemColumnComponent';
import MenuSelectComponent from '../../../components/layouts/selects/MenuSeclectComponent';
import SalePriceComponent from '../../../components/texts/SalePriceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {
  getAllProductAPI,
  getDetailProductAPI,
} from '../../../helper/apis/product.api';
import {
  productDetailResponse,
  productResponse,
} from '../../../helper/types/product.type';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {handleSize} from '../../../utils/handleSize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheetAddToCart from '../../../components/layouts/bottom_sheets/BottomSheetAddToCart';

type stackProp = NativeStackNavigationProp<
  stackParamListMain,
  'DetailProductScreen'
>;

type routeProp = RouteProp<stackParamListMain, 'DetailProductScreen'>;

const DetailProductScreen = ({route}: {route: routeProp}) => {
  const navigation = useNavigation<stackProp>();
  const {product_id} = route.params;
  const [size_select, setsize_select] = useState<string>('');
  const [color_select, setcolor_select] = useState<string>('');
  const [numberOfLineTextDetail, setnumberOfLineTextDetail] =
    useState<number>(4);
  const [product, setproduct] = useState<productDetailResponse>();
  const [Products, setProducts] = useState<Array<productResponse>>([]);

  const {data, isLoading, error} = useQuery({
    queryKey: ['getDetailProduct', product_id],
    queryFn: getDetailProductAPI,
  });

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: ['getProducts', product?.category_id],
    queryFn: getAllProductAPI,
  });

  useEffect(() => {
    if (data?.metadata) {
      setproduct(data.metadata);
    }
  }, [data?.metadata]);

  useEffect(() => {
    if (products?.metadata.products) {
      setProducts(
        products.metadata.products.filter(item => item._id !== product?._id),
      );
    }
  }, [products?.metadata.products]);

  const bottomSheet = useRef<BottomSheetModal>(null);

  return (
    <ContainerComponent style={{flex: 1, padding: 0, paddingHorizontal: 0}}>
      <ContainerComponent
        style={styles.container}
        isHeader
        back
        isScroll
        title={product?.name_category}
        styleHeader={{
          backgroundColor: colors.White_Color,
          elevation: handleSize(1),
        }}>
        <SliderImageComponent images={product?.images_product ?? []} />
        <ContainerComponent>
          <SpaceComponent height={12} />
          <RowComponent>
            <SalePriceComponent
              price={product?.price ?? 0}
              discount={product?.discount ?? 0}
              size={24}
              font={fontFamilies.semiBold}
            />
            <TouchableOpacity style={styles.btnIcon}>
              <Ionicons
                name={product?.isFavorite ? 'heart' : 'heart-outline'}
                color={
                  product?.isFavorite ? colors.Primary_Color : colors.Gray_Color
                }
                size={handleSize(18)}
              />
            </TouchableOpacity>
          </RowComponent>
          <SpaceComponent height={22} />
          <RowComponent>
            <TextComponent
              text={product?.name_brand ?? ''}
              size={24}
              font={fontFamilies.semiBold}
              lineHeight={28.8}
            />
          </RowComponent>
          <TextComponent
            text={product?.name_product ?? ''}
            size={13}
            color={colors.Gray_Color}
          />
          <SpaceComponent height={8} />
          <StarComponent
            star={product?.averageRating ?? 0}
            numberReviews={product?.countReview ?? 0}
          />
          <SpaceComponent height={16} />
          <TouchableOpacity
            onPress={() =>
              setnumberOfLineTextDetail(numberOfLineTextDetail === 4 ? 0 : 4)
            }>
            <TextComponent
              text={product?.description ?? ''}
              size={14}
              lineHeight={21}
              letterSpacing={-0.15}
              numberOfLines={numberOfLineTextDetail}
              ellipsizeMode="tail"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical: handleSize(16)}}>
            <RowComponent justify="space-between">
              <TextComponent text="Shipping info" />
              <Icon
                name="chevron-forward-outline"
                size={handleSize(16)}
                color={colors.Text_Color}
              />
            </RowComponent>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical: handleSize(16)}}>
            <RowComponent justify="space-between">
              <TextComponent text="Support" lineHeight={16} />
              <Icon
                name="chevron-forward-outline"
                size={handleSize(16)}
                color={colors.Text_Color}
              />
            </RowComponent>
          </TouchableOpacity>
          <SpaceComponent height={24} />
          <RowComponent justify="space-between">
            <TextComponent
              font={fontFamilies.semiBold}
              size={18}
              text="You can also like this"
            />
            <TextComponent
              style={{fontFamily: 'Metropolis-Regular'}}
              size={13}
              color={colors.Gray_Color}
              text={`${Products.length} items`}
            />
          </RowComponent>
          <SpaceComponent height={12} />
          <FlatList
            data={Products}
            horizontal
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <ItemColumnComponent
                onPress={() =>
                  navigation.push('DetailProductScreen', {
                    product_id: item._id,
                  })
                }
                trademark={item.name_brand}
                name={item.name_product}
                price={item.price_min}
                imageUrl={item.thumb}
                star={item.averageRating}
                stock={item.inventory_quantity}
                createAt={item.createdAt}
                isFavorite={item.isFavorite}
                discount={item.discount}
                reviewCount={item.countReview}
                style={styles.itemProduct}
              />
            )}
            ItemSeparatorComponent={() => <SpaceComponent width={11} />}
            showsHorizontalScrollIndicator={false}
          />
          <SpaceComponent height={110} />
        </ContainerComponent>
      </ContainerComponent>
      <SectionComponent style={styles.containerBtnAddToCart}>
        <RowComponent justify="flex-start">
          <ButtonComponent
            text="BUY NOW"
            onPress={() => {}}
            style={{height: handleSize(48), width: '85%'}}
          />
          <SpaceComponent width={5} />
          <TouchableOpacity
            style={styles.btnAddCart}
            onPress={() => {
              bottomSheet.current?.present();
            }}>
            <FontAwesome5
              name="shopping-cart"
              size={handleSize(20)}
              color={colors.Primary_Color}
            />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <BottomSheetAddToCart
        product_id={product?._id ?? ''}
        bottomSheet={bottomSheet}
      />
    </ContainerComponent>
  );
};

export default DetailProductScreen;

const styles = StyleSheet.create({
  btnAddCart: {
    width: handleSize(48),
    height: handleSize(48),
    borderRadius: handleSize(24),
    backgroundColor: colors.White_Color,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBtnAddToCart: {
    paddingVertical: handleSize(20),
    backgroundColor: colors.White_Color,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: handleSize(16),
    elevation: 50,
  },
  itemProduct: {
    width: handleSize(150),
    flex: 0,
  },
  btnIcon: {
    width: handleSize(36),
    height: handleSize(36),
    backgroundColor: colors.White_Color,
    elevation: handleSize(4),
    borderRadius: handleSize(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {paddingHorizontal: 0},
  iconHeart: {
    position: 'absolute',
    right: 20,
    top: 23,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
