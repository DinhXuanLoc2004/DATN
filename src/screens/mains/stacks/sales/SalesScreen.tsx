import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {colors} from '../../../../constants/colors';
import {handleSize} from '../../../../utils/handleSize';
import {useQuery} from '@tanstack/react-query';
import {getSalesActiveAPI} from '../../../../helper/apis/sale.api';
import { sale } from '../../../../helper/types/sale.type';
import TextComponent from '../../../../components/texts/TextComponent';

const SalesScreen = () => {
  const [sales, setsales] = useState<sale[]>([]);

  const fetchSales = async () => {
    const data = await getSalesActiveAPI();
    if (data?.metadata) {
      setsales(data.metadata);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  console.log(sales);

  return (
    <ContainerComponent
      isHeader
      back
      title="Sales"
      styleHeader={styles.header}>
        <TextComponent text='Sales'/>
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
