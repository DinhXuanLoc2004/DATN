import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {handleSize} from '../../utils/handleSize';
import {useAppSelector} from '../../helper/store/store';
import {QueryKey, useMutation, useQueryClient} from '@tanstack/react-query';
import {
  addFavoriteResponse,
  getAllFavoritesResponse,
} from '../../helper/types/favorite.type';
import {addFavoriteAPI} from '../../helper/apis/favorite.api';
import {
  getAllCartQueryKey,
  getAllFavoritesQueryKey,
  getAllProductsHomeSreen,
  getCategoryIdsToFavoritesQueryKey,
  getLengthCartQuerykey,
  getProductsSaleQuerykey,
  getProductsToCategoryScreen,
} from '../../constants/queryKeys';
import {getAllProductsResponse} from '../../helper/types/product.type';

interface Props {
  onPress?: () => {};
  top?: number;
  right?: number;
  size?: number;
  product_id: string;
}

const IconDeleteItemComponent: FC<Props> = ({
  onPress,
  top,
  right,
  size,
  product_id,
}) => {
  const user_id = useAppSelector(state => state.auth.user.userId);

  const queryClient = useQueryClient();

  const {mutate: deleteFavorite} = useMutation<
    addFavoriteResponse | undefined,
    Error,
    string,
    {preFavorites: [QueryKey, unknown][]}
  >({
    mutationFn: (product_id: string) => {
      return addFavoriteAPI({product_id, user_id});
    },

    onMutate: async (product_id: string) => {
      await queryClient.cancelQueries({queryKey: [getAllFavoritesQueryKey]});

      const preFavorites = queryClient.getQueriesData({
        queryKey: [getAllFavoritesQueryKey],
      });

      queryClient.setQueriesData(
        {queryKey: [getAllFavoritesQueryKey]},
        (
          old_data: getAllProductsResponse | undefined,
        ): getAllProductsResponse | undefined => {
          if (!old_data) return undefined;
          return {
            ...old_data,
            metadata: {
              products: old_data.metadata.products.filter(
                favorite => favorite._id !== product_id,
              ),
            },
          };
        },
      );

      return {preFavorites};
    },

    onError(error, variables, context) {
      queryClient.setQueriesData(
        {queryKey: [getAllFavoritesQueryKey]},
        context?.preFavorites,
      );
    },

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({queryKey: [getAllProductsHomeSreen]});
      queryClient.invalidateQueries({queryKey: [getProductsToCategoryScreen]});
      queryClient.invalidateQueries({
        queryKey: [getCategoryIdsToFavoritesQueryKey],
      });
      queryClient.invalidateQueries({queryKey: [getAllCartQueryKey]});
      queryClient.invalidateQueries({queryKey: [getProductsSaleQuerykey]});
    },
  });

  return (
    <TouchableOpacity
      onPress={() => deleteFavorite(product_id)}
      style={[
        {
          position: 'absolute',
          right: right ? handleSize(right) : 10,
          top: top ? handleSize(top) : 15,
        },
        styles.btnDelete,
      ]}>
      <IonIcon name="close" size={size ? handleSize(size) : 24} />
    </TouchableOpacity>
  );
};

export default IconDeleteItemComponent;

const styles = StyleSheet.create({
  btnDelete: {
    width: handleSize(30),
    height: handleSize(30),
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 100,
  },
});
