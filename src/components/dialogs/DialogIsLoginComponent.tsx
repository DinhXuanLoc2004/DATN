import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import SectionComponent from '../layouts/SectionComponent';
import {UserSquare} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';
import ButtonComponent from '../buttons/ButtonComponent';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {useAppDispatch, useAppSelector} from '../../helper/store/store';
import {setDiaLogLogin} from '../../helper/store/slices/sort.slice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootNavigation';
import {useNavigation} from '@react-navigation/native';

interface Props {
  isvisiable: boolean;
}

type stackParamsList = StackNavigationProp<
  RootStackParamList,
  'StackMainNavigation'
>;

const DialogIsLoginComponent: FC<Props> = ({isvisiable}) => {
  const navigation = useNavigation<stackParamsList>();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    dispatch(setDiaLogLogin(false));
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
    dispatch(setDiaLogLogin(false));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isvisiable}>
      <SectionComponent style={styles.container}>
        <SectionComponent style={styles.containerDialog}>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => handleCancel()}>
            <TextComponent
              text="X"
              font={fontFamilies.bold}
              size={20}
              color={colors.Gray_Light_Color}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/img_dialog_login.png')}
            style={styles.img}
          />
          <ButtonComponent
            text="Login"
            style={styles.btnLogin}
            onPress={() => {
              handleLogin();
            }}
          />
        </SectionComponent>
      </SectionComponent>
    </Modal>
  );
};

export default DialogIsLoginComponent;

const styles = StyleSheet.create({
  containerDialog: {
    flex: 0,
    zIndex: 5
  },
  btnCancel: {
    top: 20,
    end: 20,
    position: 'absolute',
    width: handleSize(24),
    height: handleSize(24),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  btnLogin: {
    width: handleSize(270),
  },
  img: {
    transform: [{scale: 1}],
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
