import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {sale} from '../../../helper/types/sale.type';
import RowComponent from '../RowComponent';
import SpaceComponent from '../SpaceComponent';
import SectionComponent from '../SectionComponent';
import TextComponent from '../../texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import CountDownTime from '../times/CountDownTime';
import { handleSize } from '../../../utils/handleSize';

interface Props {
  item: sale;
  navigation: any;
}

const ItemSaleComponent: FC<Props> = ({item, navigation}) => {
  return (
    <RowComponent
      justify="flex-start"
      style={styles.item}
      onPress={() => {
        navigation.navigate('ProductsSaleScreen', {
          sale_id: item._id,
          name_sale: item.name_sale,
        });
      }}>
      <Image source={{uri: item.thumb}} style={styles.img} />
      <SpaceComponent width={10} />
      <SectionComponent style={styles.containerRigth}>
        <TextComponent
          text={item.name_sale}
          font={fontFamilies.medium}
          color={colors.Primary_Color}
          numberOfLines={1}
        />
        <SpaceComponent height={5} />
        <TextComponent
          text={`Sale: ${item.discount}%`}
          size={15}
          font={fontFamilies.medium}
          color={colors.Primary_Color}
        />
        <SpaceComponent height={20} />
        <CountDownTime time_end={item.time_end} />
      </SectionComponent>
    </RowComponent>
  );
};

export default ItemSaleComponent;

const styles = StyleSheet.create({
  containerRigth: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  img: {
    height: '100%',
    width: '50%',
    borderTopLeftRadius: handleSize(8),
    borderBottomLeftRadius: handleSize(8),
  },
  item: {
    height: handleSize(100),
    width: '100%',
    borderRadius: handleSize(8),
    backgroundColor: colors.White_Color,
    elevation: 3,
  },
});
