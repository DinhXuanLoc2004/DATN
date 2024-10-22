import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DialogIOSComponent from '../../../components/dialogs/DialogIOSComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import ItemCartComponent from '../../../components/layouts/items/ItemCartComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import {colors} from '../../../constants/colors';
import {deleteCartAPI, getAllCartAPI} from '../../../helper/apis/cart.api';
import {item_cart} from '../../../helper/types/cart.type';
import {handleSize} from '../../../utils/handleSize';
import SectionComponent from '../../../components/layouts/SectionComponent';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {useAppSelector} from '../../../helper/store/store';
import { getAllCartQueryKey } from '../../../constants/queryKeys';

const CartScreen = () => {
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
  const [cart_id_select_menu, setcart_id_select_menu] = useState<string>('')

  useEffect(() => {
    if (data?.metadata) setcarts(data.metadata);
  }, [data?.metadata]);

  const handleDeleteCart = async () => {
    if (cart_id_delete) {
      const data = await deleteCartAPI(cart_id_delete);
      if (data?.metadata) {
        setisVisibleModal(false);
        refetch();
      }
    }
  };

  const conditionChecked = (cart_id: string): boolean => {
    const isChecked = cartChecks.filter(_id => _id === cart_id);
    if (isChecked.length > 0) return true;
    return false;
  };

  const handleCheck = (cart_id: string) => {
    setcart_id_select_menu('')
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
    <ContainerComponent isHeader title="My Cart" styleHeader={styles.header}>
      <SpaceComponent height={10} />
      <FlatList
        data={carts}
        keyExtractor={item => item._id}
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

      <SectionComponent style={styles.containerFooter}>
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
          onPress={() => {}}
          text="Checkout"
          style={styles.btnCheckout}
        />
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
