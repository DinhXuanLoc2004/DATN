import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {reviews_order} from '../../../helper/types/order.type';
import {useNavigation} from '@react-navigation/native';
import {handleSize} from '../../../utils/handleSize';
import {colors} from '../../../constants/colors';
import RowComponent from '../RowComponent';
import SpaceComponent from '../SpaceComponent';
import SectionComponent from '../SectionComponent';
import TextComponent from '../../texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import SalePriceComponent from '../../texts/SalePriceComponent';
import ButtonComponent from '../../buttons/ButtonComponent';
import {fotmatedAmount} from '../../../utils/fotmats';

interface Props {
  item: reviews_order;
}

type stackProp = StackNavigationProp<
  stackParamListMain,
  'ReviewProductsScreen'
>;

const ItemOrderReview: FC<Props> = ({item}) => {
  const navigaiton = useNavigation<stackProp>();
  const handleReview = () => {
    if (item.is_reviewed) {
    } else {
      navigaiton.navigate('ReviewScreen', {
        product_order_id: item.product_order_id,
      });
    }
  };
  return (
    <View style={{paddingBottom: handleSize(20)}}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigaiton.navigate({
            name: 'DetailProductScreen',
            params: {
              product_id: item.product_id,
            },
            key: Date.now.toString(),
          });
        }}>
        <RowComponent justify="flex-start">
          <Image source={{uri: item.thumb}} style={styles.img} />
          <SpaceComponent width={10} />
          <SectionComponent style={styles.containerContent}>
            <SpaceComponent height={10} />
            <TextComponent
              text={item.name_product}
              font={fontFamilies.semiBold}
              numberOfLines={1}
            />
            <SpaceComponent height={5} />
            <TextComponent
              text={`${item.name_brand} - ${item.name_category}`}
              size={11}
              color={colors.Gray_Color}
              font={fontFamilies.medium}
            />
            <SpaceComponent height={5} />
            <RowComponent justify="flex-start">
              <RowComponent>
                <TextComponent
                  text="Color: "
                  size={11}
                  color={colors.Gray_Color}
                />
                <TextComponent text={item.name_color} size={11} />
              </RowComponent>
              <SpaceComponent width={15} />
              <RowComponent>
                <TextComponent
                  text="Size: "
                  size={11}
                  color={colors.Gray_Color}
                />
                <TextComponent text={item.size} size={11} />
              </RowComponent>
            </RowComponent>
            <SpaceComponent height={5} />
            <RowComponent>
              <RowComponent>
                <TextComponent
                  text="Units: "
                  size={11}
                  color={colors.Gray_Color}
                />
                <TextComponent text={item.quantity.toString()} size={11} />
              </RowComponent>
              <RowComponent justify={'flex-end'}>
                <TextComponent
                  color={
                    item.discount > 0 ? colors.Primary_Color : colors.Text_Color
                  }
                  size={12}
                  font={fontFamilies.medium}
                  text={`${fotmatedAmount(
                    item.price - (item.price * item.discount) / 100,
                  )}`}
                  numberOfLines={1}
                />
                {item.discount > 0 && (
                  <RowComponent style={{flexShrink: 1}}>
                    <SpaceComponent width={5} />
                    <TextComponent
                      color={colors.Gray_Color}
                      size={12}
                      font={fontFamilies.medium}
                      text={`${fotmatedAmount(item.price)}`}
                      style={{
                        textDecorationLine: 'line-through',
                      }}
                      numberOfLines={1}
                    />
                  </RowComponent>
                )}
              </RowComponent>
            </RowComponent>
            <SpaceComponent height={5} />
            <TextComponent
              text={
                !item.is_reviewed
                  ? 'Please review the product!'
                  : 'The product has been reviewed.'
              }
              size={11}
              color={
                !item.is_reviewed ? colors.Primary_Color : colors.Text_Color
              }
            />
          </SectionComponent>
        </RowComponent>
        <ButtonComponent
          style={styles.btn}
          text={!item.is_reviewed ? 'Review' : 'See review'}
          onPress={handleReview}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ItemOrderReview;

const styles = StyleSheet.create({
  btn: {
    paddingVertical: handleSize(10),
    width: '30%',
    position: 'absolute',
    end: 0,
    bottom: handleSize(-20),
  },
  containerContent: {
    height: '100%',
    paddingEnd: handleSize(12),
  },
  img: {
    height: handleSize(115),
    width: handleSize(110),
    borderTopLeftRadius: handleSize(8),
    borderBottomLeftRadius: handleSize(8),
  },
  container: {
    width: '100%',
    height: handleSize(115),
    borderRadius: handleSize(8),
    backgroundColor: colors.White_Color,
    elevation: 3,
  },
});
