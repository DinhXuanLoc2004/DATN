import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Add, Minus, ShoppingCart, TickCircle} from 'iconsax-react-native';
import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {getAllCartQueryKey} from '../../../constants/queryKeys';
import {addToCartAPI} from '../../../helper/apis/cart.api';
import {getColorsSizesToProduct} from '../../../helper/apis/product.api';
import {
  findImageColorProductVariant,
  findProductVariant,
  findSizeProductVariant,
} from '../../../helper/apis/product_variant.api';
import {product_variant} from '../../../helper/types/product_variant.type';
import {sizeType} from '../../../helper/types/size.type';
import {handleSize} from '../../../utils/handleSize';
import {onLayout} from '../../../utils/onLayout';
import TextComponent from '../../texts/TextComponent';
import RowComponent from '../RowComponent';
import SectionComponent from '../SectionComponent';
import SpaceComponent from '../SpaceComponent';
import CustomBottomSheet from './CustomBottomSheet';

interface Props {
  product_id: string;
  bottomSheet: React.RefObject<BottomSheetModalMethods>;
}

const BottomSheetAddToCart: FC<Props> = ({product_id, bottomSheet}) => {
  const [dataColorsSizes, setdataColorsSizes] = useState<{
    thumb: string;
    variant: {
      _id: null;
      quantity_default: number;
      price_min: number;
      sizes: Array<sizeType>;
      image_colors: Array<{
        _id: string;
        url: string;
        name_color: string;
        hex_color: string;
      }>;
      price_max: number;
    };
  }>();

  const [quantity, setquantity] = useState<number>(1);
  const [image_color_id, setimage_color_id] = useState<string>('');
  const [size_id, setsize_id] = useState<string>('');
  const [productVariant, setproductVariant] =
    useState<product_variant | null>();
  const [size_ids, setsize_ids] = useState<string[]>([]);
  const [image_color_ids, setimage_color_ids] = useState<string[]>([]);
  const [inventoty, setinventoty] = useState<number>(0);
  const [errQuantity, seterrQuantity] = useState<string>('');

  const {
    data: data_colors_sizes,
    isLoading: isLoading_colors_sizes,
    error: error_colors_sizes,
  } = useQuery({
    queryKey: ['getColorsSizesToProduct', product_id],
    queryFn: getColorsSizesToProduct,
    enabled: !!product_id,
  });

  const {
    data: data_product_variant,
    isLoading: isLoading_product_variant,
    error: err_product_variant,
  } = useQuery({
    queryKey: ['findProductVariant', product_id, image_color_id, size_id],
    queryFn: findProductVariant,
    enabled: true,
  });

  useEffect(() => {
    if (data_colors_sizes?.metadata !== undefined) {
      setdataColorsSizes(data_colors_sizes?.metadata);
      setinventoty(data_colors_sizes.metadata.variant.quantity_default);
      findImageColor();
    }
  }, [data_colors_sizes?.metadata]);

  useEffect(() => {
    setproductVariant(data_product_variant?.metadata.variant);
    if (data_product_variant?.metadata.variant) {
      setinventoty(data_product_variant.metadata.variant.quantity);
    } else {
      setinventoty(data_colors_sizes?.metadata.variant.quantity_default ?? 0);
    }
  }, [data_product_variant?.metadata.variant]);

  const handleSetQuantity = (numUpdate: number) => {
    if (numUpdate > 0) {
      if (quantity >= inventoty) {
        setquantity(inventoty);
      } else {
        setquantity(quantity + numUpdate);
      }
    } else {
      if (quantity === 1) {
        setquantity(1);
      } else {
        setquantity(quantity + numUpdate);
      }
    }
  };

  const [contentHeight, setcontentHeight] = useState<number>(55);

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: offsetX.value},
      {translateY: offsetY.value},
      {scale: scale.value},
    ],
    opacity: opacity.value,
  }));

  const offsetXIconCart = useSharedValue(0);
  const opacityIconCart = useSharedValue(1);
  const opacityIconTick = useSharedValue(0);
  const rotateYIconTick = useSharedValue(180);
  const scaleIconTick = useSharedValue(1);

  const animatedStyleIconCart = useAnimatedStyle(() => ({
    transform: [{translateX: offsetXIconCart.value}],
    opacity: opacityIconCart.value,
  }));

  const animatedStyleIconTick = useAnimatedStyle(() => ({
    transform: [
      {rotateY: `${rotateYIconTick.value}deg`},
      {scale: scaleIconTick.value},
    ],
    opacity: opacityIconTick.value,
  }));

  const animatedStyleTextAddToCart = useAnimatedStyle(() => ({
    opacity: opacityIconCart.value,
  }));

  const DURATION_ANIMATION: number = 2000;

  const queryClient = useQueryClient();

  const handleAnimationBtnAddToCart = () => {
    offsetX.value = withTiming(130, {duration: DURATION_ANIMATION / 2}, () => {
      offsetY.value = withTiming(
        300,
        {duration: DURATION_ANIMATION / 2},
        () => {
          offsetX.value = 0;
          offsetY.value = 0;
          opacity.value = 1;
          scale.value = 1;
        },
      );
    });
    offsetY.value = withTiming(50, {duration: DURATION_ANIMATION / 2});
    opacity.value = withTiming(0.1, {duration: DURATION_ANIMATION});
    scale.value = withTiming(0.25, {duration: DURATION_ANIMATION});
    offsetXIconCart.value = withTiming(
      300,
      {duration: DURATION_ANIMATION + 500},
      () => {
        offsetXIconCart.value = 0;
        opacityIconCart.value = 1;
      },
    );
    opacityIconCart.value = withTiming(0, {duration: DURATION_ANIMATION + 500});
    opacityIconTick.value = withTiming(1, {duration: DURATION_ANIMATION + 500});
    rotateYIconTick.value = withTiming(0, {duration: DURATION_ANIMATION + 500});
    scaleIconTick.value = withTiming(
      1.25,
      {duration: DURATION_ANIMATION / 2 + 500},
      () => {
        scaleIconTick.value = withTiming(
          1,
          {duration: DURATION_ANIMATION / 2 + 500},
          () => {
            (opacityIconTick.value = 0),
              (rotateYIconTick.value = 180),
              (scaleIconTick.value = 1);
          },
        );
      },
    );
  };

  const handleAddToCart = async () => {
    if (productVariant && productVariant !== null) {
      const dataAddToCart = await addToCartAPI({
        product_variant_id: productVariant._id,
        quantity: quantity,
      });
      if (dataAddToCart) {
        handleAnimationBtnAddToCart();
        setTimeout(() => {
          bottomSheet.current?.close();
        }, DURATION_ANIMATION + 650);
        queryClient.invalidateQueries({queryKey: [getAllCartQueryKey]});
      }
    }
  };

  const findSize = async () => {
    if (conditionBtnSize(size_id)) setsize_id('');
    const data = await findSizeProductVariant(product_id, image_color_id);
    if (data?.metadata) setsize_ids(data.metadata);
  };

  const conditionBtnSize = (size_id: string) => {
    return (
      size_ids.length > 0 &&
      size_ids.filter(_id => _id === size_id).length === 0
    );
  };

  useEffect(() => {
    if (image_color_id) findSize();
    else setsize_ids([]);
  }, [image_color_id]);

  const findImageColor = async () => {
    if (conditionBtnColor(image_color_id)) setimage_color_id('');
    const data = await findImageColorProductVariant(product_id);
    if (data?.metadata) setimage_color_ids(data.metadata);
  };

  const conditionBtnColor = (image_color_id: string) => {
    return (
      image_color_ids.length > 0 &&
      image_color_ids.filter(_id => _id === image_color_id).length === 0
    );
  };

  const handleSetQuantityTextInput = (val: number) => {
    if (val > 0) {
      if (val > inventoty) {
        setquantity(inventoty);
      } else {
        setquantity(val);
      }
    } else {
      setquantity(1);
    }
  };

  useEffect(() => {
    if (quantity > inventoty) {
      seterrQuantity(
        'The quantity of the selected product exceeds the inventory quantity!',
      );
    } else {
      seterrQuantity('');
    }
  }, [inventoty, quantity]);

  return (
    <CustomBottomSheet
      bottomSheet={bottomSheet}
      snapPoint={['50%', contentHeight]}
      content={
        <View style={styles.containerBottomSheet}>
          {isLoading_colors_sizes ? (
            <SectionComponent style={styles.containerLoading}>
              <ActivityIndicator size={'large'} color={colors.Primary_Color} />
            </SectionComponent>
          ) : (
            <SectionComponent
              flex={0}
              onLayout={e => onLayout(e, setcontentHeight)}>
              <RowComponent justify="flex-start">
                {dataColorsSizes?.thumb && (
                  <View>
                    <Image
                      source={{
                        uri:
                          image_color_id &&
                          dataColorsSizes?.variant.image_colors.filter(
                            item => item._id === image_color_id,
                          )
                            ? dataColorsSizes.variant.image_colors.filter(
                                item => item._id === image_color_id,
                              )[0].url
                            : dataColorsSizes?.thumb,
                      }}
                      style={styles.thumb}
                    />
                    <Animated.Image
                      source={{
                        uri:
                          image_color_id &&
                          dataColorsSizes?.variant.image_colors.filter(
                            item => item._id === image_color_id,
                          )
                            ? dataColorsSizes.variant.image_colors.filter(
                                item => item._id === image_color_id,
                              )[0].url
                            : dataColorsSizes?.thumb,
                      }}
                      style={[
                        styles.thumb,
                        {position: 'absolute', zIndex: 1000},
                        animatedStyle,
                      ]}
                    />
                  </View>
                )}
                <SpaceComponent width={10} />
                <SectionComponent style={styles.containerPriceAndInventory}>
                  <SpaceComponent height={20} />
                  <TextComponent
                    text={
                      productVariant && productVariant !== undefined
                        ? `${productVariant.price * quantity}$`
                        : `${dataColorsSizes?.variant.price_min} - ${dataColorsSizes?.variant.price_max}$`
                    }
                    size={17}
                    font={fontFamilies.semiBold}
                  />
                  <SpaceComponent height={5} />
                  <RowComponent justify="flex-start" style={{flexWrap: 'wrap'}}>
                    <TextComponent
                      text="Inventory: "
                      size={14}
                      color={colors.Gray_Color}
                    />
                    <TextComponent
                      text={
                        !image_color_id && !size_id && dataColorsSizes?.variant
                          ? dataColorsSizes.variant.quantity_default.toString()
                          : !image_color_id || !size_id
                          ? 'Please select both size and color!'
                          : !image_color_id
                          ? 'Please select color'
                          : !size_id
                          ? 'Please select size'
                          : productVariant &&
                            productVariant !== null &&
                            productVariant.quantity > 0
                          ? productVariant.quantity.toString()
                          : 'Please select both size and color!'
                      }
                      size={14}
                      font={fontFamilies.medium}
                    />
                  </RowComponent>
                </SectionComponent>
              </RowComponent>
              <SpaceComponent style={styles.line} />
              <TextComponent text="Color" font={fontFamilies.medium} />
              <SpaceComponent height={10} />
              {dataColorsSizes?.variant.image_colors.length &&
                dataColorsSizes.variant.image_colors.length > 0 && (
                  <RowComponent
                    style={styles.containerList}
                    justify="flex-start">
                    {dataColorsSizes.variant.image_colors.map((item, index) => (
                      <RowComponent
                        disable={conditionBtnColor(item._id)}
                        onPress={() =>
                          setimage_color_id(
                            item._id === image_color_id ? '' : item._id,
                          )
                        }
                        style={[
                          styles.imageColor,
                          {
                            borderColor:
                              item._id === image_color_id
                                ? colors.Primary_Color
                                : colors.Gray_Light_Color,
                            opacity: conditionBtnColor(item._id) ? 0.3 : 1,
                          },
                        ]}
                        key={item._id}>
                        <Image source={{uri: item.url}} style={styles.imgs} />
                        <SpaceComponent width={5} />
                        <TextComponent text={item.name_color} size={15} />
                      </RowComponent>
                    ))}
                  </RowComponent>
                )}
              <SpaceComponent style={[styles.line, {marginTop: 0}]} />
              <TextComponent text="Size" font={fontFamilies.medium} />
              <SpaceComponent height={10} />
              {dataColorsSizes?.variant.sizes &&
                dataColorsSizes.variant.sizes.length > 0 && (
                  <RowComponent
                    style={styles.containerList}
                    justify="flex-start">
                    {dataColorsSizes.variant.sizes.map((item, index) => (
                      <RowComponent
                        style={[
                          styles.containerSize,
                          {
                            borderColor: conditionBtnSize(item._id)
                              ? colors.Gray_Color
                              : item._id === size_id
                              ? colors.Primary_Color
                              : colors.Gray_Color,
                            opacity: conditionBtnSize(item._id) ? 0.3 : 1,
                          },
                        ]}
                        justify="center"
                        key={item._id}
                        disable={conditionBtnSize(item._id)}
                        onPress={() =>
                          setsize_id(item._id === size_id ? '' : item._id)
                        }>
                        <TextComponent
                          text={item.size}
                          size={14}
                          font={fontFamilies.medium}
                        />
                      </RowComponent>
                    ))}
                  </RowComponent>
                )}
              <SpaceComponent style={[styles.line, {marginTop: 0}]} />
              <RowComponent>
                <TextComponent text="Quantity:" font={fontFamilies.medium} />
                <RowComponent
                  justify="flex-start"
                  style={styles.containerQuantity}>
                  <TouchableOpacity
                    style={[
                      styles.btnMinus,
                      {opacity: quantity === 1 ? 0.5 : 1},
                    ]}
                    disabled={quantity === 1}
                    onPress={() => handleSetQuantity(-1)}>
                    <Minus size={24} color={colors.Text_Color} />
                  </TouchableOpacity>
                  <TextInput
                    keyboardType="number-pad"
                    value={quantity.toString()}
                    onChangeText={(val: string) =>
                      handleSetQuantityTextInput(Number(val))
                    }
                    style={styles.txtQuantity}
                  />
                  <TouchableOpacity
                    style={[
                      styles.btnRight,
                      {opacity: quantity >= inventoty ? 0.5 : 1},
                    ]}
                    disabled={quantity >= inventoty}
                    onPress={() => handleSetQuantity(1)}>
                    <Add size={24} color={colors.Text_Color} />
                  </TouchableOpacity>
                </RowComponent>
              </RowComponent>
              {errQuantity && (
                <SectionComponent style={{width: '100%'}} flex={0}>
                  <SpaceComponent height={10} />
                  <TextComponent
                    text={errQuantity}
                    color={colors.Primary_Color}
                    size={14}
                    font={fontFamilies.medium}
                  />
                </SectionComponent>
              )}
              <SpaceComponent height={10} />
              <TouchableOpacity
                onPress={handleAddToCart}
                disabled={
                  !productVariant ||
                  productVariant === null ||
                  productVariant.quantity === 0 ||
                  quantity > inventoty
                }
                style={[
                  styles.btnAddToCart,
                  {
                    backgroundColor:
                      productVariant &&
                      productVariant !== null &&
                      productVariant.quantity > 0 &&
                      quantity <= inventoty
                        ? colors.Primary_Color
                        : colors.Gray_Color,
                    borderColor:
                      productVariant &&
                      productVariant !== null &&
                      productVariant.quantity > 0 &&
                      quantity <= inventoty
                        ? colors.Primary_Color
                        : colors.Gray_Color,
                  },
                ]}>
                <RowComponent flex={1} style={styles.containerContentAddToCart}>
                  <Animated.View style={animatedStyleIconCart}>
                    <ShoppingCart size={24} color={colors.White_Color} />
                  </Animated.View>
                  <Animated.Text
                    style={[styles.txtAddToCart, animatedStyleTextAddToCart]}>
                    Add to cart
                  </Animated.Text>
                  <Animated.View style={animatedStyleIconTick}>
                    <TickCircle size={24} color={colors.White_Color} />
                  </Animated.View>
                </RowComponent>
              </TouchableOpacity>
              <SpaceComponent height={50} />
            </SectionComponent>
          )}
        </View>
      }
    />
  );
};

export default BottomSheetAddToCart;

const styles = StyleSheet.create({
  containerContentAddToCart: {
    width: '100%',
    paddingHorizontal: handleSize(20),
  },
  txtAddToCart: {
    fontSize: handleSize(14),
    color: colors.White_Color,
    fontFamily: fontFamilies.medium,
  },
  btnAddToCart: {
    width: '100%',
    height: handleSize(48),
    borderRadius: handleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  btnRight: {
    height: '100%',
    borderWidth: 1,
    borderColor: colors.Text_Color,
    borderTopRightRadius: handleSize(8),
    borderBottomRightRadius: handleSize(8),
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtQuantity: {
    height: '100%',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color: colors.Text_Color,
    fontSize: handleSize(14),
    textAlign: 'center',
    paddingVertical: 0,
  },
  btnMinus: {
    height: '100%',
    borderWidth: 1,
    borderColor: colors.Text_Color,
    borderTopLeftRadius: handleSize(8),
    borderBottomLeftRadius: handleSize(8),
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerQuantity: {
    height: handleSize(24),
  },
  containerSize: {
    height: handleSize(30),
    width: handleSize(60),
    backgroundColor: colors.Gray_Light_Color,
    borderRadius: handleSize(8),
    alignItems: 'center',
    marginRight: handleSize(10),
    borderWidth: 1,
  },
  containerList: {
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: handleSize(10),
  },
  imgs: {
    width: handleSize(35),
    height: handleSize(35),
    borderRadius: 4,
  },
  imageColor: {
    height: handleSize(40),
    width: 'auto',
    padding: 5,
    borderRadius: 4,
    backgroundColor: colors.Gray_Light_Color,
    marginRight: handleSize(10),
    borderWidth: 1,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.Gray_Color,
    marginTop: handleSize(10),
    marginBottom: handleSize(20),
  },
  containerPriceAndInventory: {
    justifyContent: 'flex-end',
  },
  thumb: {
    width: handleSize(80),
    height: handleSize(80),
    borderRadius: handleSize(10),
  },
  containerLoading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBottomSheet: {
    paddingHorizontal: handleSize(16),
  },
});
