import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useCallback, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../helper/store/store';
import RowComponent from '../layouts/RowComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SpaceComponent from '../layouts/SpaceComponent';
import TextComponent from '../texts/TextComponent';
import {colors} from '../../constants/colors';
import {setColumnProductsCategory} from '../../helper/store/slices/app.slice';
import {handleSize} from '../../utils/handleSize';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import SectionComponent from '../layouts/SectionComponent';
import CustomBottomSheet from '../layouts/bottom_sheets/CustomBottomSheet';
import {listSort} from '../../models/listSort';
import {actionSetFilter, setSort} from '../../helper/store/slices/sort.slice';
import {fontFamilies} from '../../constants/fontFamilies';

interface Props {
  navigation: any;
  styleContainerBar?: ViewStyle;
}

const FilterBar: FC<Props> = ({navigation, styleContainerBar}) => {
  const isColumn = useAppSelector(
    state => state.app.layoutItem.columnProductsCategory,
  );
  const sort = useAppSelector(state => state.sort.sort);
  const is_init = useAppSelector(state => state.sort.filter.init);
  const dispatch = useAppDispatch();
  const bottomSheet = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheet.current?.present();
  }, []);

  const filter = useAppSelector(state => state.sort.filter);

  return (
    <SectionComponent flex={0}>
      <RowComponent style={[styles.containerFiler, styleContainerBar]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FilterScreen');
          }}>
          <RowComponent>
            <SectionComponent flex={0}>
              {!is_init && <View style={styles.viewHasFilter} />}
              <FontAwesome5 name="filter" size={20} color={colors.Text_Color} />
            </SectionComponent>
            <SpaceComponent width={7} />
            <TextComponent text="Filters" size={14} />
          </RowComponent>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePresentModalPress}>
          <RowComponent>
            <FontAwesome5
              name={
                sort.value === 'price_min: 1'
                  ? 'sort-amount-up-alt'
                  : sort.value === 'price_min: -1'
                  ? 'sort-amount-down-alt'
                  : sort.value === 'total_orders: -1'
                  ? 'fire'
                  : 'newspaper'
              }
              size={20}
              color={colors.Text_Color}
            />
            <SpaceComponent width={7} />
            <TextComponent text={sort.title} size={14} />
          </RowComponent>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            dispatch(setColumnProductsCategory());
          }}>
          <FontAwesome5
            name={isColumn ? 'th-list' : 'th-large'}
            size={20}
            color={colors.Text_Color}
          />
        </TouchableOpacity>
      </RowComponent>

      <CustomBottomSheet
        title="Sort by"
        bottomSheet={bottomSheet}
        snapPoint={[100, handleSize(300)]}
        content={
          <SectionComponent flex={0}>
            <SectionComponent style={styles.contentBottomSheet}>
              {listSort.map((item, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  style={[
                    styles.itemSort,
                    {
                      backgroundColor:
                        item.value === sort.value
                          ? colors.Primary_Color
                          : colors.White_Color,
                    },
                  ]}
                  onPress={() => {
                    dispatch(setSort(item));
                    bottomSheet.current?.close();
                  }}>
                  <TextComponent
                    text={item.title}
                    font={
                      item.value === sort.value
                        ? fontFamilies.semiBold
                        : fontFamilies.regular
                    }
                    color={
                      item.value === sort.value
                        ? colors.White_Color
                        : colors.Text_Color
                    }
                  />
                </TouchableOpacity>
              ))}
            </SectionComponent>
          </SectionComponent>
        }
      />
    </SectionComponent>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  viewHasFilter: {
    width: handleSize(12),
    height: handleSize(12),
    borderRadius: 100,
    backgroundColor: colors.Primary_Color,
    position: 'absolute',
    top: -6,
    right: -6,
    zIndex: 100,
  },
  itemSort: {
    width: '100%',
    height: handleSize(48),
    paddingLeft: handleSize(16),
    justifyContent: 'center',
  },
  contentBottomSheet: {
    justifyContent: 'flex-start',
    paddingVertical: handleSize(20),
  },
  containerFiler: {
    paddingHorizontal: handleSize(5),
    paddingVertical: handleSize(5),
    marginHorizontal: handleSize(16),
    borderRadius: handleSize(10),
  },
});
