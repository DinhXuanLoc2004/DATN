import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SliderImageComponent from '../../../components/layouts/SliderImageComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import StarComponent from '../../../components/layouts/StarComponent';
import ItemColumnComponent from '../../../components/layouts/items/ItemColumnComponent';
import MenuSelectComponent from '../../../components/layouts/selects/MenuSeclectComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {
  modle_color_example,
  modle_size_example,
} from '../../../models/modelsExample';
import {createInitValue} from '../../../utils/createInitValue';
import {handleSize} from '../../../utils/handleSize';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DetailProductScreen = () => {
  const [size_select, setsize_select] = useState<modle_size_example>(
    createInitValue<modle_size_example>,
  );
  const [color_select, setcolor_select] = useState<modle_color_example>(
    createInitValue<modle_color_example>,
  );
  const [numberOfLineTextDetail, setnumberOfLineTextDetail] =
    useState<number>(4);
  const handleSetSelected = (val: modle_color_example | modle_size_example) => {
    if ('name_size' in val) {
      setsize_select(val); // Đây là kiểu `modle_size_example`
    } else if ('name_color' in val) {
      setcolor_select(val); // Đây là kiểu `modle_color_example`
    }
  };
  const optionsSize: modle_size_example[] = [
    {name_size: 'L'},
    {name_size: 'M'},
    {name_size: 'S'},
  ];
  const optionsColor: modle_color_example[] = [
    {name_color: 'Black', code_color: '#000000'},
    {name_color: 'White', code_color: '#ffffff'},
    {name_color: 'Gray', code_color: '#9B9B9B'},
  ];
  const suggestedProducts = [
    {
      trademark: 'Brand1',
      name: '1111',
      price: 1,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
      color: 'blue',
      size: 'L',
      star: 11,
      stock: 1,
      discount: 2,
      createAt: new Date(),
      isFavorited: true
    },
    {
      trademark: 'Brand1',
      name: '1111',
      price: 1,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
      color: 'blue',
      size: 'L',
      star: 11,
      stock: 1,
      discount: 2,
      createAt: new Date(),
      isFavorited: true
    },
    {
      trademark: 'Brand1',
      name: '1111',
      price: 1,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
      color: 'blue',
      size: 'L',
      star: 11,
      stock: 1,
      discount: 2,
      createAt: new Date(),
      isFavorited: true
    },
  ];

  const imageUrls = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTkilv8oyOyUfEMb3iggiSPNpDwdYb2XuH3KZN9oD05UwflZxRPZ8GCQ6yBeYz-tPe0Uc&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSln9WpLySNBzXx6ostIfYPlm5RZPqVcW4ECSqe4hb-omZs1Y8yi35_fTvzSLnREhbhfUc&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTkilv8oyOyUfEMb3iggiSPNpDwdYb2XuH3KZN9oD05UwflZxRPZ8GCQ6yBeYz-tPe0Uc&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSln9WpLySNBzXx6ostIfYPlm5RZPqVcW4ECSqe4hb-omZs1Y8yi35_fTvzSLnREhbhfUc&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0d2R6UImUfGORyeXMyErGkYGeX40eF1yvAg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTkilv8oyOyUfEMb3iggiSPNpDwdYb2XuH3KZN9oD05UwflZxRPZ8GCQ6yBeYz-tPe0Uc&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSln9WpLySNBzXx6ostIfYPlm5RZPqVcW4ECSqe4hb-omZs1Y8yi35_fTvzSLnREhbhfUc&usqp=CAU',
  ];
  return (
    <ContainerComponent
      style={styles.container}
      isHeader
      back
      isScroll
      title="Short Dress"
      rightIcon={
        <Icon
          name="share-social"
          size={handleSize(24)}
          color={colors.Text_Color}
        />
      }
      styleHeader={{
        backgroundColor: colors.White_Color,
        elevation: handleSize(1),
      }}>
      <SliderImageComponent images={imageUrls} />
      <ContainerComponent>
        <SpaceComponent height={12} />
        <RowComponent>
          <MenuSelectComponent
            options={optionsSize}
            placeholder="Size"
            selected={size_select}
            set_selected={handleSetSelected}
          />
          <MenuSelectComponent
            options={optionsColor}
            placeholder="Color"
            selected={color_select}
            set_selected={handleSetSelected}
          />
          <TouchableOpacity style={styles.btnIcon}>
            <Ionicons
              name={
                suggestedProducts[0].isFavorited ? 'heart' : 'heart-outline'
              }
              color={
                suggestedProducts[0].isFavorited
                  ? colors.Primary_Color
                  : colors.Gray_Color
              }
              size={handleSize(18)}
            />
          </TouchableOpacity>
        </RowComponent>
        <SpaceComponent height={22} />
        <RowComponent>
          <TextComponent
            text="H&M"
            size={24}
            font={fontFamilies.semiBold}
            lineHeight={28.8}
          />
          <TextComponent text="$19" size={24} font={fontFamilies.semiBold} />
        </RowComponent>
        <TextComponent
          text="Short black dress"
          size={11}
          color={colors.Gray_Color}
        />
        <SpaceComponent height={8} />
        <StarComponent star={4} numberReviews={10} />
        <SpaceComponent height={16} />
        <TouchableOpacity
          onPress={() =>
            setnumberOfLineTextDetail(numberOfLineTextDetail === 3 ? 0 : 3)
          }>
          <TextComponent
            text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
            size={14}
            lineHeight={21}
            letterSpacing={-0.15}
            numberOfLines={numberOfLineTextDetail}
            ellipsizeMode="tail"
          />
        </TouchableOpacity>
        <SpaceComponent height={25} />
        <ButtonComponent
          text="ADD TO CART"
          onPress={() => {}}
          style={{height: handleSize(48)}}
        />
        <SpaceComponent height={25} />
        <TouchableOpacity style={{paddingVertical: handleSize(16)}}>
          <RowComponent justify="space-between">
            <TextComponent text="Shipping info" />
            <Icon
              name="chevron-forward-outline"
              size={handleSize(16)}
              color={colors.Text_Color}
            />
          </RowComponent>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingVertical: handleSize(16)}}>
          <RowComponent justify="space-between">
            <TextComponent text="Support" lineHeight={16} />
            <Icon
              name="chevron-forward-outline"
              size={handleSize(16)}
              color={colors.Text_Color}
            />
          </RowComponent>
        </TouchableOpacity>
        <SpaceComponent height={24} />
        <RowComponent justify="space-between">
          <TextComponent
            font={fontFamilies.semiBold}
            size={18}
            text="You can also like this"
          />
          <TextComponent
            style={{fontFamily: 'Metropolis-Regular'}}
            size={11}
            color={colors.Gray_Color}
            text="12 items"
          />
        </RowComponent>
        <SpaceComponent height={12} />
        <FlatList
          data={suggestedProducts}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <ItemColumnComponent
              trademark={item.trademark}
              name={item.name}
              price={item.price}
              color={item.color}
              imageUrl={item.img}
              size={item.size}
              star={item.star}
              stock={item.stock}
              createAt={item.createAt}
              isFavorite={item.isFavorited}
              discount={0.5}
              reviewCount={10}
              style={styles.itemProduct}
            />
          )}
          ItemSeparatorComponent={() => (<SpaceComponent width={11}/>)}
          showsHorizontalScrollIndicator={false}
        />
        <SpaceComponent height={30}/>
      </ContainerComponent>
    </ContainerComponent>
  );
};

export default DetailProductScreen;

const styles = StyleSheet.create({
  itemProduct: {
    width: handleSize(150),
    flex: 0
  },
  btnIcon: {
    width: handleSize(36),
    height: handleSize(36),
    backgroundColor: colors.White_Color,
    elevation: handleSize(4),
    borderRadius: handleSize(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {paddingHorizontal: 0},
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
