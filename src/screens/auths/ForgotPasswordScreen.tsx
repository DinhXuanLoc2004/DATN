import {View, Text} from 'react-native';
import React, {useState} from 'react';
import ContainerComponent from '../../components/layouts/ContainerComponent';
import SpaceComponent from '../../components/layouts/SpaceComponent';
import TitleComponent from '../../components/texts/TitleComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import TextComponent from '../../components/texts/TextComponent';
import TextInputAnimationComponent from '../../components/inputs/TextInputAnimationComponent';
import { Success } from '../../utils/handleTextInput';
import ButtonComponent from '../../components/buttons/ButtonComponent';

const ForgotPasswordScreen = () => {
  const [Email, setEmail] = useState<string>('');
  const [ErrorEmail, setErrorEmail] = useState<string>('')
  const sendOTP = async () => {

  }
  return (
    <ContainerComponent isHeader back>
      <SpaceComponent height={18} />
      <TitleComponent
        text="Forgot Password"
        size={34}
        font={fontFamilies.bold}
      />
      <SpaceComponent height={82} />
      <TextComponent
        text="Please, enter your email address. You will receive a link to create a new password via email."
        size={14}
        font={fontFamilies.semiBold}
      />
      <TextInputAnimationComponent
        value={Email}
        onChange={val => setEmail(val)}
        plahoder="Email"
        isError={ErrorEmail !== '' && ErrorEmail !== Success}
        errorMessage={ErrorEmail !== Success ? ErrorEmail : ''}
        isSuccess={ErrorEmail === Success}
      />
      <ButtonComponent text='SEND' onPress={sendOTP}/>
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
