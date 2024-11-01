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
            <RowComponent
              justify="flex-start"
              style={styles.item}
              onPress={() => {
                navigation.navigate('ProductsSaleScreen', {
                  sale_id: item._id,
                  name_sale: item.name_sale,
                });
              }}>
              <Image source={{uri: item.thumb}} style={styles.img} />
              <SpaceComponent width={10} />
              <SectionComponent style={styles.containerRigth}>
                <TextComponent
                  text={item.name_sale}
                  size={20}
                  font={fontFamilies.medium}
                  color={colors.Primary_Color}
                />
                <SpaceComponent height={5} />
                <TextComponent
                  text={`Sale: ${item.discount}%`}
                  size={15}
                  font={fontFamilies.medium}
                  color={colors.Primary_Color}
                />
                <SpaceComponent height={20} />
                <CountDownTime time_end={item.time_end} />
              </SectionComponent>
            </RowComponent>
          )}
          ItemSeparatorComponent={() => <SpaceComponent height={10} />}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  containerRigth: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  img: {
    height: '100%',
    width: '50%',
    borderTopLeftRadius: handleSize(8),
    borderBottomLeftRadius: handleSize(8),
  },
  item: {
    height: handleSize(100),
    width: '100%',
    borderRadius: handleSize(8),
    backgroundColor: colors.White_Color,
    elevation: 3,
  },
  header: {
    backgroundColor: colors.White_Color,
    elevation: handleSize(5),
  },
});
