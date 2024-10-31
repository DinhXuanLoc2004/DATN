import {
  NavigationProp,
  RouteProp
} from '@react-navigation/native'; // Ensure NavigationProp is imported
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SearchComponent from '../../../../components/layouts/SearchComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import { colors } from '../../../../constants/colors';
import dataVN from '../../../../constants/local_datas/json/VN_geographic_data.json';
import { stackParamListMain } from '../../../../navigation/StackMainNavigation';
import { handleSize } from '../../../../utils/handleSize';

interface Province {
  Code: string;
  FullName: string;
  District: District[];
}

interface District {
  Code: string;
  FullName: string;
  Ward: Ward[];
}

interface Ward {
  Code: string;
  FullName: string;
}

type PreviousScreenAddProps = {
  navigation: NavigationProp<stackParamListMain>; // Define the type for navigation
  route: RouteProp<stackParamListMain, 'PreviousScreenAdd'>; // Define the type for route
};

const PreviousScreenAdd = ({navigation, route}: PreviousScreenAddProps) => {
  const {selectionType, selectedProvince, selectedDistrict} = route.params;
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectionType === 'province') {
      setProvinces(dataVN);
    } else if (selectionType === 'district' && selectedProvince) {
      const provinceData = dataVN.find(p => p.FullName === selectedProvince) as
        | Province
        | undefined;
      setDistricts(provinceData ? provinceData.District : []);
    } else if (selectionType === 'ward' && selectedDistrict) {
      const provinceData = dataVN.find(p =>
        p.District.some(d => d.FullName === selectedDistrict),
      ) as Province | undefined;
      const districtData = provinceData?.District.find(
        d => d.FullName === selectedDistrict,
      ) as District | undefined;
      setWards(districtData ? districtData.Ward : []);
    }
  }, [selectionType, selectedProvince, selectedDistrict]);

  const filteredData = (data: Province[] | District[] | Ward[]) =>
    data.filter(item =>
      item.FullName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const handleSelect = (item: Province | District | Ward) => {
    if (selectionType === 'province') {
      navigation.navigate('AddNewAddress', {province: item.FullName});
    } else if (selectionType === 'district') {
      navigation.navigate('AddNewAddress', {district: item.FullName});
    } else if (selectionType === 'ward') {
      navigation.navigate('AddNewAddress', {ward: item.FullName});
    }
  };

  const renderList = (data: Province[] | District[] | Ward[]) => (
    <FlatList
      data={filteredData(data)}
      keyExtractor={item => item.Code}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => handleSelect(item)}
          style={styles.item}>
          <TextComponent text={item.FullName} color={colors.Text_Color} />
        </TouchableOpacity>
      )}
    />
  );

  return (
    <ContainerComponent style={styles.container}>
      <RowComponent style={styles.containerSearch}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={handleSize(24)}
            color={colors.Primary_Color}
          />
        </TouchableOpacity>
        <SpaceComponent width={5} />
        <SearchComponent
          value={searchTerm}
          onChange={setSearchTerm}
          onClear
          placeholder="Search..."
        />
      </RowComponent>
      <SectionComponent>
        {selectionType === 'province' && renderList(provinces)}
        {selectionType === 'district' && renderList(districts)}
        {selectionType === 'ward' && renderList(wards)}
      </SectionComponent>
    </ContainerComponent>
  );
};

export default PreviousScreenAdd;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    backgroundColor: colors.Backgournd_Color,
  },
  containerSearch: {
    padding: handleSize(7),
    backgroundColor: colors.White_Color,
    elevation: 3.5,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.Backgournd_Color,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: colors.Gray_Light_Color,
    shadowColor: colors.Text_Color,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
});
