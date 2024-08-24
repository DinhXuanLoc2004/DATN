import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DoubleButtonComponent from '../../../components/buttons/DoubleButtonComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import ItemProductOrderComponent from '../../../components/layouts/items/ItemProductOrderComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import TextOrderInformation from '../../../components/texts/TextOrderInformation';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {handleDate} from '../../../utils/handleDate';
import {handleSize} from '../../../utils/handleSize';
import {onLayout} from '../../../utils/onLayout';

const OrderDetailScreen = () => {
  const [status, setstatus] = useState('Delivered');
  const productsOrderExample = [
    {
      img: 'https://th.bing.com/th/id/R.40dab7893a187d62cb310120d0947903?rik=20HbPQ4AYthKlA&pid=ImgRaw&r=0',
      category: 'Pullover',
      brand: 'Mango',
      color: 'Gray',
      size: 'L',
      quantity: 2,
      price: 51,
    },
    {
      img: 'https://th.bing.com/th/id/R.40dab7893a187d62cb310120d0947903?rik=20HbPQ4AYthKlA&pid=ImgRaw&r=0',
      category: 'Pullover',
      brand: 'Mango',
      color: 'Gray',
      size: 'L',
      quantity: 2,
      price: 51,
    },
    {
      img: 'https://th.bing.com/th/id/R.40dab7893a187d62cb310120d0947903?rik=20HbPQ4AYthKlA&pid=ImgRaw&r=0',
      category: 'Pullover',
      brand: 'Mango',
      color: 'Gray',
      size: 'L',
      quantity: 2,
      price: 51,
    },
    {
      img: 'https://th.bing.com/th/id/R.40dab7893a187d62cb310120d0947903?rik=20HbPQ4AYthKlA&pid=ImgRaw&r=0',
      category: 'Pullover',
      brand: 'Mango',
      color: 'Gray',
      size: 'L',
      quantity: 2,
      price: 51,
    },
  ];
  const [height_bottom, setheight_bottom] = useState<number>(0);
  return (
    <ContainerComponent
      isHeader
      back
      title="Order Details"
      rightIcon={
        <Ionicons
          name="search"
          size={handleSize(24)}
          color={colors.Text_Color}
        />
      }
      styleHeader={styles.containerHeader}
      style={styles.container}>
      <ContainerComponent isScroll style={{paddingBottom: height_bottom}}>
        <SpaceComponent height={31} />
        <RowComponent>
          <TextComponent text="Order No1947034" font={fontFamilies.semiBold} />
          <TextComponent
            text={handleDate.formatDate(new Date())}
            size={14}
            color={colors.Gray_Color}
          />
        </RowComponent>
        <SpaceComponent height={15} />
        <RowComponent>
          <RowComponent justify="flex-start" style={{width: '68%'}}>
            <TextComponent
              text="Tracking number: "
              size={14}
              color={colors.Gray_Color}
            />
            <TextComponent
              text="IW3475453455"
              size={14}
              font={fontFamilies.medium}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </RowComponent>
          <TextComponent
            text={status}
            size={14}
            font={fontFamilies.medium}
            color={
              status === 'Delivered'
                ? colors.Success_Color
                : status === 'Processing'
                ? colors.Star_Color
                : colors.Primary_Color
            }
          />
        </RowComponent>
        <SpaceComponent height={18} />
        <TextComponent
          text={`${productsOrderExample.length} items`}
          size={14}
          font={fontFamilies.medium}
        />
        <SpaceComponent height={16} />
        {productsOrderExample.map((item, index) => (
          <ItemProductOrderComponent
            category={item.category}
            brand={item.brand}
            color={item.color}
            size={item.size}
            price={item.price}
            quantity={item.quantity}
            thumb={item.img}
            key={index}
          />
        ))}
        <TextComponent
          text="Order information"
          size={14}
          font={fontFamilies.medium}
        />
        <SpaceComponent height={15} />
        <TextOrderInformation
          lable="Shipping Address:"
          content="74m/1 đường HT44, khu phố 3, phường Hiệp Thành, quận 12, thành phố HCM"
        />
        <SpaceComponent height={26} />
        <TextOrderInformation lable="Payment method:" content="Zalo pay" />
        <SpaceComponent height={26} />
        <TextOrderInformation lable="Delivery method:" content="Zalo pay" />
        <SpaceComponent height={26} />
        <TextOrderInformation lable="Discount:" content="Zalo pay" />
        <SpaceComponent height={26} />
        <TextOrderInformation lable="Total Amount:" content="Zalo pay" />
        <SpaceComponent height={34} />
      </ContainerComponent>
      <DoubleButtonComponent
        textBtnLeft="Reorder"
        textBtnRight="Leave feedback"
        onPressBtnLeft={() => {}}
        onPressBtnRigth={() => {}}
        bottom={0}
        zIndex={1}
        backgroundColor={colors.White_Color}
        onLayout={event => onLayout(event, setheight_bottom)}
      />
    </ContainerComponent>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.White_Color,
    elevation: handleSize(1),
  },
  container: {
    paddingHorizontal: 0,
  },
});
