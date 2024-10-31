import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import ButtonComponent from '../../../../components/buttons/ButtonComponent';
import DialogIOSComponent from '../../../../components/dialogs/DialogIOSComponent';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import RowComponent from '../../../../components/layouts/RowComponent';
import SectionComponent from '../../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import TextComponent from '../../../../components/texts/TextComponent';
import {colors} from '../../../../constants/colors';
import {fontFamilies} from '../../../../constants/fontFamilies';
import {useAppSelector} from '../../../../helper/store/store';
import {stackParamListMain} from '../../../../navigation/StackMainNavigation';
import {handleSize} from '../../../../utils/handleSize';
import {
  fetchShippingAddresses,
  updateDefaultShippingAddress,
  deleteShippingAddress,
} from '../../../../helper/apis/shippingaddress.api';
import {ShippingAddress} from '../../../../helper/types/shippingaddress.type';

type NavigationProps = StackNavigationProp<
  stackParamListMain,
  'SelectShippingAddressScreen'
>;

const SelectShippingAddressScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [shippingAddresses, setShippingAddresses] = useState<ShippingAddress[]>([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isErrorDialogVisible, setErrorDialogVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<ShippingAddress | null>(null);
  const user_id = useAppSelector(state => state.auth.user.userId);

  const loadShippingAddresses = async () => {
    try {
      const addresses = await fetchShippingAddresses(user_id);
      setShippingAddresses(addresses);
    } catch (error) {
      console.error('Error fetching shipping addresses:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadShippingAddresses();
    }, [user_id]),
  );

  const handleConfirmPress = () => {
    navigation.navigate('AddNewAddress', {
      province: '',
      district: '',
      ward: '',
    });
  };

  const handleEditPress = (address: ShippingAddress) => {
    navigation.navigate('UpdateNewAddress', {
      addressId: address._id,
    });
  };

  const handleToggleSwitch = async (address: ShippingAddress) => {
    try {
      await updateDefaultShippingAddress(address);
      setShippingAddresses(prevAddresses =>
        prevAddresses.map(addr =>
          addr._id === address._id
            ? {...addr, is_default: !addr.is_default}
            : {...addr, is_default: false},
        ),
      );
    } catch (error) {
      console.error('Error updating default shipping address:', error);
    }
  };

  const handleDeletePress = (address: ShippingAddress) => {
    if (address.is_default) {
      setErrorDialogVisible(true);
    } else {
      setAddressToDelete(address);
      setDialogVisible(true);
    }
  };

  const confirmDelete = async () => {
    if (addressToDelete) {
      try {
        await deleteShippingAddress(addressToDelete._id);
        setShippingAddresses(prevAddresses =>
          prevAddresses.filter(addr => addr._id !== addressToDelete._id),
        );
      } catch (error) {
        console.error('Error deleting shipping address:', error);
      } finally {
        setDialogVisible(false);
        setAddressToDelete(null);
      }
    }
  };

  const handleErrorDialogClose = () => {
    setErrorDialogVisible(false);
  };

  return (
    <ContainerComponent
      style={styles.container}
      isScroll
      isHeader
      back
      title="Shipping Addresses">
      <ScrollView>
        <SpaceComponent height={handleSize(15)} />
        {shippingAddresses.map(address => (
          <SectionComponent key={address._id} style={styles.infoSection}>
            <SpaceComponent height={handleSize(5)} />
            <RowComponent>
              <TextComponent
                text={address.full_name}
                size={handleSize(14)}
                color={colors.Text_Color}
                font={fontFamilies.bold}
              />
               <TouchableOpacity style={styles.position} onPress={() => handleEditPress(address)}>
              <TextComponent
                text="Edit"
                size={handleSize(14)}
                color={colors.Blue_Dark_Color}
                font={fontFamilies.bold}
                
              />
            </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePress(address)}>
                <TextComponent
                  text="Delete"
                  size={handleSize(14)}
                  color={colors.Error_Color}
                  font={fontFamilies.bold}
                />
              </TouchableOpacity>

             
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
                text={`${address.province_city}, ${address.district}, ${address.ward_commune}`}
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
                onValueChange={() => handleToggleSwitch(address)}
              />
            </RowComponent>
          </SectionComponent>
        ))}
      </ScrollView>
      <SpaceComponent height={handleSize(30)} />
      <ButtonComponent
        style={styles.button}
        text="Add new address"
        onPress={handleConfirmPress}
      />
      <DialogIOSComponent
        title="Confirm delete"
        content={`Are you sure you want to delete the address for ${addressToDelete?.full_name}?`}
        isVisible={isDialogVisible}
        setIsVisible={setDialogVisible}
        txtBtnRight="Delete"
        fnRight={confirmDelete}
      />
      <DialogIOSComponent
        title="Error"
        content="Cannot delete the default address."
        isVisible={isErrorDialogVisible}
        setIsVisible={setErrorDialogVisible}
        txtBtnRight="OK"
        fnRight={handleErrorDialogClose}
      />
    </ContainerComponent>
  );
};

export default SelectShippingAddressScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: handleSize(5),
  },
  infoSection: {
    marginTop:handleSize(10),
    padding: handleSize(10),
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: colors.White_Color, 
   
    elevation: 5, 
  },
  button: {
    borderRadius: 10,
    marginBottom: handleSize(20),
  },
  position: {
   position:'absolute',
   right:50,
   top:0,
  },
});
