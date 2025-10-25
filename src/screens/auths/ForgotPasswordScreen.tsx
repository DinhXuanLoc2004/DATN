import { View, Text } from 'react-native';
import React, { useState } from 'react';
import ContainerComponent from '../../components/layouts/ContainerComponent';
import SpaceComponent from '../../components/layouts/SpaceComponent';
import TitleComponent from '../../components/texts/TitleComponent';
import { fontFamilies } from '../../constants/fontFamilies';
import TextComponent from '../../components/texts/TextComponent';
import TextInputAnimationComponent from '../../components/inputs/TextInputAnimationComponent';
import { Success, handleTextInput } from '../../utils/handleTextInput';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import { forgotPasswordAPI } from '../../helper/apis/auth.api';
import { navigationRef } from '../../navigation/RootNavigation';

const ForgotPasswordScreen = () => {
  const [Email, setEmail] = useState<string>('');
  const [ErrorEmail, setErrorEmail] = useState<string>('');

  const sendOTP = async () => {
    setErrorEmail(handleTextInput('email', Email));
    try {
      const data = await forgotPasswordAPI({ email: Email });
      if (data.status === 200) {
        // Pass fromForgotPassword as true
        navigationRef.navigate('VerifyOTPScreen', { email: Email, fromForgotPassword: true });
      }
    } catch (error: any) {
      console.log(error);
      if (error.message === 'Email already exists!') {
        setErrorEmail('Email already exists!');
      }
    }
  };

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
      <SpaceComponent height={20}/>
      <TextInputAnimationComponent
        value={Email}
        onChange={val => setEmail(val)}
        plahoder="Email"
        isError={ErrorEmail !== '' && ErrorEmail !== Success}
        errorMessage={ErrorEmail !== Success ? ErrorEmail : ''}
        isSuccess={ErrorEmail === Success}
      />
      <SpaceComponent height={20}/>
      <ButtonComponent text='SEND' onPress={sendOTP} />
    </ContainerComponent>
  );
};

export default ForgotPasswordScreen;
