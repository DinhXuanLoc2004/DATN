import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import ContainerFilterComponent from '../../../components/layouts/ContainerFilterComponent';
import RangeSliderComponent from '../../../components/layouts/RangeSliderComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SelectCategoriesComponent from '../../../components/layouts/selects/SelectCategoriesComponent';
import SeclectColorsComponent from '../../../components/layouts/selects/SelectColorsComponent';
import SelectSizeComponent from '../../../components/layouts/selects/SelectSizeComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {handleSize} from '../../../utils/handleSize';
import DoubleButtonComponent from '../../../components/buttons/DoubleButtonComponent';
const FilterScreen = () => {
  const min: number = 0;
  const max: number = 200;
  const [minSelected, setminSelected] = useState<number>(min);
  const [maxSelected, setmaxSelected] = useState<number>(max);
  const [colors_selected, setcolors_selected] = useState<string[]>([]);
  const [size_selected, setsize_selected] = useState<string[]>([]);
  const [categories_selected, set_categories_selected] = useState<string>('');
  const [brands_selected, setbrands_selected] = useState<string[]>([]);
  return (
    <ContainerComponent
      style={styles.container}
      isHeader
      back
      isScroll
      title="Filters"
      styleHeader={{
        backgroundColor: colors.White_Color,
        elevation: handleSize(1),
      }}>
      <SpaceComponent height={25} />
      <SectionComponent>
        <TextComponent
          font={fontFamilies.semiBold}
          text="Price range"
          style={styles.Margin}
        />
        <ContainerFilterComponent>
          <RangeSliderComponent
            min={min}
            max={max}
            minSelected={minSelected}
            maxSelected={maxSelected}
            set_minSelected={setminSelected}
            set_maxSelected={setmaxSelected}
          />
        </ContainerFilterComponent>
        <TextComponent
          style={styles.Margin}
          font={fontFamilies.semiBold}
          text="Colors"
        />
        <ContainerFilterComponent>
          <SeclectColorsComponent
            arr_select={colors_selected}
            set_arr_select={setcolors_selected}
          />
        </ContainerFilterComponent>

        <TextComponent
          style={styles.Margin}
          font={fontFamilies.semiBold}
          text="Sizes"
        />
        <ContainerFilterComponent>
          <SelectSizeComponent
            arr_select={size_selected}
            set_arr_select={setsize_selected}
          />
        </ContainerFilterComponent>

        <TextComponent
          style={styles.Margin}
          font={fontFamilies.semiBold}
          text="Category"
        />
        <ContainerFilterComponent>
          <SelectCategoriesComponent
            select={categories_selected}
            set_select={set_categories_selected}
          />
        </ContainerFilterComponent>
        <RowComponent justify="space-between" style={styles.containerBrands}>
          <SectionComponent
            flex={0}
            style={{width: '80%', justifyContent: 'center'}}>
            <TextComponent text="Brand" font={fontFamilies.semiBold} />
            {brands_selected.length > 0 && (
              <SectionComponent flex={0}>
                <SpaceComponent height={3} />
                <TextComponent
                  text={brands_selected.join(', ')}
                  size={11}
                  color={colors.Gray_Color}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />
              </SectionComponent>
            )}
          </SectionComponent>
          <TouchableOpacity>
            <Ionicons
              name="chevron-forward-outline"
              size={handleSize(24)}
              color={colors.Text_Color}
            />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <DoubleButtonComponent
        textBtnLeft="Discard"
        textBtnRight="Apply"
        onPressBtnLeft={() => {}}
        onPressBtnRigth={() => {}}
        bottom={0}
        zIndex={1}
        backgroundColor={colors.White_Color}
      />
    </ContainerComponent>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  containerBrands: {
    paddingHorizontal: handleSize(16),
    paddingVertical: handleSize(14),
  },
  container: {paddingHorizontal: 0},
  ContainerFilter: {alignItems: 'center', flexWrap: 'wrap'},
  Margin: {
    marginTop: handleSize(14),
    marginBottom: handleSize(12),
    marginStart: handleSize(16),
  },
});
