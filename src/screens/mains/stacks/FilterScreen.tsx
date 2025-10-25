import BottomSheet, {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import DoubleButtonComponent from '../../../components/buttons/DoubleButtonComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import ContainerFilterComponent from '../../../components/layouts/ContainerFilterComponent';
import CustomBottomSheet from '../../../components/layouts/bottom_sheets/CustomBottomSheet';
import RangeSliderComponent from '../../../components/layouts/RangeSliderComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SearchComponent from '../../../components/layouts/SearchComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SelectBrandsComponent from '../../../components/layouts/selects/SelectBrandsComponent';
import SeclectColorsComponent from '../../../components/layouts/selects/SelectColorsComponent';
import SelectSizeComponent from '../../../components/layouts/selects/SelectSizeComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import StarComponent from '../../../components/layouts/StarComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {getDataFiler} from '../../../helper/apis/product.api';
import {removeFilter, setFilter} from '../../../helper/store/slices/sort.slice';
import {store, useAppDispatch} from '../../../helper/store/store';
import {brandType} from '../../../helper/types/brand.type';
import {filterResponse} from '../../../helper/types/product.type';
import {handleSize} from '../../../utils/handleSize';
import {onLayout} from '../../../utils/onLayout';
import {useNavigation} from '@react-navigation/native';
const FilterScreen = () => {
  const queryClient = useQueryClient();
  const filterStorage = store.getState().sort.filter;
  const [minSelected, setminSelected] = useState<number>(0);
  const [maxSelected, setmaxSelected] = useState<number>(0);
  const [colors_selected, setcolors_selected] = useState<string[]>(
    filterStorage.colors,
  );
  const [size_selected, setsize_selected] = useState<string[]>(
    filterStorage.sizes,
  );
  const [brands_selected, setbrands_selected] = useState<string[]>(
    filterStorage.brands,
  );
  const [height_bottom, setheight_bottom] = useState<number>(0);
  const [dataFilter, setdataFilter] = useState<filterResponse>();
  const [starSelect, setstarSelect] = useState<number>(filterStorage.rating);
  const [dataBrand, setdataBrand] = useState<Array<brandType>>([]);
  const [brandSearch, setbrandSearch] = useState<Array<brandType>>([]);
  const [searchBrand, setsearchBrand] = useState<string>('');

  const bottomSheet = useRef<BottomSheetModal>(null);

  const navigation = useNavigation();

  const dispath = useAppDispatch();

  const {data, isLoading, error} = useQuery({
    queryKey: ['getDataFilter'],
    queryFn: getDataFiler,
  });

  useEffect(() => {
    if (data?.metadata.dataFilter) {
      setdataFilter(data.metadata.dataFilter);
      setminSelected(
        filterStorage.price.min > 0
          ? filterStorage.price.min
          : data.metadata.dataFilter.price[0].minPrice,
      );
      setmaxSelected(
        filterStorage.price.max > 0
          ? filterStorage.price.max
          : data.metadata.dataFilter.price[0].maxPrice,
      );
      setdataBrand(data.metadata.dataFilter.brands);
    }
  }, [data?.metadata.dataFilter]);

  useEffect(() => {
    setTimeout(() => {
      setbrandSearch(
        dataBrand.filter(brand =>
          brand.name_brand.toLowerCase().includes(searchBrand.toLowerCase()),
        ),
      );
    }, 300);
  }, [searchBrand]);

  const handleApply = async () => {
    const filter = {
      price: {
        min: minSelected,
        max: maxSelected,
      },
      colors: colors_selected,
      sizes: size_selected,
      rating: starSelect,
      brands: brands_selected,
    };
    dispath(setFilter(filter));
    await queryClient.invalidateQueries({
      queryKey: ['getProductsToCate'],
      type: 'active',
      exact: true,
    });
  };

  return (
    <ContainerComponent
      style={styles.container}
      isHeader
      back
      title="Filters"
      styleHeader={{
        backgroundColor: colors.White_Color,
        elevation: handleSize(1),
      }}>
      <SpaceComponent height={25} />
      <ContainerComponent
        style={[styles.container, {paddingBottom: height_bottom}]}
        isScroll>
        <TextComponent
          font={fontFamilies.semiBold}
          text="Price range"
          style={styles.Margin}
        />
        <ContainerFilterComponent>
          {dataFilter && dataFilter?.price[0] && (
            <RangeSliderComponent
              min={dataFilter?.price[0]?.minPrice ?? 0}
              max={dataFilter?.price[0]?.maxPrice ?? 0}
              minSelected={minSelected}
              maxSelected={maxSelected}
              set_minSelected={setminSelected}
              set_maxSelected={setmaxSelected}
            />
          )}
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
            data={dataFilter?.colors ?? []}
          />
        </ContainerFilterComponent>

        <TextComponent
          style={styles.Margin}
          font={fontFamilies.semiBold}
          text="Sizes"
        />
        <ContainerFilterComponent>
          <SelectSizeComponent
            data={dataFilter?.sizes ?? []}
            arr_select={size_selected}
            set_arr_select={setsize_selected}
          />
        </ContainerFilterComponent>
        <TextComponent
          style={styles.Margin}
          font={fontFamilies.semiBold}
          text="Rating"
        />
        <ContainerFilterComponent style={styles.containerStar}>
          <StarComponent
            size={35}
            star={starSelect}
            onPress={(star: number) => setstarSelect(star)}
            allowZero
          />
        </ContainerFilterComponent>
        <RowComponent
          justify="space-between"
          style={styles.containerBrands}
          onPress={() => {
            bottomSheet.current?.present();
          }}>
          <SectionComponent
            flex={0}
            style={{width: '80%', justifyContent: 'center'}}>
            <TextComponent text="Brand" font={fontFamilies.semiBold} />
            {brands_selected.length > 0 && (
              <SectionComponent flex={0}>
                <SpaceComponent height={3} />
                <TextComponent
                  text={dataBrand
                    .filter(brand => brands_selected.includes(brand._id))
                    .map(brand => brand.name_brand)
                    .join(', ')}
                  size={11}
                  color={colors.Gray_Color}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                />
              </SectionComponent>
            )}
          </SectionComponent>
          <Ionicons
            name="chevron-forward-outline"
            size={handleSize(24)}
            color={colors.Text_Color}
          />
        </RowComponent>
      </ContainerComponent>
      <DoubleButtonComponent
        textBtnLeft="Discard"
        textBtnRight="Apply"
        onPressBtnLeft={() => {
          dispath(removeFilter());
          navigation.goBack();
        }}
        onPressBtnRigth={() => {
          handleApply();
          navigation.goBack();
        }}
        bottom={0}
        zIndex={1}
        backgroundColor={colors.White_Color}
        onLayout={event => onLayout(event, setheight_bottom)}
      />
      <CustomBottomSheet
        bottomSheet={bottomSheet}
        snapPoint={['95%']}
        title="Brands"
        styleHeader={styles.headerBottomSheet}
        content={
          <ContainerComponent style={styles.containerBottom}>
            <SpaceComponent height={21} />
            <SearchComponent
              value={searchBrand}
              onChange={(brand: string) => setsearchBrand(brand)}
              onClear
              placeholder="Search brand"
              style={{elevation: 3, flex: 0}}
            />
            <SpaceComponent height={22} />
            <SectionComponent style={styles.containerSelectBrand}>
              <SelectBrandsComponent
                data={searchBrand ? brandSearch : dataBrand}
                arr_select={brands_selected}
                set_arr_select={setbrands_selected}
              />
            </SectionComponent>
            <ButtonComponent
              text="Select"
              onPress={() => {
                bottomSheet.current?.close();
              }}
              style={styles.btnBottomSheet}
            />
          </ContainerComponent>
        }
      />
    </ContainerComponent>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  containerSelectBrand: {
    marginBottom: handleSize(70),
  },
  btnBottomSheet: {
    position: 'absolute',
    bottom: 20,
  },
  headerBottomSheet: {
    backgroundColor: colors.White_Color,
  },
  containerBottom: {
    backgroundColor: colors.White_Color,
  },
  containerStar: {
    alignItems: 'center',
  },
  containerBrands: {
    paddingHorizontal: handleSize(16),
    paddingVertical: handleSize(14),
  },
  container: {paddingHorizontal: 0},
  Margin: {
    marginTop: handleSize(14),
    marginBottom: handleSize(12),
    marginStart: handleSize(16),
  },
});
