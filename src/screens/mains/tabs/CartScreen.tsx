import {
  RouteProp,
  useNavigation
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import DialogIOSComponent from '../../../components/dialogs/DialogIOSComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import ItemCartComponent from '../../../components/layouts/items/ItemCartComponent';
import LinearGradientComponet from '../../../components/layouts/LinearGradientComponet';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import { colors } from '../../../constants/colors';
import { fontFamilies } from '../../../constants/fontFamilies';
import {
  getAllCartQueryKey
} from '../../../constants/queryKeys';
import {
  deleteCartAPI,
  getAllCartAPI
} from '../../../helper/apis/cart.api';
import { set_length_cart } from '../../../helper/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '../../../helper/store/store';
import { item_cart } from '../../../helper/types/cart.type';
import { stackParamListMain } from '../../../navigation/StackMainNavigation';
import { handleSize } from '../../../utils/handleSize';

type stackProp = StackNavigationProp<stackParamListMain, 'BottomTab'>;
type routeProp = RouteProp<stackParamListMain, 'CartScreen'>;

const CartScreen = ({route}: {route: routeProp}) => {
  const [isVisibleModal, setisVisibleModal] = useState<boolean>(false);
  const [cart_id_delete, setcart_id_delete] = useState<string>('');
  const [carts, setcarts] = useState<item_cart[]>([]);
  const [cartChecks, setcartChecks] = useState<string[]>([]);
  const [total_amount, settotal_amount] = useState<number>(0);
  const [checkAll, setcheckAll] = useState<boolean>(false);
  const user_id = useAppSelector(state => state.auth.user.userId);
  const {data, isLoading, error, refetch} = useQuery({
    queryKey: [getAllCartQueryKey, user_id],
    queryFn: getAllCartAPI,
  });
  const [cart_id_select_menu, setcart_id_select_menu] = useState<string>('');
  const {cart_id} = route?.params || {};
  const navigation = useNavigation<stackProp>()
  const flatListRef = useRef<FlatList>(null);


  useEffect(() => {
    if (cart_id) {
      setcartChecks([cart_id]);
    }
  }, [cart_id]);

  const scrollToItemIndex = useMemo(() => {
    return cart_id ? carts.findIndex(cart => cart._id === cart_id) : -1;
  }, [carts, cart_id]);

  useEffect(() => {
    if (scrollToItemIndex >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: scrollToItemIndex,
        animated: true,
      });
    }
  }, [scrollToItemIndex]);

  useEffect(() => {
    if (data?.metadata) setcarts(data.metadata);
  }, [data?.metadata]);

  const dispatch = useAppDispatch();

  const lengthCart = useAppSelector(state => state.auth.user.lengthCart);

  const handleDeleteCart = async () => {
    if (cart_id_delete) {
      const data = await deleteCartAPI(cart_id_delete);
      if (data?.metadata) {
        setisVisibleModal(false);
        refetch();
        dispatch(set_length_cart(lengthCart - 1));
      }
    }
  };

  const conditionChecked = (cart_id: string): boolean => {
    const isChecked = cartChecks.filter(_id => _id === cart_id);
    if (isChecked.length > 0) return true;
    return false;
  };

  const handleCheck = (cart_id: string) => {
    setcart_id_select_menu('');
    const isChecked = conditionChecked(cart_id);
    if (isChecked) {
      const newCarts = cartChecks.filter(cart => cart !== cart_id);
      setcartChecks(newCarts);
    } else {
      setcartChecks([...cartChecks, cart_id]);
    }
  };

  useEffect(() => {
    const cartChecked = carts
      .filter(cart => cartChecks.some(cart_id => cart_id === cart._id))
      .map(cart => cart.price * cart.quantity);

    const total = cartChecked.reduce((preValue, curentValue) => {
      return preValue + curentValue;
    }, 0);

    settotal_amount(total);

    if (carts.length === 0) {
      setcheckAll(false);
    } else {
      if (cartChecked.length === carts.length) {
        setcheckAll(true);
      } else {
        setcheckAll(false);
      }
    }
  }, [cartChecks, carts]);

  const handleCheckAll = () => {
    const negativeCheckAll = !checkAll;
    setcheckAll(negativeCheckAll);
    if (negativeCheckAll) {
      const cart_ids = carts.map(cart => cart._id);
      setcartChecks(cart_ids);
    } else {
      setcartChecks([]);
    }
  };

  return (
    <ContainerComponent
      isHeader
      title="My Cart"
      styleHeader={styles.header}
      back
      style={styles.container}>
      <SpaceComponent height={10} />
      <SectionComponent flex={0} style={[styles.containerList]}>
        <FlatList
          ref={flatListRef}
          data={carts}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: handleSize(104),
            offset: handleSize(104) * index,
            index,
          })}
          onScrollToIndexFailed={info => {
            flatListRef.current?.scrollToOffset({
              offset: info.averageItemLength * info.index,
              animated: true,
            });
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            }, 100);
          }}
          renderItem={({item}) => {
            return (
              <RowComponent style={styles.containerItemCart}>
                <TouchableOpacity
                  style={[
                    styles.btnCheck,
                    {
                      backgroundColor: conditionChecked(item._id)
                        ? colors.Primary_Color
                        : colors.Gray_Light_Color,
                      borderColor: conditionChecked(item._id)
                        ? colors.Primary_Color
                        : colors.Gray_Color,
                    },
                  ]}
                  onPress={() => handleCheck(item._id)}>
                  {conditionChecked(item._id) ? (
                    <FontAwesome5
                      name="check"
                      color={colors.White_Color}
                      size={15}
                    />
                  ) : (
                    <View />
                  )}
                </TouchableOpacity>
                <SpaceComponent width={7} />
                <ItemCartComponent
                  color={item.name_color}
                  create_at={item.create_at}
                  discount={0}
                  image_url={item.thumb}
                  name={item.name_product}
                  price={item.price}
                  quantity={item.quantity}
                  size={item.size}
                  cart_id={item._id}
                  fnRefect={refetch}
                  setisVisibleModal={setisVisibleModal}
                  setcart_id_delete={setcart_id_delete}
                  isFavorite={item.isFavorite}
                  cart_id_select_menu={cart_id_select_menu}
                  setcart_id_select_menu={setcart_id_select_menu}
                  product_id={item.product_id}
                />
              </RowComponent>
            );
          }}
          ItemSeparatorComponent={() => <SpaceComponent height={24} />}
        />
      </SectionComponent>

      <SectionComponent style={styles.containerFooter}>
        <LinearGradientComponet
          ArrColor={[colors.Transperen_Color, colors.Black_Color_RGBA]}
          style={{width: '100%', height: 7, opacity: 0.3}}
        />
        <SpaceComponent height={10} />
        <SectionComponent style={styles.paddingHorizatal}>
          <RowComponent>
            <RowComponent justify="flex-start">
              <TouchableOpacity
                onPress={handleCheckAll}
                style={[
                  styles.btnCheck,
                  {
                    backgroundColor: checkAll
                      ? colors.Primary_Color
                      : colors.Gray_Light_Color,
                    borderColor: checkAll
                      ? colors.Primary_Color
                      : colors.Gray_Color,
                  },
                ]}>
                {checkAll ? (
                  <FontAwesome5
                    name="check"
                    color={colors.White_Color}
                    size={15}
                  />
                ) : (
                  <View />
                )}
              </TouchableOpacity>
              <SpaceComponent width={5} />
              <TextComponent text="All" size={16} font={fontFamilies.medium} />
            </RowComponent>
            <RowComponent justify="flex-start">
              <TextComponent
                text="Total amount: "
                size={14}
                font={fontFamilies.medium}
                color={colors.Gray_Color}
              />
              <SpaceComponent width={5} />
              <TextComponent
                text={`${total_amount}$`}
                size={18}
                font={fontFamilies.semiBold}
              />
            </RowComponent>
          </RowComponent>
          <SpaceComponent height={10} />
          <ButtonComponent
            disable={cartChecks.length < 1}
            onPress={() => {navigation.navigate('CheckoutScreen', {cart_ids: cartChecks})}}
            text="Checkout"
            style={[
              styles.btnCheckout,
              {
                backgroundColor:
                  cartChecks.length > 0
                    ? colors.Primary_Color
                    : colors.Gray_Color,
                borderColor:
                  cartChecks.length > 0
                    ? colors.Primary_Color
                    : colors.Gray_Color,
              },
            ]}
          />
        </SectionComponent>
      </SectionComponent>
      <DialogIOSComponent
        isVisible={isVisibleModal}
        setIsVisible={setisVisibleModal}
        content="Are you sure you want to remove this product from your cart?"
        txtBtnRight="Delete"
        fnRight={handleDeleteCart}
      />
    </ContainerComponent>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  paddingHorizatal: {
    paddingHorizontal: handleSize(16),
  },
  containerList: {
    paddingHorizontal: handleSize(16),
    height: '83%',
  },
  container: {
    paddingHorizontal: 0,
  },
  btnCheckout: {
    elevation: 2,
  },
  containerFooter: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    paddingBottom: handleSize(15),
    backgroundColor: colors.White_Color,
    elevation: 5,
  },
  header: {
    backgroundColor: colors.White_Color,
    elevation: 5,
  },
  btnCheck: {
    width: handleSize(24),
    height: handleSize(24),
    borderRadius: handleSize(8),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItemCart: {width: '100%'},
});
