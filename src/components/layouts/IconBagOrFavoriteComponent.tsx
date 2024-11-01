import React, {FC, useState} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import SectionComponent from './SectionComponent';
import {handleSize} from '../../utils/handleSize';
import {useAppDispatch, useAppSelector} from '../../helper/store/store';
import {QueryKey, useMutation, useQueryClient} from '@tanstack/react-query';
import {addFavoriteResponse} from '../../helper/types/favorite.type';
import {addFavoriteAPI} from '../../helper/apis/favorite.api';
import {
  getAllProductsResponse,
  getDetailProductResponse,
} from '../../helper/types/product.type';
import {setDiaLogLogin} from '../../helper/store/slices/sort.slice';
import {
  getAllCartQueryKey,
  getAllFavoritesQueryKey,
  getAllProductsHomeSreen,
  getCategoryIdsToFavoritesQueryKey,
  getDetailProductQueryKey,
  getProductsSaleQuerykey,
  getProductsToCategoryScreen,
  searchProductsQueryKey,
} from '../../constants/queryKeys';
import {getProductsSaleResponse} from '../../helper/types/sale.type';

interface Props {
  isItemFavorite?: boolean;
  isFavorite?: boolean;
  styleContainer?: ViewStyle;
  product_id: string;
  onPressBag?: () => void;
}

const IconBagOrFavoriteComponent: FC<Props> = ({
  isItemFavorite,
  isFavorite,
  styleContainer,
  product_id,
  onPressBag,
}) => {
  const userId = useAppSelector(state => state.auth.user.userId);
  const dispath = useAppDispatch();

  const queryClient = useQueryClient();

  const {mutate: toggleFavorite} = useMutation<
    addFavoriteResponse | undefined,
    Error,
    string,
    {
      preProductsHome: [QueryKey, unknown][];
      preProductsToCate: [QueryKey, unknown][];
      preProductDetail: [QueryKey, unknown][];
      perSearchProducts: [QueryKey, unknown][];
      preProductsSale: [QueryKey, unknown][];
    }
  >({
    mutationFn: (product_id: string) => {
      return addFavoriteAPI({product_id});
    },
    onMutate: async (product_id: string) => {
      await queryClient.cancelQueries({queryKey: [getAllProductsHomeSreen]});
      await queryClient.cancelQueries({
        queryKey: [getProductsToCategoryScreen],
      });
      await queryClient.cancelQueries({queryKey: [getDetailProductQueryKey]});

      const preProductsHome = queryClient.getQueriesData({
        queryKey: [getAllProductsHomeSreen],
      });

      const preProductsToCate = queryClient.getQueriesData({
        queryKey: [getProductsToCategoryScreen],
      });

      const preProductDetail = queryClient.getQueriesData({
        queryKey: [getDetailProductQueryKey],
      });

      const perSearchProducts = queryClient.getQueriesData({
        queryKey: [searchProductsQueryKey],
      });

      const preProductsSale = queryClient.getQueriesData({
        queryKey: [getProductsSaleQuerykey],
      });

      queryClient.setQueriesData(
        {queryKey: [getAllProductsHomeSreen]},
        (
          old_data: getAllProductsResponse | undefined,
        ): getAllProductsResponse | undefined => {
          if (!old_data) return undefined;
          return {
            ...old_data,
            metadata: {
              products: old_data.metadata.products.map(product =>
                product._id === product_id
                  ? {...product, isFavorite: !product.isFavorite}
                  : product,
              ),
            },
          };
        },
      );

      queryClient.setQueriesData(
        {queryKey: [getProductsToCategoryScreen]},
        (
          old_data: getAllProductsResponse | undefined,
        ): getAllProductsResponse | undefined => {
          if (!old_data) return undefined;
          return {
            ...old_data,
            metadata: {
              products: old_data.metadata.products.map(product =>
                product._id === product_id
                  ? {...product, isFavorite: !product.isFavorite}
                  : product,
              ),
            },
          };
        },
      );

      queryClient.setQueriesData(
        {queryKey: [getDetailProductQueryKey]},
        (
          old_data: getDetailProductResponse | undefined,
        ): getDetailProductResponse | undefined => {
          if (!old_data) return undefined;
          return {
            ...old_data,
            metadata: {
              ...old_data.metadata,
              isFavorite: !old_data.metadata.isFavorite,
            },
          };
        },
      );

      queryClient.setQueriesData(
        {queryKey: [searchProductsQueryKey]},
        (
          old_data: getAllProductsResponse | undefined,
        ): getAllProductsResponse | undefined => {
          if (!old_data) return undefined;
          return {
            ...old_data,
            metadata: {
              products: old_data.metadata.products.map(product =>
                product._id === product_id
                  ? {...product, isFavorite: !product.isFavorite}
                  : product,
              ),
            },
          };
        },
      );

      queryClient.setQueriesData(
        {queryKey: [getProductsSaleQuerykey]},
        (
          old_data: getProductsSaleResponse | undefined,
        ): getProductsSaleResponse | undefined => {
          if (!old_data) return undefined;
          return {
            ...old_data,
            metadata: old_data.metadata.map(product =>
              product._id === product_id
                ? {...product, isFavorite: !product.isFavorite}
                : product,
            ),
          };
        },
      );

      return {
        preProductsHome,
        preProductsToCate,
        preProductDetail,
        perSearchProducts,
        preProductsSale
      };
    },

    onError(error, variables, context) {
      queryClient.setQueriesData(
        {queryKey: [getAllProductsHomeSreen]},
        context?.preProductsHome,
      );
      queryClient.setQueriesData(
        {queryKey: [getProductsToCategoryScreen]},
        context?.preProductsToCate,
      );
      queryClient.setQueriesData(
        {queryKey: [getDetailProductQueryKey]},
        context?.preProductDetail,
      );
      queryClient.setQueriesData(
        {queryKey: [searchProductsQueryKey]},
        context?.perSearchProducts,
      );
      queryClient.setQueriesData(
        {queryKey: [getProductsSaleQuerykey]},
        context?.preProductsSale
      )
    },

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({queryKey: [getAllFavoritesQueryKey]});
      queryClient.invalidateQueries({
        queryKey: [getCategoryIdsToFavoritesQueryKey],
      });
      queryClient.invalidateQueries({queryKey: [getAllCartQueryKey]});
    },
  });

  const handleIconBagOrFavorite = async () => {
    if (!isItemFavorite) {
      if (!userId) dispath(setDiaLogLogin(true));
      else {
        toggleFavorite(product_id);
      }
    }
    if (isItemFavorite && onPressBag) {
      onPressBag();
    }
  };

  return (
    <SectionComponent
      onPress={() => handleIconBagOrFavorite()}
      style={[
        styles.containerIconShopping,
        {
          backgroundColor: isItemFavorite
            ? colors.Primary_Color
            : colors.White_Color,
          shadowColor: isItemFavorite
            ? colors.Primary_Color
            : colors.Gray_Color,
        },
        styleContainer,
      ]}>
      {isItemFavorite ? (
        <FontAwesome5Icon
          name="shopping-bag"
          size={handleSize(16)}
          color={colors.White_Color}
        />
      ) : (
        <IonIcon
          name={isFavorite ? 'heart' : 'heart-outline'}
          color={isFavorite ? colors.Primary_Color : colors.Gray_Color}
          size={handleSize(18)}
        />
      )}
    </SectionComponent>
  );
};

export default IconBagOrFavoriteComponent;

const styles = StyleSheet.create({
  containerIconShopping: {
    width: handleSize(36),
    height: handleSize(36),
    borderRadius: 100,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    end: 0,
    bottom: -18,
    // Shadow for iOS
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 3,
  },
});
