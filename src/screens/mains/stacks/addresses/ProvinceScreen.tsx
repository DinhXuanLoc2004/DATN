import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {province} from '../../../../helper/types/shippingaddress.type';
import {getAllProviceAPI} from '../../../../helper/apis/shippingaddress.api';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {handleSize} from '../../../../utils/handleSize';
import {colors} from '../../../../constants/colors';
import TextComponent from '../../../../components/texts/TextComponent';
import {fontFamilies} from '../../../../constants/fontFamilies';
import SearchComponent from '../../../../components/layouts/SearchComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../../../helper/store/store';
import {set_province} from '../../../../helper/store/slices/sort.slice';

type stackProp = StackNavigationProp<stackParamListMain, 'ProductsSaleScreen'>;

const ProvinceScreen = () => {
  const [provinces, setprovinces] = useState<province[]>([]);
  const [is_loading, setis_loading] = useState<boolean>(false);
  const [search, setsearch] = useState<string>('');
  const [province_filter, setprovince_filter] = useState<province[]>([]);

  const navigation = useNavigation<stackProp>();

  const getProvinces = async () => {
    setis_loading(true);
    const data = await getAllProviceAPI();
    if (data?.metadata) {
      setprovinces(data.metadata);
    }
    setis_loading(false);
  };

  useEffect(() => {
    getProvinces();
  }, []);

  const filter = (value: string) => {
    if (value) {
      const filtered = provinces.filter(item => {
        const province = item.ProvinceName.toLowerCase();
        return province.includes(value.toLowerCase());
      });
      setprovince_filter(filtered);
    } else {
      setprovince_filter([]);
    }
  };

  useEffect(() => {
    const debounceFilter = setTimeout(() => {
      filter(search);
    }, 200);

    return () => clearTimeout(debounceFilter);
  }, [search]);

  const dispatch = useAppDispatch();

  const province_store = useAppSelector(state => state.sort.province);

  const handleProvince = (item: province) => {
    dispatch(
      set_province({
        ProvinceID: item.ProvinceID,
        ProvinceName: item.ProvinceName,
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
              onRefresh={getProvinces}
              colors={[colors.Primary_Color]}
            />
          }
          data={province_filter.length > 0 ? province_filter : provinces}
          keyExtractor={item => item.ProvinceID.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleProvince(item)}>
              <RowComponent>
                <TextComponent
                  text={item.ProvinceName}
                  font={fontFamilies.medium}
                  size={14}
                />

                {item.ProvinceID === province_store.province_id ? (
                  <FontAwesome5
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

export default ProvinceScreen;

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
