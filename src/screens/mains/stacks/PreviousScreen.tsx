import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import ContainerComponent from '../../../components/layouts/ContainerComponent';
import TextComponent from '../../../components/texts/TextComponent';

import { colors } from '../../../constants/colors';
import dataVN from '../../../constants/local_datas/json/VN_geographic_data.json';
import { handleSize } from '../../../utils/handleSize';

const PreviousScreen = () => {
  const navigation = useNavigation();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const handleSelect = (type, item) => {
    if (type === 'province') {
      setSelectedProvince(item);
      setSelectedDistrict(null);
      setSelectedWard(null);
    } else if (type === 'district') {
      setSelectedDistrict(item);
      setSelectedWard(null);
    } else if (type === 'ward') {
      setSelectedWard(item);
      navigation.navigate('AddNewAddress', {
        province: selectedProvince.FullName,
        district: selectedDistrict.FullName,
        ward: item.FullName,
      });
    }
  };

  return (
    <ContainerComponent isHeader back style={styles.container}>
      {selectedProvince && (
        <TouchableOpacity
          onPress={() => setSelectedProvince(null)}
          style={styles.selectedText}>
          <TextComponent
            text={`Tỉnh: ${selectedProvince.FullName}`}
            size={handleSize(14)}
            color={colors.Error_Color}
          />
        </TouchableOpacity>
      )}

      {selectedDistrict && (
        <TouchableOpacity
          onPress={() => setSelectedDistrict(null)}
          style={styles.selectedText}>
          <TextComponent
            text={`Huyện: ${selectedDistrict.FullName}`}
            size={handleSize(14)}
            color={colors.Error_Color}
          />
        </TouchableOpacity>
      )}

      {selectedWard && (
        <TouchableOpacity
          onPress={() => setSelectedWard(null)}
          style={styles.selectedText}>
          <TextComponent
            text={`Xã: ${selectedWard.FullName}`}
            size={handleSize(14)}
            color={colors.Error_Color}
          />
        </TouchableOpacity>
      )}

      {!selectedProvince && (
        <FlatList
          data={dataVN}
          keyExtractor={item => item.Code}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect('province', item)}
              style={styles.item}>
              <TextComponent
                text={item.FullName}
                size={handleSize(14)}
                color={colors.Text_Color}
              />
            </TouchableOpacity>
          )}
        />
      )}

      {selectedProvince && !selectedDistrict && (
        <FlatList
          data={selectedProvince.District}
          keyExtractor={item => item.Code}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect('district', item)}
              style={styles.item}>
              <TextComponent
                text={item.FullName}
                size={handleSize(14)}
                color={colors.Text_Color}
              />
            </TouchableOpacity>
          )}
        />
      )}

      {selectedDistrict && (
        <FlatList
          data={selectedDistrict.Ward}
          keyExtractor={item => item.Code}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelect('ward', item)}
              style={styles.item}>
              <TextComponent
                text={item.FullName}
                size={handleSize(14)}
                color={colors.Text_Color}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </ContainerComponent>
  );
};

export default PreviousScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: handleSize(0),
  },
  item: {
    padding: handleSize(20),
    backgroundColor: colors.White_Color,
    borderBottomWidth: handleSize(2),
    borderBottomColor: colors.Gray_Light_Color,
  },

  selectedText: {
    margin: 10,
  },
});
