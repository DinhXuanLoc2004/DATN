import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import ButtonScreenSwitchAuth from '../../components/buttons/ButtonScreenSwitchAuth';
import TextInputAnimationComponent from '../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../components/layouts/ContainerComponent';
import GGAndFbComponent from '../../components/layouts/GGAndFbComponent';
import SectionComponent from '../../components/layouts/SectionComponent';
import SpaceComponent from '../../components/layouts/SpaceComponent';
import TitleComponent from '../../components/texts/TitleComponent';
import { fontFamilies } from '../../constants/fontFamilies';
import { useAppDispatch, useAppSelector } from '../../helper/store/store';
import { loginThunk } from '../../helper/store/thunk/auth.thunk';
import { handleTextInput, Success } from '../../utils/handleTextInput';
import { navigationRef } from '../../navigation/RootNavigation';
import TextComponent from '../../components/texts/TextComponent';
import { colors } from '../../constants/colors';
import RowComponent from '../../components/layouts/RowComponent';
import { TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  const [Email, setEmail] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [ErrorEmail, setErrorEmail] = useState<string>('');
  const [ErrorPassword, setErrorPassword] = useState<string>('');

  useEffect(() => {
    if (Email && ErrorEmail !== 'Email is incorrect!') {
      setErrorEmail(handleTextInput('email', Email));
    }
    if (Password && ErrorPassword !== 'Password is not match!') {
      setErrorPassword(handleTextInput('password', Password));
    }
  }, [Email, Password]);

  const isLoading = useAppSelector(state => state.auth.status.loading);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    setErrorEmail(handleTextInput('email', Email));
    setErrorPassword(handleTextInput('password', Password));
    if (ErrorEmail === Success && ErrorPassword === Success) {
      dispatch(loginThunk({ email: Email, password: Password }))
        .unwrap()
        .then(res => {
          if (res.metadata.user.status === 'inactive') {
            // Pass fromForgotPassword as false
            navigationRef.navigate('VerifyOTPScreen', { email: Email, fromForgotPassword: false });
          } else {
            navigationRef.reset({
              index: 0,
              routes: [{ name: 'StackMainNavigation' }],
            });
          }
        })
        .catch(err => {
          if (err.message === 'Email is incorrect!') {
            setErrorEmail('Email is incorrect!');
            setErrorPassword(' ');
          }
          if (err.message === 'Password is not match!') {
            setErrorPassword('Password is not match!');
          }
          console.log('err login::', err.message);
        });
    }
  };

  return (
    <ContainerComponent isHeader back isScroll>
      <SpaceComponent height={30} />
      <SectionComponent>
        <TitleComponent text="Login" size={34} font={fontFamilies.bold} />
      </SectionComponent>
      <SpaceComponent height={68} />
      <SectionComponent>
        <TextInputAnimationComponent
          value={Email}
          onChange={val => setEmail(val)}
          plahoder="Email"
          isError={ErrorEmail !== '' && ErrorEmail !== Success}
          errorMessage={ErrorEmail !== Success ? ErrorEmail : ''}
          isSuccess={ErrorEmail === Success}
        />
        <SpaceComponent height={30} />
        <TextInputAnimationComponent
          value={Password}
          onChange={val => setPassword(val)}
          plahoder="Password"
          isError={ErrorPassword !== '' && ErrorPassword !== Success}
          errorMessage={ErrorPassword !== Success ? ErrorPassword : ''}
          isSuccess={ErrorPassword === Success}
          isPassword
        />
      </SectionComponent>
      <SpaceComponent height={16} />
      <ButtonScreenSwitchAuth
        text="Forgot your password"
        onPress={() => navigationRef.navigate('ForgotPasswordScreen')}
      />
      <SpaceComponent height={32} />
      <SectionComponent>
        <ButtonComponent
          text="LOGIN"
          onPress={handleLogin}
          isLoading={isLoading}
        />
        <SpaceComponent height={20} />
        <TouchableOpacity onPress={() => navigationRef.navigate('RegisterScreen')}>
          <RowComponent justify="center">
            <TextComponent text="You don't have an account?" size={14} />
            <SpaceComponent width={5} />
            <TextComponent
              text="SignUp"
              size={14}
              font={fontFamilies.medium}
              color={colors.Primary_Color}
            />
          </RowComponent>
        </TouchableOpacity>
      </SectionComponent>
      <GGAndFbComponent text="Or login with social account" marginTop={194} />
    </ContainerComponent>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
