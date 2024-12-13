import React, {FC, useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
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
  styleContainer?: StyleProp<ViewStyle>;
  sizeTitle?: number;
}

type stackProp = NativeStackNavigationProp<stackParamListMain, 'BottomTab'>;

const ProductsComponent: FC<Props> = ({
  title,
  place,
  products,
  marginTop,
  styleContainer,
  sizeTitle,
}) => {
  const navigaiton = useNavigation<stackProp>();
  const [is_view_all, setis_view_all] = useState(false);
  return (
    <SectionComponent flex={0} style={{height: 'auto'}}>
      <SpaceComponent height={marginTop ?? 46} />
      <RowComponent style={[styles.headerItem, styleContainer]}>
        <SectionComponent>
          <TextComponent
            text={title}
            size={sizeTitle ?? 34}
            font={fontFamilies.bold}
          />
          <SpaceComponent height={13} />
          <TextComponent text={place} size={11} color={colors.Gray_Color} />
        </SectionComponent>
        <TouchableOpacity
          onPress={() => setis_view_all(!is_view_all)}
          style={styles.btn_view_all}>
          <TextComponent
            text={is_view_all ? 'Collapse' : 'View all'}
            size={11}
          />
        </TouchableOpacity>
      </RowComponent>
      <SpaceComponent height={22} />
      <FlatList
        style={[styles.list, styleContainer]}
        data={products}
        keyExtractor={(item, index) => item._id}
        renderItem={({item, index}) => (
          <View
            style={{
              paddingEnd:
                !is_view_all && index === products.length ? handleSize(16) : 0,
              paddingBottom: 10,
            }}>
            <ItemColumnComponent
              item={item}
              style={[styles.item_product]}
              onPress={() => {
                navigaiton.navigate({
                  name: 'DetailProductScreen',
                  params: {
                    product_id: item._id,
                  },
                  key: `${Date.now()}`,
                });
              }}
            />
          </View>
        )}
        horizontal={!is_view_all}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!is_view_all}
        numColumns={is_view_all ? 2 : 1}
        key={is_view_all ? 2 : 1}
        columnWrapperStyle={is_view_all ? styles.row : null}
        ItemSeparatorComponent={() => (
          <SpaceComponent width={!is_view_all ? 15 : 0} />
        )}
      />
      {/* <SpaceComponent height={10} /> */}
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  btn_view_all: {
    padding: handleSize(10),
    alignItems: 'flex-end',
  },
  item_product: {
    width: handleSize(164),
    flex: 0,
  },
  list: {
    paddingHorizontal: handleSize(16),
  },
  headerItem: {
    paddingHorizontal: handleSize(14),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: handleSize(18),
  },
});

export default ProductsComponent;
