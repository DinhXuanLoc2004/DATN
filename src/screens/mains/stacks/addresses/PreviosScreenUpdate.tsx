import { NavigationProp, RouteProp } from '@react-navigation/native';
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

// Define types for navigation and route
type PreviousScreenUpdateProps = {
  navigation: NavigationProp<stackParamListMain>;
  route: RouteProp<stackParamListMain, 'PreviousScreenUpdate'>;
};

const PreviousScreenUpdate: React.FC<PreviousScreenUpdateProps> = ({
  navigation,
  route,
}) => {
  const {selectionType, selectedProvince, selectedDistrict, addressId} =
    route.params;

  useEffect(() => {
    console.log('Address ID:', addressId);
  }, [addressId]);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (selectionType === 'province') {
      setProvinces(dataVN);
    } else if (selectionType === 'district' && selectedProvince) {
      const provinceData = dataVN.find(p => p.FullName === selectedProvince);
      setDistricts(provinceData ? provinceData.District : []);
    } else if (selectionType === 'ward' && selectedDistrict) {
      const provinceData = dataVN.find(p =>
        p.District.some(d => d.FullName === selectedDistrict),
      );
      const districtData = provinceData?.District.find(
        d => d.FullName === selectedDistrict,
      );
      setWards(districtData ? districtData.Ward : []);
    }
  }, [selectionType, selectedProvince, selectedDistrict]);

  const filteredData = (data: Province[] | District[] | Ward[]) =>
    data.filter(item =>
      item.FullName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  const handleSelect = (item: Province | District | Ward) => {
    // Create selectedData object, including addressId
    const selectedData = {
      addressId, // Include addressId
      province: selectionType === 'province' ? item.FullName : selectedProvince,
      district: selectionType === 'district' ? item.FullName : selectedDistrict,
      ward: selectionType === 'ward' ? item.FullName : null,
    };

    // Check if the selected data is correct before navigation
    console.log('Selected Data:', selectedData);

    navigation.navigate('UpdateNewAddress', selectedData);
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

export default PreviousScreenUpdate;

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
