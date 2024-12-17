import {StackNavigationProp} from '@react-navigation/stack';
import React, {FC, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useAppSelector} from '../../../helper/store/store';
import {productResponse} from '../../../helper/types/product.type';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {handleSize} from '../../../utils/handleSize';
import SectionComponent from '../SectionComponent';
import SpaceComponent from '../SpaceComponent';
import ItemColumnComponent from './ItemColumnComponent';
import ItemRowComponent from './ItemRowComponent';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetAddToCart from '../bottom_sheets/BottomSheetAddToCart';
import {useQueryClient} from '@tanstack/react-query';
import {
  getAllFavoritesQueryKey,
  getAllProductsHomeSreen,
  getCategoryIdsToFavoritesQueryKey,
  getLengthCartQuerykey,
  getProductsQueryKey,
  getProductsSaleQuerykey,
  getProductsToCategoryScreen,
  searchProductsQueryKey,
} from '../../../constants/queryKeys';
import DialogErrorIOS from '../../dialogs/DialogErrorIOS';

interface Props {
  item: productResponse;
  navigation: any;
  isColumn: boolean;
  isItemFavorite?: boolean;
}

const ItemRowOrColumn: FC<Props> = ({
  item,
  navigation,
  isColumn,
  isItemFavorite,
}) => {
  const bottomSheetAddToCart = useRef<BottomSheetModal>(null);
  const [is_err_add_to_cart, setis_err_add_to_cart] = useState(false);
  const openBottomSheet = () => {
    bottomSheetAddToCart.current?.present();
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
    setis_err_add_to_cart(false);
    navigation.navigate('BottomTab');
  };
  return (
    <SectionComponent flex={0}>
      {isColumn ? (
        <ItemColumnComponent
          item={item}
          isItemFavorite={isItemFavorite}
          onPress={() =>
            navigation.navigate('DetailProductScreen', {
              product_id: item._id,
            })
          }
          style={styles.itemColumn}
          onPressBag={openBottomSheet}
        />
      ) : (
        <ItemRowComponent
          item={item}
          isItemFavorite={isItemFavorite}
          onPress={() =>
            navigation.navigate('DetailProductScreen', {
              product_id: item._id,
            })
          }
          onPressBag={openBottomSheet}
        />
      )}
      <SpaceComponent height={20} />
      <BottomSheetAddToCart
        bottomSheet={bottomSheetAddToCart}
        product_id={item._id}
        is_err_add_cart={is_err_add_to_cart}
        setis_err_add_cart={setis_err_add_to_cart}
      />
      <DialogErrorIOS
        isVisible={is_err_add_to_cart}
        setIsvisble={setis_err_add_to_cart}
        content="Product is no longer available!"
        onPress={handleErrorAddToCart}
      />
    </SectionComponent>
  );
};

export default ItemRowOrColumn;

const styles = StyleSheet.create({
  itemColumn: {
    width: handleSize(164),
  },
});
