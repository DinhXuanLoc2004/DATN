import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonProfileComponent from '../../../components/buttons/ButtonProfileComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {handleSize} from '../../../utils/handleSize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch} from '../../../helper/store/store';
import {useNavigation} from '@react-navigation/native';
import {log_out} from '../../../helper/store/slices/auth.slice';
import {navigationRef} from '../../../navigation/RootNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {stackParamListMain} from '../../../navigation/StackMainNavigation';

type stackProp = StackNavigationProp<stackParamListMain, 'BottomTab'>;

const ProfileScreen = () => {
  const navigation = useNavigation<stackProp>();

  const handlePress = (screen: string) => {};

  const dispath = useAppDispatch();

  const handleLogout = () => {
    dispath(log_out());
    navigationRef.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  return (
    <SectionComponent style={{backgroundColor: colors.Backgournd_Color}}>
      <SpaceComponent height={20} />
      <TouchableOpacity>
        <Icon
          name="search"
          style={styles.icon}
          size={handleSize(24)}
          color={colors.Text_Color}
        />
      </TouchableOpacity>
      <SpaceComponent height={30} />
      <TextComponent
        style={styles.title}
        text="My profile"
        font={fontFamilies.bold}
        size={34}
      />
      <SpaceComponent height={24} />
      <RowComponent justify="flex-start">
        <Image
          source={{
            uri: 'https://tse2.mm.bing.net/th?id=OIP.erwk0wdihtPHnii2ZGqaNgAAAA&pid=Api&P=0&h=180',
          }}
          style={styles.image}
        />
        <RowComponent
          justify="space-between"
          flex={1}
          style={styles.containerName}>
          <SectionComponent>
            <TextComponent
              text="Matilda Brown"
              font={fontFamilies.semiBold}
              size={18}
            />
            <SpaceComponent height={5} />
            <TextComponent
              text="matildabrown@mail.com"
              font={fontFamilies.medium}
              size={14}
              color={colors.Secondary_Text_Color}
            />
          </SectionComponent>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons
              name="log-out-outline"
              size={handleSize(24)}
              color={colors.Text_Color}
            />
          </TouchableOpacity>
        </RowComponent>
      </RowComponent>
      <SpaceComponent height={28} />
      <ButtonProfileComponent
        title="My orders"
        description="Already have 12 orders"
        onPress={() =>
          navigation.navigate({
            name: 'OrdersScreen',
            key: `${Date.now()}`,
          })
        }
      />
      <ButtonProfileComponent
        title="Shipping addresses"
        description="3 ddresses"
        onPress={() =>
          navigation.navigate('SelectShippingAddressScreen', {is_select: false})
        }
      />
      <ButtonProfileComponent
        title="Payment methods"
        description="Visa  **34"
        onPress={() => handlePress('Payment')}
      />
      <ButtonProfileComponent
        title="My vouchers"
        description="You have special promocodes"
        onPress={() => navigation.navigate('VouchersUserScreen')}
      />
      <ButtonProfileComponent
        title="My reviews"
        description="Reviews for 4 items"
        onPress={() => handlePress('Reviews')}
      />
      <ButtonProfileComponent
        title="Settings"
        description="Notifications, password"
        onPress={() => handlePress('Settings')}
      />
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'flex-end',
    marginRight: handleSize(15),
  },
  title: {
    marginLeft: handleSize(14),
  },
  image: {
    marginLeft: handleSize(14),
    width: handleSize(64),
    height: handleSize(64),
    borderRadius: 100,
  },
  containerName: {
    paddingHorizontal: handleSize(17),
  },
});

export default ProfileScreen;
