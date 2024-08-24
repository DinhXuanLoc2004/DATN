import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import {colors} from '../../../constants/colors';
import {handleSize} from '../../../utils/handleSize';
import Icon from 'react-native-vector-icons/Ionicons';

import SliderImageComponent from '../../../components/layouts/SliderImageComponent';
import MenuSelectComponent from '../../../components/layouts/selects/MenuSeclectComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import TextComponent from '../../../components/texts/TextComponent';
import StarComponent from '../../../components/layouts/StarComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import ItemColumnComponent from '../../../components/layouts/items/ItemColumnComponent';
const DetailProductScreen = () => {
  const optionsSize = [
    {label: 'S', value: 'option1'},
    {label: 'M', value: 'option2'},
    {label: 'L', value: 'option3'},
  ];
  const optionsColor = [
    {label: 'Black', value: 'option1'},
    {label: 'Red', value: 'option2'},
    {label: 'Blue', value: 'option3'},
  ];
  const suggestedProducts = [
    {
      trademark: 'Brand1',
      name: '1111',
      price: 1,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
      color: 'blue',
      size: 13,
      star: 11,
      stock: 1,
      discount: 2,
      createAt: new Date(),
      isFavorited: true,
      isItemFavorited: true,
    },
    {
      trademark: 'Brand2',
      name: '1111',
      price: 1,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
      color: 'blue',
      size: 13,
      star: 11,
      stock: 1,
      discount: 2,
      createAt: new Date(),
      isFavorited: true,
      isItemFavorited: true,
    },
    {
      trademark: 'Brand3',
      name: '1111',
      price: 1,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
      color: 'blue',
      size: 13,
      star: 11,
      stock: 1,
      discount: 2,
      createAt: new Date(),
      isFavorited: true,
      isItemFavorited: true,
    },
    {
      trademark: 'Brand3',
      name: '1111',
      price: 1,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
      color: 'blue',
      size: 13,
      star: 11,
      stock: 1,
      discount: 2,
      createAt: new Date(),
      isFavorited: true,
      isItemFavorited: true,
    },
  ];

  const imageUrls = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTkilv8oyOyUfEMb3iggiSPNpDwdYb2XuH3KZN9oD05UwflZxRPZ8GCQ6yBeYz-tPe0Uc&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSln9WpLySNBzXx6ostIfYPlm5RZPqVcW4ECSqe4hb-omZs1Y8yi35_fTvzSLnREhbhfUc&usqp=CAU',
  ];
  const renderItem = ({item}) => {
    return (
      <ItemColumnComponent
        style={{width: 200, height: 300, marginHorizontal: 10}}
        trademark={item.trademark}
        name={item.name}
        price={item.price}
        color={item.color}
        imageUrl={item.img}
        size={item.size}
        star={item.star}
        stock={item.stock}
        createAt={item.createAt}
        isFavorited={item.isFavorited}
        isItemFavorited={item.isItemFavorited}
      />
    );
  };
  return (
    <ContainerComponent
      style={styles.container}
      isHeader
      back
      isScroll
      title="Short Dress"
      rightIcon={
        <Icon
          style={styles.iconShare}
          name="share-social"
          size={24}
          color={colors.Text_Color}
        />
      }
      styleHeader={{
        backgroundColor: colors.White_Color,
        elevation: handleSize(1),
      }}>
      <SliderImageComponent images={imageUrls} />
      <RowComponent>
        <View style={{right: 5}}>
          <MenuSelectComponent options={optionsSize} placeholder="Size" />
        </View>
        <View style={{right: 30}}>
          <MenuSelectComponent options={optionsColor} placeholder="Color" />
        </View>
        <Icon
          style={styles.iconHeart}
          name="heart-outline"
          size={13}
          color={colors.Text_Color}
        />
      </RowComponent>
      <SpaceComponent height={10}></SpaceComponent>
      <SectionComponent style={styles.infoProductContainer}>
        <RowComponent justify="space-between" style={{padding: 10}}>
          <TextComponent
            font={fontFamilies.bold}
            size={24}
            text="H&M"></TextComponent>
          <TextComponent
            font={fontFamilies.bold}
            size={24}
            text="$19.199"></TextComponent>
        </RowComponent>
        <TextComponent
          style={{marginLeft: 10}}
          color={colors.Gray_Color}
          size={11}
          text="Short black dress"></TextComponent>
        <StarComponent
          style={{marginLeft: 10, marginTop: 5}}
          maxStar={5}
          itemRating={5}
          numberReviews={10}
        />
        <SpaceComponent height={20}></SpaceComponent>

        <TextComponent
          style={{
            marginLeft: 10,
            fontFamily: 'Metropolis-Regular',
          }}
          color={colors.Text_Color}
          size={14}
          text="Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim."></TextComponent>
      </SectionComponent>
      <SpaceComponent height={30}></SpaceComponent>
      <SectionComponent style={{paddingHorizontal: 15}}>
        <ButtonComponent text="ADD TO CART"></ButtonComponent>
      </SectionComponent>
      <SpaceComponent height={30}></SpaceComponent>
      <RowComponent
        justify="space-between"
        style={{
          borderWidth: 0.2,
          width: '100%',
          height: 50,
          alignItems: 'center',
        }}>
        <TextComponent
          style={{fontFamily: 'Metropolis-Regular', left: 10}}
          size={16}
          text="Shipping info"></TextComponent>
        <Icon
          name="chevron-forward-outline"
          size={24}
          color={colors.Text_Color}
        />
      </RowComponent>
      <RowComponent
        justify="space-between"
        style={{
          borderWidth: 0.2,
          width: '100%',
          height: 50,
          alignItems: 'center',
        }}>
        <TextComponent
          style={{fontFamily: 'Metropolis-Regular', left: 10}}
          size={16}
          text="Support"></TextComponent>
        <Icon
          name="chevron-forward-outline"
          size={24}
          color={colors.Text_Color}
        />
      </RowComponent>
      <SpaceComponent height={30}></SpaceComponent>
      <RowComponent
        justify="space-between"
        style={{
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TextComponent
          font={fontFamilies.bold}
          size={18}
          text="You can also like this"></TextComponent>
        <TextComponent
          style={{fontFamily: 'Metropolis-Regular'}}
          size={11}
          color={colors.Gray_Color}
          text="12 items"></TextComponent>
      </RowComponent>
      <SpaceComponent height={20}></SpaceComponent>
      <FlatList
        renderItem={renderItem}
        data={suggestedProducts}
        horizontal={true}></FlatList>
    </ContainerComponent>
  );
};

export default DetailProductScreen;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 0},
  iconShare: {right: 25},
  iconHeart: {
    position: 'absolute',
    right: 20,
    top: 23,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
