import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import DialogErrorIOS from '../../../components/dialogs/DialogErrorIOS';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import DisplayRating from '../../../components/layouts/DisplayRating';
import IconBagOrFavoriteComponent from '../../../components/layouts/IconBagOrFavoriteComponent';
import ProductsComponent from '../../../components/layouts/ProductsComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SliderImageComponent from '../../../components/layouts/SliderImageComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import BottomSheetAddToCart from '../../../components/layouts/bottom_sheets/BottomSheetAddToCart';
import IconCart from '../../../components/layouts/icons/IconCart';
import ListReviews from '../../../components/layouts/lists/ListReviews';
import ListSaleProductDetail from '../../../components/layouts/lists/ListSaleProductDetail';
import SalePriceComponent from '../../../components/texts/SalePriceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import MediaViewing from '../../../components/viewers/MediaViewing';
import { colors } from '../../../constants/colors';
import { fontFamilies } from '../../../constants/fontFamilies';
import {
  getAllFavoritesQueryKey,
  getAllProductsHomeSreen,
  getCategoryIdsToFavoritesQueryKey,
  getDetailProductQueryKey,
  getLengthCartQuerykey,
  getProductsQueryKey,
  getProductsSaleQuerykey,
  getProductsToCategoryScreen,
  searchProductsQueryKey,
} from '../../../constants/queryKeys';
import {
  getAllProductAPI,
  getDetailProductAPI,
} from '../../../helper/apis/product.api';
import { getAllReviewForProduct } from '../../../helper/apis/review.api';
import { setDiaLogLogin } from '../../../helper/store/slices/sort.slice';
import { useAppDispatch, useAppSelector } from '../../../helper/store/store';
import {
  productDetailResponse,
  productResponse
} from '../../../helper/types/product.type';
import { review } from '../../../helper/types/review.type';
import { stackParamListMain } from '../../../navigation/StackMainNavigation';
import { handleSize } from '../../../utils/handleSize';

type stackProp = NativeStackNavigationProp<
  stackParamListMain,
  'DetailProductScreen'
>;

type routeProp = RouteProp<stackParamListMain, 'DetailProductScreen'>;

const DetailProductScreen = ({route}: {route: routeProp}) => {
  const navigation = useNavigation<stackProp>();
  const {product_id} = route.params;
  const [numberOfLineTextDetail, setnumberOfLineTextDetail] =
    useState<number>(4);
  const [product, setproduct] = useState<productDetailResponse>();
  const [Products, setProducts] = useState<Array<productResponse>>([]);
  const [isBuyNow, setisBuyNow] = useState<boolean>(false);
  const [is_err_add_cart, setis_err_add_cart] = useState(false);
  const [is_visible_viewing, setis_visible_viewing] = useState(false);
  const [index_viewing, setindex_viewing] = useState(0);
  const [reviews, setreviews] = useState<review[]>([]);

  const dispatch = useAppDispatch();

  const userId = useAppSelector(state => state.auth.user.userId);

  const setReviews = async () => {
    const data = await getAllReviewForProduct(product_id);
    if (data?.metadata) {
      setreviews(data.metadata.slice(0, 2));
    }
  };

  const {data, isLoading, error, isRefetching, refetch} = useQuery({
    queryKey: [getDetailProductQueryKey, userId, product_id],
    queryFn: getDetailProductAPI,
  });

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: [getProductsQueryKey, userId],
    queryFn: getAllProductAPI,
  });

  useEffect(() => {
    if (data?.metadata) {
      setproduct(data.metadata);
    }
    setReviews();
  }, [data?.metadata]);

  useEffect(() => {
    if (products?.metadata.products) {
      setProducts(
        products.metadata.products.filter(item => item._id !== product?._id),
      );
    }
  }, [products?.metadata.products]);

  const bottomSheet = useRef<BottomSheetModal>(null);

  const handleIsLogged = () => {
    if (!userId) dispatch(setDiaLogLogin(true));
    else {
      setisBuyNow(true);
      bottomSheet.current?.present();
    }
  };

  const handleBottomSheet = () => {
    if (!userId) dispatch(setDiaLogLogin(true));
    else {
      setisBuyNow(false);
      bottomSheet.current?.present();
    }
  };

  const queryClient = useQueryClient();
  const handleErrorAddToCart = () => {
    queryClient.invalidateQueries({queryKey: [getAllProductsHomeSreen]});
    queryClient.invalidateQueries({queryKey: [getProductsToCategoryScreen]});
    queryClient.invalidateQueries({queryKey: [getAllFavoritesQueryKey]});
    queryClient.invalidateQueries({
      queryKey: [getCategoryIdsToFavoritesQueryKey],
    });
    queryClient.invalidateQueries({queryKey: [searchProductsQueryKey]});
    queryClient.invalidateQueries({queryKey: [getLengthCartQuerykey]});
    queryClient.invalidateQueries({queryKey: [getProductsSaleQuerykey]});
    queryClient.invalidateQueries({queryKey: [getProductsQueryKey]});
    setis_err_add_cart(false);
    navigation.navigate('BottomTab');
  };

  if (isLoading)
    return (
      <SectionComponent
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={colors.Primary_Color} size={handleSize(30)} />
      </SectionComponent>
    );

  return (
    <ContainerComponent
      style={{flex: 1, padding: 0, paddingHorizontal: 0}}
      refreshing={isRefetching}
      onRefresh={refetch}>
      <ContainerComponent
        isHeader
        isScroll
        back
        rightIcon={<IconCart />}
        style={styles.container}
        title={'Detail'}>
        <SliderImageComponent
          images={product?.images_product ?? []}
          index={index_viewing}
          setindex={setindex_viewing}
          is_show_index
        />
        <SpaceComponent height={10} />
        <ListSaleProductDetail sales={product?.sales_active ?? []} />
        <ContainerComponent>
          <SpaceComponent height={12} />
          <RowComponent>
            <SalePriceComponent
              price={product?.price ?? 0}
              discount={product?.discount ?? 0}
              size={24}
              font={fontFamilies.semiBold}
              flex={0.9}
              flex_left={0}
              flex_right={0}
              justify="flex-start"
            />
            <IconBagOrFavoriteComponent
              isFavorite={product?.isFavorite}
              product_id={product?._id ?? ''}
              styleContainer={styles.iconFavorite}
            />
          </RowComponent>
          <SpaceComponent height={10} />
          <RowComponent>
            <TextComponent
              text={product?.name_product ?? ''}
              size={18}
              font={fontFamilies.semiBold}
              lineHeight={24}
            />
          </RowComponent>
          <SpaceComponent height={7} />
          <RowComponent justify="flex-start">
            <TextComponent
              text="- Brand: "
              size={13}
              color={colors.Gray_Color}
              font={fontFamilies.medium}
            />
            <TextComponent
              text={`${product?.name_brand}`}
              size={13}
              font={fontFamilies.medium}
            />
          </RowComponent>
          <SpaceComponent height={7} />
          <RowComponent justify="flex-start">
            <TextComponent
              text="- Category: "
              size={13}
              color={colors.Gray_Color}
              font={fontFamilies.medium}
            />
            <TextComponent
              text={`${product?.name_category}`}
              size={13}
              font={fontFamilies.medium}
            />
          </RowComponent>
          <SpaceComponent height={7} />
          <DisplayRating
            avg_rating={product?.averageRating ?? 0}
            total_order={product?.total_orders ?? 0}
            size_icon={18}
            size_text={15}
          />
          <SpaceComponent height={7} />
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
          {reviews.length > 0 && (
            <SectionComponent>
              <SpaceComponent height={10} />
              <SpaceComponent
                height={1}
                width={'100%'}
                style={{backgroundColor: colors.Line_Status_Order}}
              />
              <SpaceComponent height={10} />
              <TextComponent text="Reviews" font={fontFamilies.medium} />
              <SpaceComponent height={10} />
              <ListReviews reviews={reviews} />
              <SpaceComponent height={10} />
              <RowComponent justify="flex-end">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ReviewsForProductScreen', {
                      product_id: product?._id ?? '',
                    });
                  }}
                  style={{padding: handleSize(10)}}>
                  <TextComponent
                    text="View all"
                    size={11}
                    style={{textDecorationLine: 'underline'}}
                  />
                </TouchableOpacity>
              </RowComponent>
            </SectionComponent>
          )}
          <SpaceComponent height={15} />
          <SpaceComponent
            height={1}
            width={'100%'}
            style={{backgroundColor: colors.Line_Status_Order}}
          />
          <ProductsComponent
            title="You can also like this"
            products={Products}
            styleContainer={{paddingHorizontal: 0}}
            place={`${Products.length} items`}
            sizeTitle={18}
          />
          <SpaceComponent height={110} />
        </ContainerComponent>
      </ContainerComponent>
      <SectionComponent style={styles.containerBtnAddToCart}>
        <RowComponent justify="flex-start">
          <ButtonComponent
            text="BUY NOW"
            onPress={() => {
              handleIsLogged();
            }}
            style={{height: handleSize(48), width: '85%'}}
          />
          <SpaceComponent width={5} />
          <TouchableOpacity
            style={styles.btnAddCart}
            onPress={() => {
              handleBottomSheet();
            }}>
            <FontAwesome5
              name="cart-plus"
              size={handleSize(20)}
              color={colors.Primary_Color}
            />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <MediaViewing
        medias={product?.images_product ?? []}
        is_visible={is_visible_viewing}
        set_isvisible={setis_visible_viewing}
        media_index={index_viewing}
        setmedia_index={setindex_viewing}
      />
      <BottomSheetAddToCart
        product_id={product?._id ?? ''}
        bottomSheet={bottomSheet}
        isBuyNow={isBuyNow}
        setisBuyNow={setisBuyNow}
        is_err_add_cart={is_err_add_cart}
        setis_err_add_cart={setis_err_add_cart}
      />
      <DialogErrorIOS
        isVisible={is_err_add_cart}
        setIsvisble={setis_err_add_cart}
        content="Product is no longer available!"
        onPress={handleErrorAddToCart}
      />
    </ContainerComponent>
  );
};

export default DetailProductScreen;

const styles = StyleSheet.create({
  iconFavorite: {
    position: 'relative',
    end: 0,
    bottom: 0,
    width: handleSize(36),
    height: handleSize(36),
    borderRadius: 100,
    flex: 0,
  },
  itemColor: {
    width: handleSize(18),
    height: handleSize(18),
    borderRadius: handleSize(9),
  },
  containerColor: {
    width: handleSize(24),
    height: handleSize(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: handleSize(12),
  },
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
