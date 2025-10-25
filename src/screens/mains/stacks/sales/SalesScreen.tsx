import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {colors} from '../../../../constants/colors';
import {handleSize} from '../../../../utils/handleSize';
import {useQuery} from '@tanstack/react-query';
import {getSalesActiveAPI} from '../../../../helper/apis/sale.api';
import {sale} from '../../../../helper/types/sale.type';
import TextComponent from '../../../../components/texts/TextComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';
import CountDownTime from '../../../../components/layouts/times/CountDownTime';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import ItemSaleComponent from '../../../../components/layouts/items/ItemSaleComponent';

type stackProp = StackNavigationProp<stackParamListMain, 'SalesScreen'>;

const SalesScreen = () => {
  const [sales, setsales] = useState<sale[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const navigation = useNavigation<stackProp>();

  const fetchSales = async () => {
    setisLoading(true);
    const data = await getSalesActiveAPI();
    setisLoading(false);
    if (data?.metadata) {
      setsales(data.metadata);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <ContainerComponent isHeader back title="Sales" styleHeader={styles.header}>
      <SpaceComponent height={20} />
      <SectionComponent>
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={fetchSales}
              refreshing={isLoading}
              colors={[colors.Primary_Color]}
            />
          }
          data={sales}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ItemSaleComponent item={item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => <SpaceComponent height={10} />}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.White_Color,
    elevation: handleSize(5),
  },
});
