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
import {useAppDispatch, useAppSelector} from '../../../helper/store/store';
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

  const email = useAppSelector(state => state.auth.user.email);

  return (
    <SectionComponent style={{backgroundColor: colors.Backgournd_Color}}>
      <SpaceComponent height={70} />
      <TextComponent
        style={styles.title}
        text="My profile"
        font={fontFamilies.bold}
        size={34}
      />
      <SpaceComponent height={24} />
      <RowComponent justify="flex-start">
        <Image
          source={require('../../../assets/images/avatar.jpg')}
          style={styles.image}
        />
        <RowComponent
          justify="space-between"
          flex={1}
          style={styles.containerName}>
          <SectionComponent>
            <TextComponent
              text={email ? email : 'Not logged in yet'}
              font={fontFamilies.semiBold}
              size={16}
            />
          </SectionComponent>
          <SpaceComponent width={5}/>
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
        onPress={() =>
          navigation.navigate({
            name: 'OrdersScreen',
            key: `${Date.now()}`,
          })
        }
      />
      <ButtonProfileComponent
        title="Shipping addresses"
        onPress={() =>
          navigation.navigate('SelectShippingAddressScreen', {is_select: false})
        }
      />
      <ButtonProfileComponent
        title="My vouchers"
        onPress={() => navigation.navigate('VouchersUserScreen')}
      />
      {/* <ButtonProfileComponent
        title="My reviews"
        onPress={() => handlePress('Reviews')}
      /> */}
      {/* <ButtonProfileComponent
        title="Settings"
        description="Notifications, password"
        onPress={() => handlePress('Settings')}
      /> */}
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
