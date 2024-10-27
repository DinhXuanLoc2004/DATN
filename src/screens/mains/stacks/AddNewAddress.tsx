import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import TextInputAnimationComponent from '../../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import { colors } from '../../../constants/colors';
import { fontFamilies } from '../../../constants/fontFamilies';
import { handleSize } from '../../../utils/handleSize';

const AddNewAddress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [address, setAddress] = useState(null);
  useEffect(() => {
    if (route.params) {
      const {
        province: selectedProvince,
        district: selectedDistrict,
        ward: selectedWard,
        address,
      } = route.params;

      if (address) {
        setProvince(address);
      } else {
        setProvince(selectedProvince);
        setDistrict(selectedDistrict);
        setWard(selectedWard);
      }
    }
  }, [route.params]);

  const handleAddressPress = () => {
    navigation.navigate('PreviousScreen');
  };

  const validateFields = () => {
    if (!fullname.trim()) {
      Alert.alert('Error', 'Họ và Tên không được để trống.');
      return false;
    }
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Số Điện Thoại không được để trống.');
      return false;
    }
    if (!detailedAddress.trim()) {
      Alert.alert('Error', 'Tên đường, Tòa nhà, Số nhà không được để trống.');
      return false;
    }
    return true;
  };

  const handleCompletePress = () => {
    console.log(
      fullname,
      phoneNumber,
      province,
      district,
      ward,
      detailedAddress,
    );
    if (validateFields()) {
      navigation.navigate('SelectShippingAddressScreen', {
        fullname,
        phoneNumber,
        province,
        district,
        ward,
        detailedAddress,
        isDefault,
      });
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Quyền truy cập vị trí bị từ chối');
      return;
    }

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 20000,
    })
      .then(location => {
        getAddressFromCoordinates(location.latitude, location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
        Alert.alert('Lỗi lấy vị trí', message);
      });
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    const HERE_API_KEY = 'u-_t60NyPEJ7Q1gWVv__lfEUeukc3Ux3JCMjXfyfPBw';
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=vi-VN&limit=1&apiKey=${HERE_API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.items.length > 0) {
        const addressData = response.data.items[0].title;
        const finalAddress = addressData
          .split(',')
          .slice(1, -1)
          .join(',')
          .trim();
        setAddress(finalAddress);
        navigation.navigate('AddNewAddress', {
          address: finalAddress,
        });
      } else {
        setAddress('Không tìm thấy địa chỉ');
      }
    } catch (error) {
      console.error(
        'AxiosError:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert('Lỗi khi gọi API', error.message);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permission to access location',
          message:
            'This app needs access to your location to get the current position.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  return (
    <ContainerComponent
      style={styles.container}
      isScroll
      isHeader
      back
      title="Địa chỉ mới">
      <SpaceComponent height={handleSize(15)} />
      <TextComponent
        text="Liên hệ"
        size={handleSize(13)}
        color={colors.Text_Color}
        font={fontFamilies.bold}
      />
      <SpaceComponent height={handleSize(20)} />
      <SectionComponent>
        <TextInputAnimationComponent
          value={fullname}
          onChange={setFullname}
          plahoder="Họ và Tên"
          isAnimationEnabled={false}
          style={styles.input}
        />
        <TextInputAnimationComponent
          value={phoneNumber}
          onChange={setPhoneNumber}
          plahoder="Số Điện Thoại"
          isAnimationEnabled={false}
          style={styles.input}
        />
        <SpaceComponent height={handleSize(25)} />
        <TextComponent
          text="Địa chỉ"
          font={fontFamilies.bold}
          size={handleSize(13)}
          color={colors.Text_Color}
        />
        <SpaceComponent height={handleSize(30)} />

        <TouchableOpacity onPress={handleAddressPress} style={styles.text}>
          <TextComponent
            color={province ? colors.Text_Color : colors.Gray_Color}
            size={handleSize(15)}
            font={fontFamilies.medium}
            text={
              province
                ? district && ward
                  ? `${province}, ${district}, ${ward}`
                  : province
                : 'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'
            }
          />
        </TouchableOpacity>

        <TextInputAnimationComponent
          value={detailedAddress}
          onChange={setDetailedAddress}
          plahoder="Tên đường, Tòa nhà, Số nhà"
          isAnimationEnabled={false}
          style={styles.input}
        />
      </SectionComponent>

      <TouchableOpacity onPress={getCurrentLocation} style={styles.button}>
        <TextComponent
          size={13}
          font={fontFamilies.semiBold}
          text="Lấy vị trí hiện tại"
        />
      </TouchableOpacity>

      <SpaceComponent height={handleSize(25)} />
      <TextComponent
        text="Cài đặt"
        font={fontFamilies.bold}
        size={handleSize(13)}
        color={colors.Text_Color}
      />
      <SpaceComponent height={handleSize(25)} />
      <RowComponent style={styles.text1}>
        <TextComponent
          text="Đặt làm địa chỉ mặc định"
          size={handleSize(15)}
          color={colors.Gray_Color}
        />
        <Switch value={isDefault} onValueChange={setIsDefault} />
      </RowComponent>
      <SpaceComponent height={handleSize(30)} />
      <SpaceComponent height={handleSize(30)} />
      <ButtonComponent text="HOÀN THÀNH" onPress={handleCompletePress} />
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

  button: {
    margin: 20,
    borderWidth: 1,
    borderColor: colors.Gray_Color,
    borderRadius: handleSize(5),
    padding: handleSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
