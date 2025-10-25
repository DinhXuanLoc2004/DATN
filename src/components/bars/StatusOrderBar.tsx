import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {order_status_name} from '../../helper/types/order_status.type';
import {payment_name} from '../../constants/payment_methods';
import RowComponent from '../layouts/RowComponent';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';
import SpaceComponent from '../layouts/SpaceComponent';
import SectionComponent from '../layouts/SectionComponent';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Box} from 'iconsax-react-native';

interface Props {
  current_status: order_status_name;
  payment_method: payment_name;
  previous_status: order_status_name;
}

const StatusOrderBar: FC<Props> = ({
  current_status,
  payment_method,
  previous_status,
}) => {
  let listStatus: order_status_name[] = [
    'Confirming',
    'Confirmed',
    'Delivering',
    'Delivered Successfully',
  ];
  if (payment_method !== 'COD' && current_status !== 'Unpaid')
    listStatus = ['Paid', ...listStatus];
  switch (current_status) {
    case 'Unpaid':
      listStatus = [current_status, ...listStatus];
      break;
    case 'Delivery Failed':
      listStatus = [
        ...listStatus.filter(item => item !== 'Delivered Successfully'),
        current_status,
      ];
      break;
    case 'Delivering':
      if (previous_status === 'Delivery Failed') {
        listStatus = [...listStatus, 'Delivery Failed', 'Delivering'];
      }
      break;
    default:
      break;
  }

  const currentIndex = listStatus.lastIndexOf(current_status);

  return (
    <RowComponent flex={1}>
      <>
        {listStatus.map((item, index) => {
          return (
            <SectionComponent
              style={{width: 'auto', alignItems: 'center'}}
              key={index.toString()}
              flex={1}>
              <RowComponent flex={0} style={{height: handleSize(30)}}>
                {
                  <SpaceComponent
                    height={5}
                    style={{
                      backgroundColor:
                        index === 0
                          ? colors.Transperen_Color
                          : index <= currentIndex
                          ? colors.Order_Status_Bar
                          : colors.Line_Status_Order,
                      flex: 1,
                    }}
                    width={100}
                  />
                }
                {index <= currentIndex ? (
                  <View
                    style={[
                      styles.containerBox,
                      {
                        backgroundColor:
                          current_status === 'Delivery Failed' &&
                          item === 'Delivery Failed'
                            ? colors.Primary_Color
                            : index <= currentIndex &&
                              item !== 'Delivery Failed'
                            ? colors.Order_Status_Bar
                            : colors.Dot_Status_Order,
                      },
                    ]}>
                    <Box size={18} color={colors.White_Color} />
                  </View>
                ) : (
                  <View style={styles.dot} />
                )}
                {
                  <SpaceComponent
                    height={5}
                    style={{
                      backgroundColor:
                        index === listStatus.length - 1
                          ? colors.Transperen_Color
                          : index < currentIndex
                          ? colors.Order_Status_Bar
                          : colors.Line_Status_Order,
                      flex: 1,
                    }}
                  />
                }
              </RowComponent>
              <SpaceComponent height={10} />
              <SectionComponent>
                <TextComponent
                  text={
                    item === 'Delivered Successfully'
                      ? 'Successfully'
                      : item === 'Delivery Failed'
                      ? 'Failed'
                      : item
                  }
                  numberOfLines={5}
                  style={{width: 120, textAlign: 'center'}}
                  size={11}
                  font={fontFamilies.medium}
                  color={
                    current_status === 'Delivery Failed' &&
                    item === 'Delivery Failed'
                      ? colors.Primary_Color
                      : index <= currentIndex && item !== 'Delivery Failed'
                      ? colors.Order_Status_Bar
                      : colors.Dot_Status_Order
                  }
                />
              </SectionComponent>
            </SectionComponent>
          );
        })}
      </>
    </RowComponent>
  );
};

export default StatusOrderBar;

const styles = StyleSheet.create({
  containerBox: {
    width: handleSize(25),
    height: handleSize(25),
    borderRadius: handleSize(25 / 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: colors.Dot_Status_Order,
    height: handleSize(13),
    width: handleSize(13),
    borderRadius: handleSize(13 / 2),
  },
});
