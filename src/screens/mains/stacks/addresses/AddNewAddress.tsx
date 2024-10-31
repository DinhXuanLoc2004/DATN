import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import TextInputAnimationComponent from '../../../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import { colors } from '../../../../constants/colors';
import { fontFamilies } from '../../../../constants/fontFamilies';
import { handleSize } from '../../../../utils/handleSize';
import { useAppSelector } from '../../../../helper/store/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { stackParamListMain } from '../../../../navigation/StackMainNavigation';
import DialogIOSComponent from '../../../../components/dialogs/DialogIOSComponent';
import { addShippingAddress } from '../../../../helper/apis/shippingaddress.api';

type RouteParams = {
  province?: string;
  district?: string;
  ward?: string;
  addressId?: string;
  fullname?: string;
  phoneNumber?: string;
  detailedAddress?: string;
};

type NavigationProps = StackNavigationProp<stackParamListMain, 'AddNewAddress'>;

const AddNewAddress = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const navigation = useNavigation<NavigationProps>();

  const [fullname, setFullname] = useState(route.params?.fullname || '');
  const [phoneNumber, setPhoneNumber] = useState(route.params?.phoneNumber || '');
  const [province, setProvince] = useState(route.params?.province || '');
  const [district, setDistrict] = useState(route.params?.district || '');
  const [ward, setWard] = useState(route.params?.ward || '');
  const [detailedAddress, setDetailedAddress] = useState(route.params?.detailedAddress || '');
  const [isDefault, setIsDefault] = useState(true);
  const user_id = useAppSelector(state => state.auth.user.userId);
  const [isDialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    if (route.params?.province) setProvince(route.params.province);
    if (route.params?.district) setDistrict(route.params.district);
    if (route.params?.ward) setWard(route.params.ward);
  }, [route.params]);

  const handleProvincePress = () => {
    navigation.navigate('PreviousScreenAdd', { selectionType: 'province' });
  };

  const handleDistrictPress = () => {
    if (!province) {
      Alert.alert('Error', 'Please select a province first.');
      return;
    }
    navigation.navigate('PreviousScreenAdd', {
      selectionType: 'district',
      selectedProvince: province,
    });
  };

  const handleWardPress = () => {
    if (!district) {
      Alert.alert('Error', 'Please select a district first.');
      return;
    }
    navigation.navigate('PreviousScreenAdd', {
      selectionType: 'ward',
      selectedDistrict: district,
    });
  };

  const validateFields = () => {
    if (!fullname.trim()) {
      Alert.alert('Error', 'Full name cannot be left blank.');
      return false;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Phone Number cannot be left blank.');
      return false;
    }
    if (!detailedAddress.trim()) {
      Alert.alert('Error', 'Street Name, Building, House Number cannot be left blank.');
      return false;
    }
    return true;
  };

  const handleCompletePress = async () => {
    if (validateFields()) {
      try {
        const addressData = {
          _id: route.params?.addressId, 
          full_name: fullname,
          phone: phoneNumber, 
          province_city: province,
          district: district,
          ward_commune: ward,
          specific_address: detailedAddress,
          is_default: isDefault,
          user_id: user_id,
        };

        const response = await addShippingAddress(addressData);

        if (response.status === 201) {
          setDialogVisible(true);
        }
      } catch (error) {
        console.error('Error adding address:', error);
        Alert.alert('Error', 'An error occurred while adding the address. Please try again.');
      }
    }
  };

  const handleDialogConfirm = () => {
    setDialogVisible(false);
    navigation.goBack();
  };

  return (
    <ContainerComponent style={styles.container} isScroll isHeader back title="New Address">
      <TextComponent text="Contact" size={handleSize(13)} color={colors.Text_Color} font={fontFamilies.bold} style={styles.padding} />
      <SectionComponent>
        <TextInputAnimationComponent value={fullname} onChange={setFullname} plahoder="Fullname" isAnimationEnabled={false} style={styles.input} />
        <TextInputAnimationComponent value={phoneNumber} onChange={setPhoneNumber} plahoder="Phone number" isAnimationEnabled={false} style={styles.input} />
        <TextComponent text="Address" font={fontFamilies.bold} size={handleSize(13)} color={colors.Text_Color} style={styles.padding} />

        <TouchableOpacity style={styles.text} onPress={handleProvincePress} accessibilityLabel="Select province">
          <TextComponent color={province ? colors.Text_Color : colors.Gray_Color} size={handleSize(15)} font={fontFamilies.medium} text={province || 'Province/City'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.text} onPress={handleDistrictPress} accessibilityLabel="Select district">
          <TextComponent color={district ? colors.Text_Color : colors.Gray_Color} size={handleSize(15)} font={fontFamilies.medium} text={district || 'District'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.text} onPress={handleWardPress} accessibilityLabel="Select ward">
          <TextComponent color={ward ? colors.Text_Color : colors.Gray_Color} size={handleSize(15)} font={fontFamilies.medium} text={ward || 'Ward/Commune'} />
        </TouchableOpacity>

        <TextInputAnimationComponent value={detailedAddress} onChange={setDetailedAddress} plahoder="Street Name, Building, House Number" isAnimationEnabled={false} style={styles.input} />
      </SectionComponent>

      <TextComponent text="Setting" font={fontFamilies.bold} size={handleSize(13)} color={colors.Text_Color} style={styles.padding} />
      <RowComponent style={styles.text1}>
        <TextComponent text="Set as default address" size={handleSize(15)} color={colors.Gray_Color} />
        <SectionComponent style={styles.switch}>
          <Switch value={isDefault} onValueChange={setIsDefault} />
        </SectionComponent>
      </RowComponent>
      <SpaceComponent height={handleSize(30)} />
      <SectionComponent style={styles.paddingHorizontal}>
        <ButtonComponent text="COMPLETE" onPress={handleCompletePress} />
      </SectionComponent>

      <DialogIOSComponent
        isVisible={isDialogVisible}
        setIsVisible={setDialogVisible}
        content="Do you want to add the new address?!"
        txtBtnRight="OK"
        fnRight={handleDialogConfirm}
      />
    </ContainerComponent>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: handleSize(0),
  },
  input: {
    borderRadius: handleSize(0),
  },
  text: {
    height: handleSize(70),
    borderRadius: handleSize(0),
    paddingHorizontal: handleSize(10),
    justifyContent: 'center',
    backgroundColor: colors.White_Color,
  },
  text1: {
    height: handleSize(70),
    borderRadius: handleSize(0),
    paddingHorizontal: handleSize(10),
    backgroundColor: colors.White_Color,
    borderBottomWidth: 3,
    borderBottomColor: colors.Gray_Light_Color,
  },
  padding: {
    padding: handleSize(15),
  },
  paddingHorizontal: {
    paddingHorizontal: handleSize(20),
  },
  switch: {
    backgroundColor: colors.White_Color,
  },
});
