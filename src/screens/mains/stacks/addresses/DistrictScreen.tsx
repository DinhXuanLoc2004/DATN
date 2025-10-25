import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {district} from '../../../../helper/types/shippingaddress.type';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {handleSize} from '../../../../utils/handleSize';
import {colors} from '../../../../constants/colors';
import RowComponent from '../../../../components/layouts/RowComponent';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import SearchComponent from '../../../../components/layouts/SearchComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useAppDispatch, useAppSelector} from '../../../../helper/store/store';
import {getDistrictsAPI} from '../../../../helper/apis/shippingaddress.api';
import { set_district } from '../../../../helper/store/slices/sort.slice';

type stackProp = StackNavigationProp<stackParamListMain, 'DistrictScreen'>;

const DistrictScreen = () => {
  const [districts, setdistricts] = useState<district[]>([]);
  const [is_loading, setis_loading] = useState<boolean>(false);
  const [search, setsearch] = useState<string>('');
  const [districts_filter, setdistrict_filter] = useState<district[]>([]);

  const navigation = useNavigation<stackProp>();

  const province_id = useAppSelector(state => state.sort.province.province_id);

  const getDistricts = async () => {
    setis_loading(true);
    const data = await getDistrictsAPI(province_id);
    if (data?.metadata) {
      setdistricts(data.metadata);
    }
    setis_loading(false);
  };

  useEffect(() => {
    getDistricts()
  }, [])

  const filter = (value: string) => {
    if (value) {
      const filtered = districts.filter(item => {
        const province = item.DistrictName.toLowerCase();
        return province.includes(value.toLowerCase());
      });
      setdistrict_filter(filtered);
    } else {
      setdistrict_filter([]);
    }
  };

  useEffect(() => {
    const debounceFilter = setTimeout(() => {
      filter(search);
    }, 200);

    return () => clearTimeout(debounceFilter);
  }, [search]);


  const district_store = useAppSelector(state => state.sort.district)

  const dispatch = useAppDispatch()

  const handleDistrict = (item: district) => {
    dispatch(set_district({
        DistrictID: item.DistrictID,
        DistrictName: item.DistrictName
    }))
    navigation.goBack()
  } 
  

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
              onRefresh={getDistricts}
              colors={[colors.Primary_Color]}
            />
          }
          data={districts_filter.length > 0 ? districts_filter : districts}
          keyExtractor={item => item.DistrictID.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleDistrict(item)}>
              <RowComponent>
                <TextComponent
                  text={item.DistrictName}
                  font={fontFamilies.medium}
                  size={14}
                />

                {item.DistrictID === district_store.district_id ? (
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

export default DistrictScreen;

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
