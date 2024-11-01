import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import DialogIOSComponent from '../../../../components/dialogs/DialogIOSComponent';
import TextInputAnimationComponent from '../../../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import axiosIntercreptor from '../../../../helper/config/axiosIntercreptor';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {handleSize} from '../../../../utils/handleSize';
import {
  updateShippingAddressBody,
  updateShippingAddressResponse,
} from '../../../../helper/types/shippingaddress.type';
import {useQueryClient} from '@tanstack/react-query';
import {getShippingAddressDefaultQuerykey} from '../../../../constants/queryKeys';

type RouteParams = {
  addressId: string;
  province?: string;
  district?: string;
  ward?: string;
};

type NavigationProps = StackNavigationProp<
  stackParamListMain,
  'UpdateNewAddress'
>;

interface AddressMetadata {
  _id: string;
  district: string;
  full_name: string;
  is_default: boolean;
  phone: number | string;
  province_city: string;
  specific_address: string;
  user_id: string;
  ward_commune: string;
}

interface AddressResponse {
  message: string;
  metadata: AddressMetadata;
  status: number;
}

const UpdateNewAddress = () => {
  const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
  const navigation = useNavigation<NavigationProps>();

  const [addressId, setAddressId] = useState<string | null>(null);
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const [isDialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    if (route.params?.addressId) {
      setAddressId(route.params.addressId);
      AddressDetails(route.params.addressId);
    }
  }, [route.params.addressId]);

  useEffect(() => {
    const {
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
    } = route.params;
    if (selectedProvince) setProvince(selectedProvince);
    if (selectedDistrict) setDistrict(selectedDistrict);
    if (selectedWard) setWard(selectedWard);
  }, [route.params]);

  const AddressDetails = async (addressId: string) => {
    try {
      const addressData: AddressResponse = await axiosIntercreptor.get(
        `shipping_address/get_detail_shipping_address?_id=${addressId}`,
      );
      if (addressData.status === 200) {
        const {metadata} = addressData;
        if (metadata) {
          setFullname(metadata.full_name || '');
          setPhoneNumber(metadata.phone ? metadata.phone.toString() : '');
          setProvince(metadata.province_city || '');
          setDistrict(metadata.district || '');
          setWard(metadata.ward_commune || '');
          setDetailedAddress(metadata.specific_address || '');
          setIsDefault(metadata.is_default || false);
        } else {
          console.log('No data found in metadata');
        }
      } else {
        Alert.alert(
          'Error',
          'Failed to fetch address details. Please try again.',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to fetch address details. Please try again later.',
      );
    }
  };

  const handleProvincePress = () => {
    if (addressId) {
      setDistrict('');
      setWard('');
      navigation.navigate('PreviousScreenUpdate', {
        selectionType: 'province',
        addressId,
      });
    } else {
      Alert.alert('Error', 'Address ID is missing.');
    }
  };

  const handleDistrictPress = () => {
    if (!province) {
      Alert.alert('Error', 'Please select a province first.');
      return;
    }
    if (addressId) {
      setWard('');
      navigation.navigate('PreviousScreenUpdate', {
        selectionType: 'district',
        selectedProvince: province,
        addressId,
      });
    }
  };

  const handleWardPress = () => {
    if (!district) {
      Alert.alert('Error', 'Please select a district first.');
      return;
    }
    if (addressId) {
      navigation.navigate('PreviousScreenUpdate', {
        selectionType: 'ward',
        selectedDistrict: district,
        addressId,
      });
    }
  };

  const queryClient = useQueryClient();

  const handleCompletePress = async () => {
    if (!addressId) {
      Alert.alert('Error', 'Missing address ID.');
      return;
    }

    try {
      const updateData: updateShippingAddressBody = {
        full_name: fullname,
        phone: Number(phoneNumber),
        province_city: province,
        district: district,
        ward_commune: ward,
        specific_address: detailedAddress,
        is_default: isDefault,
      };

      const response = await axiosIntercreptor.put<
        updateShippingAddressBody,
        updateShippingAddressResponse
      >(
        `shipping_address/update_shipping_address?_id=${addressId}`,
        updateData,
      );

      if (response) {
        setDialogVisible(true);
      }
      if (response && response.metadata.is_default) {
        queryClient.invalidateQueries({
          queryKey: [getShippingAddressDefaultQuerykey],
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update address. Please try again.');
    }
  };

  const handleDialogConfirm = () => {
    setDialogVisible(false);
    navigation.goBack();
  };

  return (
    <ContainerComponent
      style={styles.container}
      isScroll
      isHeader
      back
      title="Edit Address">
      <TextComponent
        text="Contact"
        size={handleSize(13)}
        color={colors.Text_Color}
        font={fontFamilies.bold}
        style={styles.padding}
      />
      <SectionComponent>
        <TextInputAnimationComponent
          value={fullname}
          onChange={setFullname}
          plahoder="Fullname"
          isAnimationEnabled={false}
          style={styles.input}
        />
        <TextInputAnimationComponent
          value={phoneNumber}
          onChange={setPhoneNumber}
          plahoder="Phone number"
          isAnimationEnabled={false}
          style={styles.input}
        />
        <TextComponent
          text="Address"
          font={fontFamilies.bold}
          size={handleSize(13)}
          color={colors.Text_Color}
          style={styles.padding}
        />

        <TouchableOpacity onPress={handleProvincePress} style={styles.text}>
          <TextComponent
            color={province ? colors.Text_Color : colors.Gray_Color}
            size={handleSize(14)}
            font={fontFamilies.medium}
            text={province || 'Province/City'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDistrictPress} style={styles.text}>
          <TextComponent
            color={district ? colors.Text_Color : colors.Gray_Color}
            size={handleSize(14)}
            font={fontFamilies.medium}
            text={district || 'District'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleWardPress} style={styles.text}>
          <TextComponent
            color={ward ? colors.Text_Color : colors.Gray_Color}
            size={handleSize(14)}
            font={fontFamilies.medium}
            text={ward || 'Ward/Commune'}
          />
        </TouchableOpacity>

        <TextInputAnimationComponent
          value={detailedAddress}
          onChange={setDetailedAddress}
          plahoder="Street Name, Building, House Number"
          isAnimationEnabled={false}
          style={styles.input}
        />
      </SectionComponent>

      <TextComponent
        text="Setting"
        font={fontFamilies.bold}
        size={handleSize(13)}
        color={colors.Text_Color}
        style={styles.padding}
      />
      <RowComponent style={styles.text1}>
        <TextComponent
          text="Set as default address"
          size={handleSize(15)}
          color={colors.Text_Color}
        />
        <SectionComponent style={styles.switch}>
          <Switch value={isDefault} onValueChange={setIsDefault} />
        </SectionComponent>
      </RowComponent>
      <SpaceComponent height={handleSize(30)} />
      <SectionComponent style={styles.paddingHorizontal}>
        <ButtonComponent text="Complete" onPress={handleCompletePress} />
      </SectionComponent>
      <DialogIOSComponent
        isVisible={isDialogVisible}
        setIsVisible={setDialogVisible}
        content="Do you want to edit the new address?!"
        txtBtnRight="OK"
        fnRight={handleDialogConfirm}
      />
    </ContainerComponent>
  );
};

export default UpdateNewAddress;

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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.White_Color,
  },
  padding: {
    padding: handleSize(15),
  },
  paddingHorizontal: {
    paddingHorizontal: handleSize(10),
  },
  switch: {
    backgroundColor: colors.White_Color,
  },
});
