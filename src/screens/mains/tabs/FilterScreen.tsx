import {StyleSheet, View} from 'react-native';
import React from 'react';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import TextComponent from '../../../components/texts/TextComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import RangeSliderComponent from '../../../components/layouts/RangeSliderComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import ContainerFilterComponent from '../../../components/layouts/ContainerFilterComponent';
import {colors} from '../../../constants/colors';
import ColorCircleComponent from '../../../components/layouts/ColorCircleComponent'; // Import the new component
import SizeFilterComponent from '../../../components/layouts/SizeFilterComponent';
const FilterScreen = () => {
  return (
    <ContainerComponent
      style={styles.container}
      isHeader
      back
      isScroll
      title="Filters">
      <SectionComponent>
        <SpaceComponent height={10} />
        <TextComponent
          style={styles.Margin}
          size={16}
          font={fontFamilies.bold}
          text="Price range"
        />

        <ContainerFilterComponent flexD="row" width={'100%'} height={80}>
          <RangeSliderComponent />
        </ContainerFilterComponent>

        <TextComponent
          style={styles.Margin}
          size={16}
          font={fontFamilies.bold}
          text="Colors"
        />

        <ContainerFilterComponent
          style={{alignItems: 'center'}}
          flexD="row"
          width={'100%'}
          height={80}>
          {colorsArray.map((color, index) => (
            <ColorCircleComponent key={index} backgroundColor={color} />
          ))}
        </ContainerFilterComponent>

        <TextComponent
          style={styles.Margin}
          size={16}
          font={fontFamilies.bold}
          text="Sizes"
        />
        <ContainerFilterComponent
          style={{alignItems: 'center'}}
          flexD="row"
          width={'100%'}
          height={80}>
          <SizeFilterComponent
            width={40}
            height={40}
            text="SX"></SizeFilterComponent>
          <SizeFilterComponent
            width={40}
            height={40}
            text="S"></SizeFilterComponent>
          <SizeFilterComponent
            width={40}
            height={40}
            text="M"></SizeFilterComponent>
          <SizeFilterComponent
            width={40}
            height={40}
            text="L"></SizeFilterComponent>
          <SizeFilterComponent
            width={40}
            height={40}
            text="XL"></SizeFilterComponent>
        </ContainerFilterComponent>

        <TextComponent
          style={styles.Margin}
          size={16}
          font={fontFamilies.bold}
          text="Category"
        />
        <ContainerFilterComponent
          style={styles.ContainerFilter}
          flexD="row"
          width={'100%'}
          height={130}>
          <SizeFilterComponent
            width={100}
            height={40}
            text="All"></SizeFilterComponent>
          <SizeFilterComponent
            width={100}
            height={40}
            text="Women"></SizeFilterComponent>
          <SizeFilterComponent
            width={100}
            height={40}
            text="Men"></SizeFilterComponent>
          <SizeFilterComponent
            width={100}
            height={40}
            text="Boys"></SizeFilterComponent>
          <SizeFilterComponent
            width={100}
            height={40}
            text="Girls"></SizeFilterComponent>
        </ContainerFilterComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default FilterScreen;

const colorsArray = [
  colors.Text_Color,
  colors.Gray_Light_Color,
  colors.Primary_Color,
  colors.Gray_Dark_Color,
  colors.Yellow_Light_Color,
  colors.Blue_Dark_Color,
];

const styles = StyleSheet.create({
  container: {paddingHorizontal: 0},
  ContainerFilter: {alignItems: 'center', flexWrap: 'wrap'},
  Margin: {margin: 15},
});
