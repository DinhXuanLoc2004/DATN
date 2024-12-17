import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  QueryKey,
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {
  findProductVariantQueryKey,
  getAllCartQueryKey,
  getAllFavoritesQueryKey,
  getAllProductsHomeSreen,
  getCategoryIdsToFavoritesQueryKey,
  getColorsSizesToProductQueryKey,
  getProductsToCategoryScreen,
} from '../../../constants/queryKeys';
import {changeQuantityCartAPI} from '../../../helper/apis/cart.api';
import {addFavoriteAPI} from '../../../helper/apis/favorite.api';
import {
  bodyChangeQuantityCart,
  getAllCartResponse,
} from '../../../helper/types/cart.type';
import {addFavoriteResponse} from '../../../helper/types/favorite.type';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {handleSize} from '../../../utils/handleSize';
import NewOrDiscountComponent from '../../texts/NewOrDiscountComponent';
import SalePriceComponent from '../../texts/SalePriceComponent';
import TextColorAndSizeComponent from '../../texts/TextColorAndSizeComponent';
import TextComponent from '../../texts/TextComponent';
import RowComponent from '../RowComponent';
import SectionComponent from '../SectionComponent';
import SpaceComponent from '../SpaceComponent';
import {fotmatedAmount} from '../../../utils/fotmats';
import {useAppSelector} from '../../../helper/store/store';
import _ from 'lodash';
import {Portal} from '@gorhom/portal';
import DialogErrorIOS from '../../dialogs/DialogErrorIOS';

type stackProp = StackNavigationProp<stackParamListMain, 'BottomTab'>;

interface Props {
  name: string;
  color: string;
  size: string;
  price: number;
  image_url: string;
  quantity: number;
  discount: number;
  create_at: string;
  cart_id: string;
  fnRefect: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<getAllCartResponse | undefined, Error>>;
  setisVisibleModal: (val: boolean) => void;
  setcart_id_delete: (val: string) => void;
  isFavorite: boolean;
  cart_id_select_menu: string;
  setcart_id_select_menu: (val: string) => void;
  product_id: string;
  can_be_plus: number;
}

const ItemCartComponent: React.FC<Props> = ({
  name,
  color,
  size,
  price,
  image_url,
  quantity,
  discount,
  create_at,
  cart_id,
  fnRefect,
  setisVisibleModal,
  setcart_id_delete,
  isFavorite,
  cart_id_select_menu,
  setcart_id_select_menu,
  product_id,
  can_be_plus,
}) => {
  const [is_loadding_minus, setis_loadding_minus] = useState(false);
  const [is_loadding_plus, setis_loadding_plus] = useState(false);
  const [quantity_local, setquantity_local] = useState(quantity);
  const navigation = useNavigation<stackProp>();
  const user_id = useAppSelector(state => state.auth.user.userId);
  const queryClient = useQueryClient();

  const updateQuantity = async (value: number) => {
    const body: bodyChangeQuantityCart = {
      cart_id,
      value: quantity + value,
    };
    const data = await changeQuantityCartAPI(body);
    if (data?.metadata) {
      setquantity_local(data.metadata.quantity);
      fnRefect();
    }
  };
  const [err_change_quantity, seterr_change_quantity] = useState(false);

  const updateQuantityWithTextInput = _.debounce(async (value: number) => {
    const body: bodyChangeQuantityCart = {
      cart_id,
      value,
    };
    const data = await changeQuantityCartAPI(body);
    if (data?.metadata && data.status === 200) {
      fnRefect();
    } else {
      if (
        data &&
        data.status === 203 &&
        data.message === 'Invalid quantity' &&
        typeof data.metadata === 'number'
      ) {
        setquantity_local(data.metadata);
        seterr_change_quantity(true);
      }
    }
    queryClient.invalidateQueries({queryKey: [findProductVariantQueryKey]});
    queryClient.invalidateQueries({
      queryKey: [getColorsSizesToProductQueryKey],
    });
  }, 1000);

  const handleChangeQuantity = (value: number) => {
    setcart_id_select_menu('');
    if (value < 0) {
      setis_loadding_minus(true);
      if (quantity <= 1) {
        setisVisibleModal(true);
        setcart_id_delete(cart_id);
      } else {
        updateQuantity(value);
      }
      setis_loadding_minus(false);
    } else {
      setis_loadding_plus(true);
      updateQuantity(value);
      setis_loadding_plus(false);
    }
  };

  const toggleMenu = () => {
    if (cart_id_select_menu === cart_id) {
      setcart_id_select_menu('');
    } else {
      setcart_id_select_menu(cart_id);
    }
  };

  const {mutate: toggleFavorite} = useMutation<
    addFavoriteResponse | undefined,
    Error,
    string,
    {preAllCart: [QueryKey, unknown][]}
  >({
    mutationFn: (product_id: string) => {
      return addFavoriteAPI({product_id, user_id});
    },

    onMutate: async (product_id: string) => {
      await queryClient.cancelQueries({queryKey: [getAllCartQueryKey]});

      const preAllCart = queryClient.getQueriesData({
        queryKey: [getAllCartQueryKey],
      });

      queryClient.setQueriesData(
        {queryKey: [getAllCartQueryKey]},
        (
          old_data: getAllCartResponse | undefined,
        ): getAllCartResponse | undefined => {
          if (!old_data) return undefined;
          return {
            ...old_data,
            metadata: old_data.metadata.map(cart =>
              cart.product_id === product_id
                ? {...cart, isFavorite: !cart.isFavorite}
                : cart,
            ),
          };
        },
      );

      return {preAllCart};
    },

    onError(error, variables, context) {
      queryClient.setQueriesData(
        {queryKey: [getAllCartQueryKey]},
        context?.preAllCart,
      );
    },

    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries({queryKey: [getAllProductsHomeSreen]});
      queryClient.invalidateQueries({queryKey: [getProductsToCategoryScreen]});
      queryClient.invalidateQueries({queryKey: [getAllFavoritesQueryKey]});
      queryClient.invalidateQueries({
        queryKey: [getCategoryIdsToFavoritesQueryKey],
      });
    },
  });

  const handleAddToFavorites = () => {
    setcart_id_select_menu('');
    toggleFavorite(product_id);
  };

  const handleDeleteFromList = () => {
    setcart_id_delete(cart_id);
    setisVisibleModal(true);
    setcart_id_select_menu('');
  };

  const handleGetProductDetail = () => {
    setcart_id_select_menu('');
    navigation.navigate('DetailProductScreen', {product_id: product_id});
  };

  return (
    <RowComponent
      flex={0}
      style={styles.card}
      onPress={() => {
        handleGetProductDetail();
      }}>
      <Image source={{uri: image_url}} style={styles.image} />
      <SectionComponent style={styles.containerContent}>
        <RowComponent justify="space-between">
          <SectionComponent>
            <TextComponent
              text={name}
              font={fontFamilies.semiBold}
              numberOfLines={1}
            />
            <SpaceComponent height={4} />
            <TextColorAndSizeComponent color={color} size={size} />
            <SpaceComponent height={2} />
            <RowComponent justify="flex-start">
              <TextComponent
                text="Price: "
                color={colors.Gray_Color}
                size={11}
              />
              <SalePriceComponent
                price={price}
                discount={discount}
                justify="flex-start"
                flex={0}
                flex_left={0}
                flex_right={0}
                size={12}
              />
            </RowComponent>
          </SectionComponent>
          <TouchableOpacity onPress={toggleMenu}>
            <Entypo name="dots-three-vertical" style={styles.iconMenu} />
          </TouchableOpacity>
        </RowComponent>
        <SpaceComponent height={5} />
        <RowComponent>
          <RowComponent>
            <TouchableOpacity
              disabled={is_loadding_minus || is_loadding_plus}
              onPress={() => handleChangeQuantity(-1)}
              style={styles.iconButton}>
              {is_loadding_minus ? (
                <ActivityIndicator size={12} color={colors.Gray_Color} />
              ) : (
                <FontAwesome5 name="minus" style={styles.icon} />
              )}
            </TouchableOpacity>
            <SpaceComponent width={12} />
            <TextInput
              value={quantity_local.toString()}
              onChangeText={value => {
                const numberValue = Number(value);
                if (Number.isNaN(numberValue) || numberValue < 0) {
                  seterr_change_quantity(true);
                  setquantity_local(quantity);
                } else {
                  updateQuantityWithTextInput(numberValue);
                  setquantity_local(numberValue);
                }
              }}
              keyboardType="number-pad"
              style={{
                fontSize: handleSize(14),
                fontFamily: fontFamilies.medium,
                color: colors.Text_Color,
              }}
            />
            <SpaceComponent width={12} />
            <TouchableOpacity
              disabled={is_loadding_minus || is_loadding_plus || !can_be_plus}
              onPress={() => handleChangeQuantity(1)}
              style={[styles.iconButton, {opacity: !can_be_plus ? 0.6 : 1}]}>
              {is_loadding_plus ? (
                <ActivityIndicator size={12} color={colors.Gray_Color} />
              ) : (
                <FontAwesome5 name="plus" style={styles.icon} />
              )}
            </TouchableOpacity>
          </RowComponent>
          <SpaceComponent width={10} />
        </RowComponent>
      </SectionComponent>
      {cart_id_select_menu === cart_id && (
        <SectionComponent style={styles.menu}>
          <TouchableOpacity
            onPress={handleAddToFavorites}
            style={styles.btnMenu}>
            <TextComponent
              text={isFavorite ? 'Unlike' : 'Add to favorite'}
              size={11}
            />
          </TouchableOpacity>
          <SpaceComponent
            height={1}
            style={{width: '100%', backgroundColor: colors.Gray_Color}}
          />
          <TouchableOpacity
            onPress={handleDeleteFromList}
            style={styles.btnMenu}>
            <TextComponent text="Delete from the list" size={11} />
          </TouchableOpacity>
        </SectionComponent>
      )}
      <NewOrDiscountComponent
        createAt={create_at}
        discount={discount}
        top={5}
        left={4}
      />
      <Portal>
        <DialogErrorIOS
          content="Invalid quantity, please try again later"
          isVisible={err_change_quantity}
          setIsvisble={seterr_change_quantity}
        />
      </Portal>
    </RowComponent>
  );
};

const styles = StyleSheet.create({
  btnMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.White_Color,
    borderRadius: handleSize(8),
    elevation: handleSize(3),
    height: handleSize(104),
    flex: 1,
  },
  image: {
    width: handleSize(100),
    height: '100%',
    borderBottomLeftRadius: handleSize(8),
    borderTopLeftRadius: handleSize(8),
  },
  containerContent: {
    padding: handleSize(11),
    justifyContent: 'space-between',
    height: '100%',
  },
  iconButton: {
    width: handleSize(26),
    height: handleSize(26),
    borderRadius: 100,
    backgroundColor: colors.White_Color,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: handleSize(4),
  },
  icon: {
    fontSize: 12,
    color: colors.Gray_Color,
  },
  iconMenu: {
    color: colors.Secondary_Text_Color,
    fontSize: handleSize(18),
  },
  menu: {
    width: handleSize(170),
    height: handleSize(96),
    backgroundColor: colors.White_Color,
    borderRadius: handleSize(8),
    position: 'absolute',
    right: handleSize(33),
    top: handleSize(-17),
    elevation: handleSize(5),
    zIndex: 1,
  },
});

export default ItemCartComponent;
