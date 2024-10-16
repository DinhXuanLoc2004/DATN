import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Animated, StyleSheet, Text} from 'react-native';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import ProductsComponent from '../../../components/layouts/ProductsComponent';
import {colors} from '../../../constants/colors';
import {getAllProductAPI} from '../../../helper/apis/product.api';
import {productResponse} from '../../../helper/types/product.type';
import {handleDate} from '../../../utils/handleDate';
import {store} from '../../../helper/store/store';
import BannerNewProductComponent from '../../../components/layouts/BannerNewProductComponent';
import BannerSaleProductComponent from '../../../components/layouts/BannerSaleProductComponent';
import BannerOtherProductComponent from '../../../components/layouts/BannerOtherProductComponent';

const HomeScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const {data, isLoading, error} = useQuery({
    queryKey: ['getAllProducts'],
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
    <ContainerComponent
      isScroll
      onSroll={e => animatedValue.setValue(e.nativeEvent.contentOffset.y)}
      style={styles.containerHeader}>
      {products?.productsSale && products?.productsSale?.length > 0 && (
        <>
          <BannerSaleProductComponent />
          <ProductsComponent
            title="Sale"
            place="Super summer sale"
            products={products.productsSale}
            marginTop={35}
          />
        </>
      )}
      {products?.productsNew && products.productsNew.length > 0 && (
        <>
          <BannerSaleProductComponent />
          <ProductsComponent
            title="New"
            place="Super summer sale"
            products={products.productsNew}
          />
        </>
      )}
      {products?.productsOther && products?.productsOther?.length > 0 && (
        <>
          <BannerOtherProductComponent />
          <ProductsComponent
            title="Other"
            place="Other"
            products={products.productsOther}
          />
        </>
      )}
      <Text style={{height: 200, backgroundColor: 'red'}}></Text>
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
