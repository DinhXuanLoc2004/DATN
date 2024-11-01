import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';
import {useAppDispatch} from '../../../helper/store/store';
import {delivery_method} from '../../../helper/types/delivery_method.type';
import {getAllDeliveryMethodAPI} from '../../../helper/apis/delivery_method.api';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import {globalStyles} from '../../../styles/globalStyle';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import {handleSize} from '../../../utils/handleSize';
import {colors} from '../../../constants/colors';
import RowComponent from '../../../components/layouts/RowComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { setDeliveryMethod } from '../../../helper/store/slices/sort.slice';

type routeProp = RouteProp<stackParamListMain, 'DeliveryMethodScreen'>;
type stackProp = StackNavigationProp<stackParamListMain, 'DeliveryMethodScreen'>

const DeliveryMethodScreen = ({route}: {route: routeProp}) => {
  const {delivery_id} = route.params;
  const [delivery_id_default, setdelivery_id_default] =
    useState<string>(delivery_id);
  const [delivery_methods, setdelivery_methods] = useState<delivery_method[]>(
    [],
  );

  const navigation = useNavigation<stackProp>()
  const dispatch = useAppDispatch();

  const getAllDelivery = async () => {
    const data = await getAllDeliveryMethodAPI();
    if (data?.metadata) {
      setdelivery_methods(data.metadata);
    }
  };

  useEffect(() => {
    getAllDelivery();
  }, []);

  return (
    <ContainerComponent
      isHeader
      back
      title="Delivery methods"
      styleHeader={globalStyles.headerElevation}
      style={styles.container}>
      <SpaceComponent height={20} />
      <FlatList
        data={delivery_methods}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <SectionComponent
            style={[
              styles.item,
              {
                borderLeftColor:
                  item._id === delivery_id_default
                    ? colors.Primary_Color
                    : colors.Backgournd_Color,
              },
            ]}
            onPress={() => setdelivery_id_default(item._id)}>
            <RowComponent>
              <TextComponent
                text={item.name_delivery}
                size={13}
                font={fontFamilies.medium}
              />
              <RowComponent>
                <TextComponent
                  text={`đ${item.delivery_fee}`}
                  size={12}
                  font={fontFamilies.medium}
                />
                {item._id === delivery_id_default && (
                  <RowComponent>
                    <SpaceComponent width={5} />
                    <FontAwesome5
                      name="check"
                      color={colors.Primary_Color}
                      size={handleSize(15)}
                    />
                  </RowComponent>
                )}
              </RowComponent>
            </RowComponent>
          </SectionComponent>
        )}
      />
      <SectionComponent style={styles.containerBtn}>
        <ButtonComponent text="Confirm" onPress={() => {
            dispatch(setDeliveryMethod({delivery_id: delivery_id_default}))
            navigation.goBack()
        }} />
        <SpaceComponent height={20} />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default DeliveryMethodScreen;

const styles = StyleSheet.create({
  containerBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: handleSize(16)
  },
  item: {
    padding: handleSize(16),
    borderLeftWidth: handleSize(5),
    borderBottomWidth: 1,
    borderBottomColor: colors.Gray_Color,
    backgroundColor: colors.White_Color,
  },
  container: {
    paddingHorizontal: 0,
  },
});
