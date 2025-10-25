import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, TouchableOpacity } from 'react-native';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import DialogErrorIOS from '../../../../components/dialogs/DialogErrorIOS';
import TextInputAnimationComponent from '../../../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import { colors } from '../../../../constants/colors';
import { fontFamilies } from '../../../../constants/fontFamilies';
import { getAllShippingAddressQueryKey } from '../../../../constants/queryKeys';
import { getShippingAddressDetailAPI, updateShippingAddressAPI } from '../../../../helper/apis/shippingaddress.api';
import {
  remove_select_address,
  set_district,
  set_province,
  set_ward,
} from '../../../../helper/store/slices/sort.slice';
import { useAppDispatch, useAppSelector } from '../../../../helper/store/store';
import {
  updateShippingAddressBody
} from '../../../../helper/types/shippingaddress.type';
import { stackParamListMain } from '../../../../navigation/StackMainNavigation';
import { handleSize } from '../../../../utils/handleSize';

type stackProp = StackNavigationProp<stackParamListMain, 'UpdateAddressScreen'>;
type routeProp = RouteProp<stackParamListMain, 'UpdateAddressScreen'>;

const UpdateAddressScreen = ({route}: {route: routeProp}) => {
  const navigaiton = useNavigation<stackProp>();
  const {address_id} = route.params;

  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const [is_loading, setis_loading] = useState<boolean>(false);
  const [error, seterror] = useState<string>('');
  const [isVisible, setisVisible] = useState<boolean>(false);
  const [is_default_const, setis_default_const] = useState<boolean>(false);

  const province = useAppSelector(state => state.sort.province);
  const district = useAppSelector(state => state.sort.district);
  const ward = useAppSelector(state => state.sort.ward);

  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();

  const getShippingAddressDetail = async () => {
    setis_loading(true);
    const response = await getShippingAddressDetailAPI(address_id);
    if (response?.metadata) {
      setFullname(response.metadata.full_name);
      setPhoneNumber(response.metadata.phone.toString());
      dispatch(
        set_province({
          ProvinceID: response.metadata.province_id,
          ProvinceName: response.metadata.province_name,
        }),
      );
      dispatch(
        set_district({
          DistrictID: response.metadata.district_id,
          DistrictName: response.metadata.district_name,
        }),
      );
      dispatch(
        set_ward({
          WardCode: response.metadata.ward_code,
          WardName: response.metadata.ward_name,
        }),
      );
      setDetailedAddress(response.metadata.specific_address);
      setIsDefault(response.metadata.is_default);
      setis_default_const(response.metadata.is_default);
    }
    setis_loading(false);
  };

  useEffect(() => {
    getShippingAddressDetail();
  }, []);

  const handleUpdate = async () => {
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
      seterror('Please fill in all content!');
      setisVisible(true)
    }else if (is_default_const && !isDefault) {
      seterror('Default shipping address cannot be changed');
      setisVisible(true);
    }else{
      const body: updateShippingAddressBody = {
        full_name: fullname,
        phone: Number(phoneNumber),
        province_id: province.province_id,
        province_name: province.province_name,
        district_id: district.district_id,
        district_name: district.district_name,
        ward_code: ward.ward_code,
        ward_name: ward.ward_name,
        is_default: isDefault,
        specific_address: detailedAddress
      }

      const response = await updateShippingAddressAPI(address_id, body)
      if(response?.status === 200){
        queryClient.invalidateQueries({queryKey: [getAllShippingAddressQueryKey]})
        navigaiton.goBack()
        dispatch(remove_select_address())
      }
    }
  };

  return (
    <ContainerComponent
      style={styles.container}
      isScroll
      isHeader
      back
      title="Edit Address"
      backOnPress={() => {
        navigaiton.goBack();
        dispatch(remove_select_address());
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
          onPress={() => {
            navigaiton.navigate('ProvinceScreen');
          }}
          style={styles.text}>
          <TextComponent
            color={
              province.province_name ? colors.Text_Color : colors.Gray_Color
            }
            size={handleSize(14)}
            font={fontFamilies.medium}
            text={province.province_name || 'Province/City'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigaiton.navigate('DistrictScreen');
          }}
          style={styles.text}>
          <TextComponent
            color={
              district.district_name ? colors.Text_Color : colors.Gray_Color
            }
            size={handleSize(14)}
            font={fontFamilies.medium}
            text={district.district_name || 'District'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigaiton.navigate('WardScreen');
          }}
          style={styles.text}>
          <TextComponent
            color={ward.ward_name ? colors.Text_Color : colors.Gray_Color}
            size={handleSize(14)}
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
          size={handleSize(14)}
          color={colors.Text_Color}
        />
        <SectionComponent style={styles.switch}>
          <Switch value={isDefault} onValueChange={setIsDefault} />
        </SectionComponent>
      </RowComponent>
      <SpaceComponent height={handleSize(30)} />
      <SectionComponent style={styles.paddingHorizontal}>
        <ButtonComponent
          text="Complete"
          onPress={() => {
            handleUpdate();
          }}
        />
      </SectionComponent>
      <DialogErrorIOS
        content={error}
        isVisible={isVisible}
        setIsvisble={setisVisible}
        onPress={() => {
          setisVisible(false);
          if (is_default_const && !isDefault) {
            setIsDefault(true);
          }
        }}
      />
    </ContainerComponent>
  );
};

export default UpdateAddressScreen;

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
