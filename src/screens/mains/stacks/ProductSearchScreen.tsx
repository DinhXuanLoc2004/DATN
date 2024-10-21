import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ItemRowComponent from '../../../components/layouts/items/ItemRowComponent';
import SearchComponent from '../../../components/layouts/SearchComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import { colors } from '../../../constants/colors';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import { store, useAppDispatch, useAppSelector } from '../../../helper/store/store';
import { handleSize } from '../../../utils/handleSize';
import { setColumnProductsCategory } from '../../../helper/store/slices/app.slice';
import ItemColumnComponent from '../../../components/layouts/items/ItemColumnComponent';
import { useNavigation } from '@react-navigation/native';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import CustomBottomSheet from '../../../components/layouts/bottom_sheets/CustomBottomSheet';
import { listSort } from '../../../models/listSort';
import { fontFamilies } from '../../../constants/fontFamilies';
import { setSort } from '../../../helper/store/slices/sort.slice';

const ProductSearchScreen= () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/v1/api/product/get_all_products');
      setProducts(response.data.metadata.products);
      setFilteredProducts(response.data.metadata.products);
    } catch (error) {
      console.error(error);
    }
  };

  const filterProducts = (term: string) => {
    if (term) {
      const filtered = products.filter(product => {
        const name = product.name_product ? product.name_product.toLowerCase() : '';
        const brand = product.name_brand ? product.name_brand.toLowerCase() : '';
        const category = product.name_category ? product.name_category.toLowerCase() : '';

        return (
          name.includes(term.toLowerCase()) ||
          brand.includes(term.toLowerCase()) ||
          category.includes(term.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Nếu không có gì để tìm kiếm, hiển thị tất cả
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const debounceFilter = setTimeout(() => {
      filterProducts(searchTerm);
    }, 200);

    return () => clearTimeout(debounceFilter);
  }, [searchTerm, products]);

  const isColumn = useAppSelector(state => state.app.layoutItem.columnProductsCategory);
  const sort = useAppSelector(state => state.sort.sort);
  const bottomSheet = useRef<BottomSheetModal | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handlePresentModalPress = useCallback(() => {
    bottomSheet.current?.present();
  }, []);

  return (
    <ContainerComponent style={styles.container}>
      <SearchComponent value={searchTerm} onChange={setSearchTerm} />
      <RowComponent style={styles.containerFiler}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FilterScreen');
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

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => (
          <SectionComponent flex={0}>
            {isColumn ? (
              <ItemColumnComponent
                _id={item._id}
                // onPress={() =>
                  //   navigation.navigate('DetailProductScreen', {
                  //     product_id: item._id,
                  //   })
                  // }
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
              />
            ) : (
              <ItemRowComponent
              // onPress={() =>
                  //   navigation.navigate('DetailProductScreen', {
                  //     product_id: item._id,
                  //   })
                  // }
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
        contentContainerStyle={{ marginTop: 15 }}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
