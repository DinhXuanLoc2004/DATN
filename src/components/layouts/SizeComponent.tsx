import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {sizeType} from '../../helper/types/size.type';
import TextComponent from '../texts/TextComponent';
import {handleSize} from '../../utils/handleSize';
import RowComponent from './RowComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

interface Props {
  sizes_prop: sizeType[];
}

const SizeComponent: FC<Props> = ({sizes_prop}) => {
  const sizes = sizes_prop.slice(0, 3);
  return (
    <RowComponent justify="flex-start">
      {sizes.map((size, index) => (
        // <View key={index} style={styles.containerItemSize}>
        <TextComponent
          key={index}
          text={size.size}
          size={12}
          style={{marginRight: 3}}
          font={fontFamilies.semiBold}
        />
        // </View>
      ))}
    </RowComponent>
  );
};

export default SizeComponent;

const styles = StyleSheet.create({
  containerItemSize: {
    width: handleSize(20),
    height: handleSize(20),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.Primary_Color,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
  },
});
