import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import { colors } from '../../../constants/colors';
import { fontFamilies } from '../../../constants/fontFamilies';
import { handleSize } from '../../../utils/handleSize';

const SelectShippingAddressScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');

  useEffect(() => {
    if (route.params) {
      const {
        fullname: routeFullname,
        phoneNumber: routePhoneNumber,
        province: routeProvince,
        district: routeDistrict,
        ward: routeWard,
        detailedAddress: routeDetailedAddress,
      } = route.params;

      setFullname(routeFullname || '');
      setPhoneNumber(routePhoneNumber || '');
      setProvince(routeProvince || '');
      setDistrict(routeDistrict || '');
      setWard(routeWard || '');
      setDetailedAddress(routeDetailedAddress || '');
    }
  }, [route.params]);

  const handleConfirmPress = () => {
    // Navigate to the AddNewAddress screen
    navigation.navigate('AddNewAddress');
  };

  return (
    <ContainerComponent
      style={styles.container}
      isScroll
      isHeader
      back
      title="Chọn địa chỉ nhận hàng">
      <SpaceComponent height={handleSize(15)} />
      <TextComponent
        text="Địa chỉ"
        size={handleSize(13)}
        color={colors.Text_Color}
        font={fontFamilies.bold}
      />
      <SpaceComponent height={handleSize(20)} />

      <SectionComponent style={styles.infoSection}>
        <TextComponent
          text={`Họ và Tên: ${fullname}`}
          size={handleSize(15)}
          color={colors.Text_Color}
        />
        <TextComponent
          text={`Số Điện Thoại: ${phoneNumber}`}
          size={handleSize(15)}
          color={colors.Text_Color}
        />
        <TextComponent
          text={`Địa chỉ: ${province}, ${district}, ${ward}, ${detailedAddress}`}
          size={handleSize(15)}
          color={colors.Text_Color}
        />
      </SectionComponent>

      <SpaceComponent height={handleSize(30)} />

      <ButtonComponent
        style={styles.button}
        text="Thêm địa chỉ mới"
        onPress={handleConfirmPress}
      />
    </ContainerComponent>
  );
};

export default SelectShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: handleSize(20),
  },
  infoSection: {
    backgroundColor: colors.White_Color,
    padding: handleSize(10),
    borderRadius: handleSize(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: handleSize(5),
  },
  button: {
    marginTop: handleSize(20),
  },
});
