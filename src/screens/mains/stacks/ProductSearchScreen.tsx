import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomBottomSheet from '../../../components/layouts/bottom_sheets/CustomBottomSheet';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import ItemColumnComponent from '../../../components/layouts/items/ItemColumnComponent';
import ItemRowComponent from '../../../components/layouts/items/ItemRowComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SearchComponent from '../../../components/layouts/SearchComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {setColumnProductsCategory} from '../../../helper/store/slices/app.slice';
import {setSort} from '../../../helper/store/slices/sort.slice';
import {useAppDispatch, useAppSelector} from '../../../helper/store/store';
import {listSort} from '../../../models/listSort';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {handleSize} from '../../../utils/handleSize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@tanstack/react-query';
import {
  getAllProductsHomeSreen,
  searchProductsQueryKey,
} from '../../../constants/queryKeys';
import {getAllProductAPI} from '../../../helper/apis/product.api';
import {productResponse} from '../../../helper/types/product.type';
import ItemRowOrColumn from '../../../components/layouts/items/ItemRowOrColumn';
import FilterBar from '../../../components/bars/FilterBar';

type stackProp = StackNavigationProp<stackParamListMain, 'SearchScreen'>;

const ProductSearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<productResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<productResponse[]>(
    [],
  );

  const filterProducts = (term: string) => {
    if (term) {
      const filtered = products.filter(product => {
        const name = product.name_product
          ? product.name_product.toLowerCase()
          : '';
        const brand = product.name_brand
          ? product.name_brand.toLowerCase()
          : '';
        const category = product.name_category
          ? product.name_category.toLowerCase()
          : '';

        return (
          name.includes(term.toLowerCase()) ||
          brand.includes(term.toLowerCase()) ||
          category.includes(term.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const user_id = useAppSelector(state => state.auth.user.userId);
  const sort = useAppSelector(state => state.sort.sort);
  const stateFilter = useAppSelector(state => state.sort.filter);
  const price = [stateFilter.price.min, stateFilter.price.max];
  const colors_id = stateFilter.colors;
  const sizes_id = stateFilter.sizes;
  const rating = stateFilter.rating;
  const brands_id = stateFilter.brands;

  const body = useMemo(
    () => ({price, colors_id, sizes_id, rating, brands_id}),
    [price, colors_id, sizes_id, rating, brands_id],
  );

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: [searchProductsQueryKey, user_id, '', sort.value, body],
    queryFn: getAllProductAPI,
  });

  useEffect(() => {
    if (data?.metadata) {
      setProducts(data.metadata.products);
    }
  }, [data?.metadata]);

  useEffect(() => {
    const debounceFilter = setTimeout(() => {
      filterProducts(searchTerm);
    }, 200);

    return () => clearTimeout(debounceFilter);
  }, [searchTerm, products]);

  const isColumn = useAppSelector(
    state => state.app.layoutItem.columnProductsCategory,
  );

  const navigation = useNavigation<stackProp>();

  return (
    <ContainerComponent style={styles.container}>
      <SectionComponent flex={0} style={styles.containerHeader}>
        <SpaceComponent height={20} />
        <RowComponent style={styles.containerSearch}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="arrow-back-outline"
              size={handleSize(24)}
              color={colors.Primary_Color}
            />
          </TouchableOpacity>
          <SpaceComponent width={5} />
          <SearchComponent
            value={searchTerm}
            onChange={setSearchTerm}
            onClear
            placeholder="Search..."
          />
        </RowComponent>
        <FilterBar
          navigation={navigation}
          styleContainerBar={styles.containerFiler}
        />
        <SpaceComponent height={5} />
      </SectionComponent>
      <SpaceComponent height={5} />
      <ContainerComponent>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <ItemRowOrColumn
              isColumn={isColumn}
              item={item}
              navigation={navigation}
            />
          )}
          contentContainerStyle={{marginTop: 15}}
          numColumns={isColumn ? 2 : 1}
          key={isColumn ? 2 : 1}
          columnWrapperStyle={isColumn ? styles.row : null}
          showsVerticalScrollIndicator={false}
        />
      </ContainerComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  itemColumn: {
    width: handleSize(164),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: handleSize(5),
  },
  container: {
    paddingHorizontal: 0,
  },
  containerHeader: {
    backgroundColor: colors.White_Color,
    paddingHorizontal: handleSize(16),
    elevation: handleSize(3.5),
  },
  containerSearch: {
    width: '100%',
    height: handleSize(40),
  },
  containerFiler: {
    paddingHorizontal: handleSize(5),
    paddingVertical: handleSize(5),
    marginHorizontal: handleSize(16),
    borderRadius: handleSize(10),
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
  },
  contentBottomSheet: {
    justifyContent: 'flex-start',
    paddingVertical: handleSize(20),
  },
  itemSort: {
    width: '100%',
    height: handleSize(48),
    paddingLeft: handleSize(16),
    justifyContent: 'center',
  },
});

export default ProductSearchScreen;
