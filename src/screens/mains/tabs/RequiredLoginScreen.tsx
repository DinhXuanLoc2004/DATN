import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import {UserSquare} from 'iconsax-react-native';
import {colors} from '../../../constants/colors';
import {handleSize} from '../../../utils/handleSize';
import TextComponent from '../../../components/texts/TextComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import {fontFamilies} from '../../../constants/fontFamilies';
import ButtonComponent from '../../../components/buttons/ButtonComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/RootNavigation';
import { useNavigation } from '@react-navigation/native';

type stackParamsList = StackNavigationProp<
  RootStackParamList,
  'StackMainNavigation'
>;

const RequiredLoginScreen = () => {
    const navigation = useNavigation<stackParamsList>()
  return (
    <ContainerComponent style={styles.container}>
      <Image source={require('../../../assets/images/img_login.png')} style={{transform: [{scale: 1.5}]}}/>
      <SpaceComponent height={5} />
      <TextComponent
        text="Please login!"
        size={18}
        font={fontFamilies.medium}
        color={colors.Gray_Color}
      />
      <SpaceComponent height={5} />
      <RowComponent style={styles.containerBtnLogin}>
        <ButtonComponent text="Login" onPress={() => navigation.navigate('LoginScreen')}/>
      </RowComponent>
    </ContainerComponent>
  );
};

export default RequiredLoginScreen;

const styles = StyleSheet.create({
  containerBtnLogin: {
    width: '60%',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
