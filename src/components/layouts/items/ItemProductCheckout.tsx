import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SectionComponent from '../SectionComponent';
import TextComponent from '../../texts/TextComponent';
import SpaceComponent from '../SpaceComponent';
import RowComponent from '../RowComponent';
import SalePriceComponent from '../../texts/SalePriceComponent';
import {cartCheck} from '../../../helper/types/cart.type';
import {product_order} from '../../../helper/types/order.type';
import {fontFamilies} from '../../../constants/fontFamilies';
import {handleSize} from '../../../utils/handleSize';
import {colors} from '../../../constants/colors';

interface Props {
  item: cartCheck | product_order;
  navigation: any;
}

const ItemProductCheckout: FC<Props> = ({item, navigation}) => {
  return (
    <SectionComponent key={item.product_variant_id} style={styles.itemProduct}>
      <TextComponent
        text={item.name_product}
        size={14}
        font={fontFamilies.semiBold}
      />
      <SpaceComponent height={5} />
      <RowComponent
        onPress={() =>
          navigation.navigate({
            name: 'DetailProductScreen',
            params: {
              product_id: item.product_id,
            },
            key: `${item.product_id}_${Date.now()}`,
          })
        }>
        <Image source={{uri: item.thumb}} style={styles.imgProduct} />
        <SpaceComponent width={5} />
        <SectionComponent style={styles.containerContentProduct}>
          <SectionComponent>
            <TextComponent
              text={`${item.name_brand} - ${item.name_category}`}
              size={14}
              font={fontFamilies.medium}
            />
            <SpaceComponent height={5} />
            <RowComponent justify="flex-start">
              <RowComponent justify="flex-start" style={{opacity: 0.75}}>
                <TextComponent
                  text={`Size: ${item.size} - Color: ${item.name_color} `}
                  size={13}
                  font={fontFamilies.medium}
                />
                <View
                  style={[styles.viewColor, {backgroundColor: item.hex_color}]}
                />
              </RowComponent>
            </RowComponent>
          </SectionComponent>
          <RowComponent>
            <SectionComponent>
              <SalePriceComponent
                price={item.price}
                discount={item.total_discount}
                flex={0}
                flex_left={0}
                flex_right={0}
                justify="flex-start"
              />
            </SectionComponent>
            <TextComponent
              text={`x${item.quantity}`}
              size={12}
              font={fontFamilies.semiBold}
              color={colors.Gray_Color}
            />
          </RowComponent>
        </SectionComponent>
      </RowComponent>
      <SpaceComponent height={7} />
      <RowComponent>
        <TextComponent text="Total amount of item: " size={13} />
        <SalePriceComponent
          price={item.quantity * item.price}
          discount={item.total_discount}
          flex={1}
          justify='flex-start'
          flex_left={0}
        />
      </RowComponent>
      <View style={styles.line} />
    </SectionComponent>
  );
};

export default ItemProductCheckout;

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: handleSize(1),
    backgroundColor: colors.Gray_Color,
    marginVertical: handleSize(10),
    opacity: 0.5,
  },
  viewColor: {
    width: handleSize(14),
    height: handleSize(14),
    borderRadius: 100,
    elevation: 3,
  },
  containerContentProduct: {
    justifyContent: 'space-between',
    paddingVertical: handleSize(5),
  },
  itemProduct: {
    marginVertical: handleSize(3),
  },
  imgProduct: {
    width: handleSize(70),
    height: handleSize(70),
    borderRadius: handleSize(10),
  },
});
