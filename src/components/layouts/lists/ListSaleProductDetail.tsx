import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {saleProductDetail} from '../../../helper/types/product.type';
import SectionComponent from '../SectionComponent';
import RowComponent from '../RowComponent';
import {handleSize} from '../../../utils/handleSize';
import {colors} from '../../../constants/colors';
import {Image} from 'react-native';
import SpaceComponent from '../SpaceComponent';
import TextComponent from '../../texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import CountDownTime from '../times/CountDownTime';
import {ArrowRight2} from 'iconsax-react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';

interface Props {
  sales: saleProductDetail[];
}

type stackProp = StackNavigationProp<stackParamListMain, 'DetailProductScreen'>;

const ListSaleProductDetail: FC<Props> = ({sales}) => {
  const navigation = useNavigation<stackProp>();
  return (
    <SectionComponent>
      {sales &&
        sales.map(item => (
          <RowComponent
            key={item._id}
            style={styles.containerItem}
            onPress={() =>
              navigation.navigate('ProductsSaleScreen', {
                name_sale: item.name_sale,
                sale_id: item._id,
              })
            }>
            <RowComponent justify="flex-start">
              {item.image_sale && (
                <RowComponent>
                  <Image source={{uri: item.image_sale}} style={styles.img} />
                  <SpaceComponent width={10} />
                </RowComponent>
              )}
              <SectionComponent flex={0.8}>
                <TextComponent
                  text={`${item.name_sale} - ${item.discount}%`}
                  size={16}
                  font={fontFamilies.medium}
                  color={colors.Primary_Color}
                  numberOfLines={2}
                />
                <SpaceComponent height={5} />
                <CountDownTime time_end={item.time_end} />
              </SectionComponent>
            </RowComponent>
            <ArrowRight2 size={handleSize(25)} color={colors.Gray_Color} />
          </RowComponent>
        ))}
    </SectionComponent>
  );
};

export default ListSaleProductDetail;

const styles = StyleSheet.create({
  img: {
    width: handleSize(50),
    height: handleSize(50),
    borderRadius: handleSize(8),
  },
  containerItem: {
    width: '100%',
    height: handleSize(50),
    paddingHorizontal: handleSize(16),
    alignItems: 'center',
    marginVertical: handleSize(5)
  },
});
