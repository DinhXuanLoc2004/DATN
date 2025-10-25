import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {StyleSheet, Switch, TouchableOpacity} from 'react-native';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import DialogErrorIOS from '../../../../components/dialogs/DialogErrorIOS';
import TextInputAnimationComponent from '../../../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {getAllShippingAddressQueryKey} from '../../../../constants/queryKeys';
import {addShippingAddressAPI} from '../../../../helper/apis/shippingaddress.api';
import {remove_select_address} from '../../../../helper/store/slices/sort.slice';
import {useAppDispatch, useAppSelector} from '../../../../helper/store/store';
import {addShippingAddressBody} from '../../../../helper/types/shippingaddress.type';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {globalStyles} from '../../../../styles/globalStyle';
import {handleSize} from '../../../../utils/handleSize';

type NavigationProps = StackNavigationProp<stackParamListMain, 'AddNewAddress'>;

const AddNewAddress = () => {
  const navigation = useNavigation<NavigationProps>();

  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const [isVisibleError, setisVisibleError] = useState(false);
  const user_id = useAppSelector(state => state.auth.user.userId);

  const handleProvincePress = () => {
    navigation.navigate('ProvinceScreen');
  };

  const province = useAppSelector(state => state.sort.province);

  const district = useAppSelector(state => state.sort.district);

  const ward = useAppSelector(state => state.sort.ward);

  const handleDistrictPress = () => {
    navigation.navigate('DistrictScreen');
  };

  const handleWardPress = () => {
    navigation.navigate('WardScreen');
  };

  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const handleCompletePress = async () => {
    if (
      !fullname ||
      !phoneNumber ||
      province.province_id === 0 ||
      !province.province_name ||
      district.district_id === 0 ||
      !district.district_name ||
      !ward.ward_code ||
      !ward.ward_name ||
      !detailedAddress
    ) {
      setisVisibleError(true);
    } else {
      const shipping_address: addShippingAddressBody = {
        full_name: fullname,
        phone: Number(phoneNumber),
        province_name: province.province_name,
        province_id: province.province_id,
        district_id: district.district_id,
        district_name: district.district_name,
        ward_code: ward.ward_code,
        ward_name: ward.ward_name,
        is_default: isDefault,
        specific_address: detailedAddress,
        user_id,
      };
      const response = await addShippingAddressAPI(shipping_address);
      if (response?.status === 201) {
        navigation.goBack();
        dispatch(remove_select_address());
        queryClient.invalidateQueries({
          queryKey: [getAllShippingAddressQueryKey],
        });
      }
    }
  };

  return (
    <ContainerComponent
      style={styles.container}
      isScroll
      isHeader
      back
      title="New Address"
      styleHeader={globalStyles.headerElevation}
      backOnPress={() => {
        dispatch(remove_select_address());
        navigation.goBack();
      }}>
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

        <TouchableOpacity
          style={styles.text}
          onPress={handleProvincePress}
          accessibilityLabel="Select province">
          <TextComponent
            color={
              province.province_name ? colors.Text_Color : colors.Gray_Color
            }
            size={handleSize(13)}
            font={fontFamilies.medium}
            text={province.province_name || 'Province/City'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.text}
          onPress={handleDistrictPress}
          accessibilityLabel="Select district">
          <TextComponent
            color={
              district.district_name ? colors.Text_Color : colors.Gray_Color
            }
            size={handleSize(13)}
            font={fontFamilies.medium}
            text={district.district_name || 'District'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.text}
          onPress={handleWardPress}
          accessibilityLabel="Select ward">
          <TextComponent
            color={ward.ward_name ? colors.Text_Color : colors.Gray_Color}
            size={handleSize(13)}
            font={fontFamilies.medium}
            text={ward.ward_name || 'Ward/Commune'}
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
          color={colors.Gray_Color}
        />
        <SectionComponent style={styles.switch}>
          <Switch value={isDefault} onValueChange={setIsDefault} />
        </SectionComponent>
      </RowComponent>
      <SpaceComponent height={handleSize(30)} />
      <SectionComponent style={styles.paddingHorizontal}>
        <ButtonComponent
          text="COMPLETE"
          onPress={() => {
            handleCompletePress();
          }}
        />
      </SectionComponent>
      <DialogErrorIOS
        content="Please fill in all content!"
        isVisible={isVisibleError}
        setIsvisble={setisVisibleError}
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
