import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {handleSize} from '../../../../utils/handleSize';
import {colors} from '../../../../constants/colors';
import {ward} from '../../../../helper/types/shippingaddress.type';
import {useAppDispatch, useAppSelector} from '../../../../helper/store/store';
import {getWardAPI} from '../../../../helper/apis/shippingaddress.api';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {set_ward} from '../../../../helper/store/slices/sort.slice';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import SearchComponent from '../../../../components/layouts/SearchComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import { fontFamilies } from '../../../../constants/fontFamilies';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type stackProp = StackNavigationProp<stackParamListMain, 'WardScreen'>;

const WardScreen = () => {
  const [wards, setwards] = useState<ward[]>([]);
  const [is_loading, setis_loading] = useState<boolean>(false);
  const [search, setsearch] = useState<string>('');
  const [wards_filter, setwards_filter] = useState<ward[]>([]);

  const navigation = useNavigation<stackProp>();

  const district_id = useAppSelector(state => state.sort.district.district_id);

  const getWards = async () => {
    setis_loading(true);
    const data = await getWardAPI(district_id);
    if (data?.metadata) {
      setwards(data.metadata);
    }
    setis_loading(false);
  };

  useEffect(() => {
    getWards();
  }, []);

  const filter = (value: string) => {
    if (value) {
      const filtered = wards.filter(item => {
        const province = item.WardName.toLowerCase();
        return province.includes(value.toLowerCase());
      });
      setwards_filter(filtered);
    } else {
      setwards_filter([]);
    }
  };

  useEffect(() => {
    const debounceFilter = setTimeout(() => {
      filter(search);
    }, 200);

    return () => clearTimeout(debounceFilter);
  }, [search]);

  const ward_store = useAppSelector(state => state.sort.ward);

  const dispatch = useAppDispatch();

  const handleWard = (item: ward) => {
    dispatch(
      set_ward({
        WardCode: item.WardCode,
        WardName: item.WardName,
      }),
    );
    navigation.goBack();
  };

  if (is_loading)
    return (
      <ContainerComponent>
        <ActivityIndicator size={handleSize(20)} color={colors.Primary_Color} />
      </ContainerComponent>
    );

  return (
    <ContainerComponent style={styles.container}>
      <RowComponent style={styles.containerSearch}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name="arrow-back-outline"
            size={handleSize(24)}
            color={colors.Gray_Color}
          />
        </TouchableOpacity>
        <SpaceComponent width={5} />
        <SearchComponent
          value={search}
          onChange={setsearch}
          onClear
          placeholder="Search..."
          colorIconSearch={colors.Gray_Color}
          style={styles.search}
        />
      </RowComponent>
      <SpaceComponent height={10} />
      <SectionComponent>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={is_loading}
              onRefresh={getWards}
              colors={[colors.Primary_Color]}
            />
          }
          data={wards_filter.length > 0 ? wards_filter : wards}
          keyExtractor={item => item.WardCode.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleWard(item)}>
              <RowComponent>
                <TextComponent
                  text={item.WardName}
                  font={fontFamilies.medium}
                  size={14}
                />

                {item.WardCode === ward_store.ward_code ? (
                  <FontAwesome5Icon
                    name="check-circle"
                    size={handleSize(15)}
                    color={colors.Primary_Color}
                  />
                ) : (
                  <View />
                )}
              </RowComponent>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default WardScreen;

const styles = StyleSheet.create({
  containerSearch: {
    padding: handleSize(7),
    backgroundColor: colors.White_Color,
    elevation: 3.5,
  },
  search: {
    borderColor: colors.Gray_Color,
  },
  btn: {
    padding: handleSize(16),
    backgroundColor: colors.White_Color,
    elevation: 3,
  },
  container: {
    paddingHorizontal: 0,
  },
});
