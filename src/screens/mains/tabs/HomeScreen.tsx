import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet } from 'react-native';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import HeaderSearchAnimation from '../../../components/layouts/headers/HeaderSearchAnimation';
import PagerViewHeaderHome from '../../../components/layouts/pager_views/PagerViewHeaderHome';
import ProductsComponent from '../../../components/layouts/ProductsComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import { colors } from '../../../constants/colors';
import dataVN from '../../../constants/local_datas/json/VN_geographic_data.json';
import { getAllProductsHomeSreen } from '../../../constants/queryKeys';
import { getAllProductAPI } from '../../../helper/apis/product.api';
import { useAppSelector } from '../../../helper/store/store';
import {
  productResponse
} from '../../../helper/types/product.type';
import { handleDate } from '../../../utils/handleDate';

const HomeScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const user_id = useAppSelector(state => state.auth.user.userId);

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: [getAllProductsHomeSreen, user_id],
    queryFn: getAllProductAPI,
  });


  interface typeProducts {
    products: {
      productsSale: Array<productResponse>;
      productsNew: Array<productResponse>;
      productsOther: Array<productResponse>;
    };
  }

  const [products, setproducts] = useState<typeProducts['products']>();

  const handleProducts = (products: Array<productResponse>) => {
    let arrSale: Array<productResponse> = [];
    let arrNew: Array<productResponse> = [];
    let arrOther: Array<productResponse> = [];
    products.forEach(item => {
      if (item.discount > 0) {
        arrSale.push(item);
      } else if (handleDate.handleIsNewProduct(item.createdAt)) {
        arrNew.push(item);
      } else {
        arrOther.push(item);
      }
    });
    const product: typeProducts['products'] = {
      productsSale: arrSale,
      productsNew: arrNew,
      productsOther: arrOther,
    };
    setproducts(product);
  };

  useEffect(() => {
    if (data) {
      handleProducts(data.metadata.products);
    }
  }, [data?.metadata.products]);

  if (isLoading) return <ActivityIndicator color={colors.Primary_Color} />;

  return (
    <ContainerComponent style={styles.containerHeader}>
      <HeaderSearchAnimation aniamtedValue={animatedValue} />
      <ContainerComponent
        isScroll
        onSroll={e => animatedValue.setValue(e.nativeEvent.contentOffset.y)}
        style={styles.containerHeader}>
        <PagerViewHeaderHome animationValue={animatedValue} />
        {products?.productsSale && products?.productsSale?.length > 0 && (
          <ProductsComponent
            title="Sale"
            place="Super summer sale"
            products={products.productsSale}
            marginTop={35}
          />
        )}
        {products?.productsNew && products.productsNew.length > 0 && (
          <ProductsComponent
            title="New"
            place="Super summer sale"
            products={products.productsNew}
          />
        )}
        {products?.productsOther && products?.productsOther?.length > 0 && (
          <ProductsComponent
            title="Other"
            place="Other"
            products={products.productsOther}
          />
        )}
        <SpaceComponent height={500} />
      </ContainerComponent>
    </ContainerComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerHeader: {
    width: '100%',
    paddingHorizontal: 0,
  },
});