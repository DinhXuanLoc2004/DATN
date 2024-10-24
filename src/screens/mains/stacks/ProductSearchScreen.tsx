import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import { useQuery } from '@tanstack/react-query';
import { getAllProductsHomeSreen, searchProductsQueryKey } from '../../../constants/queryKeys';
import { getAllProductAPI } from '../../../helper/apis/product.api';
import { productResponse } from '../../../helper/types/product.type';

type stackProp = StackNavigationProp<stackParamListMain, 'SearchScreen'>;

const ProductSearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<productResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<productResponse[]>([]);

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

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: [searchProductsQueryKey, user_id],
    queryFn: getAllProductAPI,
  });

  useEffect(() => {
    if(data?.metadata){
      setProducts(data.metadata.products)
    }
  }, [data?.metadata]);

  useEffect(() => {
    const debounceFilter = setTimeout(() => {
      filterProducts(searchTerm);
    }, 200)

    return () => clearTimeout(debounceFilter);
  }, [searchTerm, products]);

  const isColumn = useAppSelector(
    state => state.app.layoutItem.columnProductsCategory,
  );
  const sort = useAppSelector(state => state.sort.sort);
  const bottomSheet = useRef<BottomSheetModal | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<stackProp>();

  const handlePresentModalPress = useCallback(() => {
    bottomSheet.current?.present();
  }, []);

  return (
    <ContainerComponent style={styles.container}>
      <SectionComponent flex={0} style={styles.containerHeader}>
        <SpaceComponent height={20} />
        <RowComponent style={styles.containerSearch}>
          <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <Ionicons
              name="arrow-back-outline"
              size={handleSize(24)}
              color={colors.Primary_Color}
            />
          </TouchableOpacity>
          <SpaceComponent width={5} />
          <SearchComponent value={searchTerm} onChange={setSearchTerm} onClear placeholder='Search...'/>
        </RowComponent>
        <RowComponent style={styles.containerFiler}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('FilterScreen');
            }}>
            <RowComponent>
              <FontAwesome5 name="filter" size={20} color={colors.Text_Color} />
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
        <SpaceComponent height={5} />
      </SectionComponent>
        <SpaceComponent height={5} />
      <ContainerComponent>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <SectionComponent flex={0}>
              {isColumn ? (
                <ItemColumnComponent
                  _id={item._id}
                  onPress={() =>
                    navigation.navigate('DetailProductScreen', {
                      product_id: item._id,
                    })
                  }
                  trademark={item.name_category}
                  name={item.name_product}
                  imageUrl={item.thumb}
                  createAt={item.createdAt}
                  price={item.price_min}
                  discount={item.discount}
                  stock={item.inventory_quantity}
                  star={item.averageRating}
                  reviewCount={item.countReview}
                  isFavorite={item.isFavorite}
                  style={styles.itemColumn}
                />
              ) : (
                <ItemRowComponent
                  onPress={() =>
                    navigation.navigate('DetailProductScreen', {
                      product_id: item._id,
                    })
                  }
                  trademark={item.name_category}
                  name={item.name_product}
                  img={item.thumb}
                  createAt={item.createdAt}
                  price={item.price_min}
                  discount={item.discount}
                  stock={item.inventory_quantity}
                  star={item.averageRating}
                  numberReviews={item.countReview}
                  isFavorite={item.isFavorite}
                  _id={item._id}
                />
              )}
              <SpaceComponent height={26} />
            </SectionComponent>
          )}
          contentContainerStyle={{marginTop: 15}}
          numColumns={isColumn ? 2 : 1}
          key={isColumn ? 2 : 1}
          columnWrapperStyle={isColumn ? styles.row : null}
          showsVerticalScrollIndicator={false}
        />

        <CustomBottomSheet
          title="Sort by"
          bottomSheet={bottomSheet}
          snapPoint={[100, handleSize(250)]}
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
      </ContainerComponent>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  itemColumn: {
    width: handleSize(164),
    height: handleSize(260),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: handleSize(26),
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
