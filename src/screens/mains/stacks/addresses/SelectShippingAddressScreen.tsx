import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Switch, TouchableOpacity} from 'react-native';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import DialogErrorIOS from '../../../../components/dialogs/DialogErrorIOS';
import DialogIOSComponent from '../../../../components/dialogs/DialogIOSComponent';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {getAllShippingAddressQueryKey} from '../../../../constants/queryKeys';
import {
  deleteShippingAddressAPI,
  fetchShippingAddresses,
  updateDefaultShippingAddress,
} from '../../../../helper/apis/shippingaddress.api';
import {useAppDispatch, useAppSelector} from '../../../../helper/store/store';
import {shipping_address} from '../../../../helper/types/shippingaddress.type';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {globalStyles} from '../../../../styles/globalStyle';
import {handleSize} from '../../../../utils/handleSize';
import {set_address_choose} from '../../../../helper/store/slices/sort.slice';

type NavigationProps = StackNavigationProp<
  stackParamListMain,
  'SelectShippingAddressScreen'
>;
type routeProp = RouteProp<stackParamListMain, 'SelectShippingAddressScreen'>;

const SelectShippingAddressScreen = ({route}: {route: routeProp}) => {
  const {is_select} = route.params;
  const navigation = useNavigation<NavigationProps>();
  const [shippingAddresses, setShippingAddresses] = useState<
    shipping_address[]
  >([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isErrorDialogVisible, setErrorDialogVisible] = useState(false);
  const user_id = useAppSelector(state => state.auth.user.userId);
  const [id_delete, setid_delete] = useState<string>('');

  const {data, isLoading, refetch} = useQuery({
    queryKey: [getAllShippingAddressQueryKey, user_id],
    queryFn: fetchShippingAddresses,
  });

  useEffect(() => {
    if (data?.metadata) {
      setShippingAddresses(data.metadata);
    }
  }, [data?.metadata]);

  const handleToggleStatus = async (_id: string) => {
    const response = await updateDefaultShippingAddress(_id);
    if (response?.status === 200) {
      refetch();
      if (response.metadata.is_default === true) {
        dispatch(
          set_address_choose({
            full_name: response.metadata.full_name,
            phone: response.metadata.phone,
            province_id: response.metadata.province_id,
            province_name: response.metadata.province_name,
            district_id: response.metadata.district_id,
            district_name: response.metadata.district_name,
            ward_code: response.metadata.ward_code,
            ward_name: response.metadata.ward_name,
            specific_address: response.metadata.specific_address,
          }),
        );
      }
    }
  };

  const handleDelete = (_id: string, is_default: boolean) => {
    if (is_default) {
      setErrorDialogVisible(true);
    } else {
      setid_delete(_id);
      setDialogVisible(true);
    }
  };

  const deleteAddress = async () => {
    const response = await deleteShippingAddressAPI(id_delete);
    if (response?.status === 200) {
      refetch();
    }
    setid_delete('');
    setDialogVisible(false);
  };

  const handleCancel = () => {
    setDialogVisible(false);
    setid_delete('');
  };

  const dispatch = useAppDispatch();

  const setAddressChoose = (item: shipping_address) => {
    dispatch(
      set_address_choose({
        full_name: item.full_name,
        phone: item.phone,
        province_id: item.province_id,
        province_name: item.province_name,
        district_id: item.district_id,
        district_name: item.district_name,
        ward_code: item.ward_code,
        ward_name: item.ward_name,
        specific_address: item.specific_address,
      }),
    );
    navigation.goBack();
  };

  return (
    <ContainerComponent
      style={styles.container}
      isHeader
      back
      title="Shipping Addresses"
      styleHeader={globalStyles.headerElevation}>
      <ContainerComponent isScroll>
        <SpaceComponent height={handleSize(15)} />
        {shippingAddresses.map(address => (
          <SectionComponent
            disabled={!is_select}
            key={address._id}
            style={styles.infoSection}
            onPress={() => {
              setAddressChoose(address);
            }}>
            <SpaceComponent height={handleSize(5)} />
            <RowComponent>
              <TextComponent
                text={address.full_name}
                size={handleSize(14)}
                color={colors.Text_Color}
                font={fontFamilies.bold}
              />
              <RowComponent>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UpdateAddressScreen', {
                      address_id: address._id,
                    });
                  }}>
                  <TextComponent
                    text="Edit"
                    size={handleSize(14)}
                    color={colors.Blue_Dark_Color}
                    font={fontFamilies.bold}
                  />
                </TouchableOpacity>
                <SpaceComponent width={5} />
                <TouchableOpacity
                  onPress={() => {
                    handleDelete(address._id, address.is_default);
                  }}>
                  <TextComponent
                    text="Delete"
                    size={handleSize(14)}
                    color={colors.Error_Color}
                    font={fontFamilies.bold}
                  />
                </TouchableOpacity>
              </RowComponent>
            </RowComponent>

            <SpaceComponent height={handleSize(10)} />
            <TextComponent
              text={address.phone.toString()}
              size={handleSize(14)}
              color={colors.Text_Color}
            />
            <SpaceComponent height={handleSize(10)} />
            <RowComponent>
              <TextComponent
                text={`${address.province_name}, ${address.district_name}, ${address.ward_name}`}
                size={handleSize(14)}
                color={colors.Text_Color}
                numberOfLines={1}
              />
            </RowComponent>
            <SpaceComponent height={handleSize(10)} />
            <TextComponent
              text={address.specific_address}
              size={handleSize(14)}
              color={colors.Text_Color}
            />
            <RowComponent>
              <TextComponent
                text="Use as the shipping address"
                size={handleSize(14)}
                color={colors.Text_Color}
              />
              <Switch
                value={address.is_default}
                onValueChange={() => {
                  handleToggleStatus(address._id);
                }}
              />
            </RowComponent>
          </SectionComponent>
        ))}
      </ContainerComponent>
      <SectionComponent style={styles.button}>
        <ButtonComponent
          text="Add new address"
          onPress={() => {
            navigation.navigate('AddNewAddress');
          }}
        />
      </SectionComponent>
      <DialogIOSComponent
        title="Confirm delete"
        content={`Are you sure you want to delete the address?`}
        isVisible={isDialogVisible}
        setIsVisible={setDialogVisible}
        txtBtnRight="Delete"
        fnRight={() => {
          deleteAddress();
        }}
        fnLeft={() => {
          handleCancel();
        }}
      />
      <DialogErrorIOS
        content="Default shipping address cannot be deleted!"
        isVisible={isErrorDialogVisible}
        setIsvisble={setErrorDialogVisible}
      />
    </ContainerComponent>
  );
};

export default SelectShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  infoSection: {
    marginTop: handleSize(10),
    padding: handleSize(10),
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: colors.White_Color,

    elevation: 5,
  },
  button: {
    borderRadius: 10,
    marginBottom: handleSize(20),
    paddingHorizontal: handleSize(16),
    position: 'absolute',
    width: '100%',
    bottom: handleSize(20),
  },
  position: {
    position: 'absolute',
    right: 50,
    top: 0,
  },
});
