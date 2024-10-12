import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {productResponse} from '../../helper/types/product.type';
import {handleSize} from '../../utils/handleSize';
import TextComponent from '../texts/TextComponent';
import ItemColumnComponent from './items/ItemColumnComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {stackParamListMain} from '../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title: string;
  place: string;
  products: Array<productResponse>;
  marginTop?: number;
}

type stackProp = NativeStackNavigationProp<stackParamListMain, 'BottomTab'>;

const ProductsComponent: FC<Props> = ({title, place, products, marginTop}) => {
  const navigaiton = useNavigation<stackProp>();
  return (
    <SectionComponent flex={0} style={{height: 'auto'}}>
      <SpaceComponent height={marginTop ?? 46} />
      <RowComponent style={styles.headerItem}>
        <SectionComponent>
          <TextComponent text={title} size={34} font={fontFamilies.bold} />
          <SpaceComponent height={13} />
          <TextComponent text={place} size={11} color={colors.Gray_Color} />
        </SectionComponent>
        <TouchableOpacity>
          <TextComponent text="View all" size={11} />
        </TouchableOpacity>
      </RowComponent>
      <SpaceComponent height={22} />
      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <ItemColumnComponent
            name={item.name_product}
            trademark={item.name_brand}
            price={item.price_min}
            discount={item.discount}
            imageUrl={item.thumb}
            createAt={item.createdAt}
            reviewCount={item.countReview}
            star={item.averageRating}
            stock={item.inventory_quantity}
            isFavorite={item.isFavorite}
            style={styles.item_product}
            onPress={() => {
              navigaiton.navigate('DetailProductScreen', {
                product_id: item._id,
              });
            }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  item_product: {
    width: handleSize(150),
    marginRight: handleSize(10),
    flex: 0,
  },
  list: {
    paddingLeft: handleSize(14),
  },
  headerItem: {
    paddingHorizontal: handleSize(14),
  },
});

export default ProductsComponent;
