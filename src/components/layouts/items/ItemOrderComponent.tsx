import {StyleSheet, ViewStyle, StyleProp} from 'react-native';
import React, {FC} from 'react';
import RowComponent from '../RowComponent';
import {handleSize} from '../../../utils/handleSize';
import {colors} from '../../../constants/colors';
import SectionComponent from '../SectionComponent';
import TextComponent from '../../texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import ButtonComponent from '../../buttons/ButtonComponent';

interface Props {
  orderName: string;
  date: Date;
  trackingNumber: string;
  quantity: number;
  total: number;
  status: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const ItemOrderComponent: FC<Props> = ({
  orderName,
  date,
  trackingNumber,
  quantity,
  total,
  status,
  onPress,
  style,
}) => {
  return (
    <SectionComponent style={[styles.container, style]}>
      <RowComponent style={{marginHorizontal: 5}}>
        <TextComponent
          text={`Order ${orderName}`}
          font={fontFamilies.semiBold}
          size={16}
        />
        <TextComponent
          text={date.toLocaleDateString()}
          font={fontFamilies.regular}
          size={14}
          color={colors.Gray_Color}
        />
      </RowComponent>
      <RowComponent
        justify="flex-start"
        style={{marginHorizontal: 5, marginTop: 10}}>
        <TextComponent
          text="Tracking Number:  "
          font={fontFamilies.regular}
          size={14}
          color={colors.Gray_Color}
        />
        <TextComponent
          text={trackingNumber}
          font={fontFamilies.semiBold}
          size={14}
        />
      </RowComponent>
      <RowComponent
        justify="space-between"
        style={{marginHorizontal: 5, marginTop: 10}}>
        <RowComponent>
          <TextComponent
            text="Quantity:  "
            font={fontFamilies.regular}
            size={14}
            color={colors.Gray_Color}
          />
          <TextComponent
            text={`${quantity}`}
            font={fontFamilies.semiBold}
            size={14}
          />
        </RowComponent>
        <RowComponent>
          <TextComponent
            text="Total Amount:  "
            font={fontFamilies.regular}
            size={14}
            color={colors.Gray_Color}
          />
          <TextComponent
            text={`${total}$`}
            font={fontFamilies.semiBold}
            size={14}
          />
        </RowComponent>
      </RowComponent>
      <RowComponent
        justify="space-between"
        style={{marginHorizontal: 5, marginTop: 20}}>
        <ButtonComponent
          onPress={onPress}
          text="Details"
          colorText={colors.Text_Color}
          style={styles.buttonDetail}
        />
        <TextComponent
          text={status}
          font={fontFamilies.regular}
          size={14}
          color={colors.Success_Color}
        />
      </RowComponent>
    </SectionComponent>
  );
};

export default ItemOrderComponent;

const styles = StyleSheet.create({
  container: {
    height: handleSize(164),
    width: handleSize(343),
    flex: 0,
    padding: handleSize(16),
    backgroundColor: colors.White_Color,
    borderRadius: handleSize(10),
    marginBottom: handleSize(16),
    shadowColor: '#000',
    shadowOffset: {
      width: handleSize(0),
      height: handleSize(2),
    },
    shadowOpacity: handleSize(0.25),
    shadowRadius: handleSize(3.84),
    elevation: handleSize(5),
    alignSelf: 'center',
    top: 100,
  },
  buttonDetail: {
    width: handleSize(98),
    height: handleSize(36),
    backgroundColor: colors.Backgournd_Color,
    borderColor: colors.Text_Color,
  },
});
