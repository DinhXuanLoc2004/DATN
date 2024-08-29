import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import ButtonScreenSwitchAuth from '../../components/buttons/ButtonScreenSwitchAuth';
import TextInputAnimationComponent from '../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../components/layouts/ContainerComponent';
import GGAndFbComponent from '../../components/layouts/GGAndFbComponent';
import SectionComponent from '../../components/layouts/SectionComponent';
import SpaceComponent from '../../components/layouts/SpaceComponent';
import TitleComponent from '../../components/texts/TitleComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import {handleTextInput, Success} from '../../utils/handleTextInput';

const RegisterScreen = () => {
  const [Name, setName] = useState<string>('');
  const [Email, setEmail] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [ConfirmPassword, setConfirmPassword] = useState<string>('');

  const [ErrorName, setErrorName] = useState<string>('');
  const [ErrorEmail, setErrorEmail] = useState<string>('');
  const [ErrorPassword, setErrorPassword] = useState<string>('');
  const [ErrorConfirmPassword, setErrorConfirmPassword] = useState<string>('');

  useEffect(() => {
    if (Name) {
      setErrorName(handleTextInput('name', Name));
    }
    if (Email) {
      setErrorEmail(handleTextInput('email', Email));
    }
    if (Password) {
      setErrorPassword(handleTextInput('password', Password));
    }
    if (ConfirmPassword) {
      setErrorConfirmPassword(
        handleTextInput('confirmPassword', ConfirmPassword, Password),
      );
    }
  }, [Name, Email, Password, ConfirmPassword]);

  const handleLogin = () => {
    setErrorName(handleTextInput('name', Name));
    setErrorEmail(handleTextInput('email', Email));
    setErrorPassword(handleTextInput('password', Password));
    setErrorConfirmPassword(
      handleTextInput('confirmPassword', ConfirmPassword, Password),
    );
  };

  return (
    <ContainerComponent isHeader back isScroll>
      <SpaceComponent height={18} />

      {/* Section Tille */}
      <SectionComponent>
        <TitleComponent text="Sign up" size={34} font={fontFamilies.bold} />
      </SectionComponent>

      <SpaceComponent height={68} />

      {/* Section Input */}
      <SectionComponent>
        <TextInputAnimationComponent
          value={Name}
          onChange={val => setName(val)}
          plahoder="Name"
          isError={ErrorName !== '' && ErrorName !== Success}
          errorMessage={ErrorName !== Success ? ErrorName : ''}
        />
        <SpaceComponent height={30} />
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
        <SpaceComponent height={30} />
        <TextInputAnimationComponent
          value={ConfirmPassword}
          onChange={val => setConfirmPassword(val)}
          plahoder="Confirm Password"
          isError={
            ErrorConfirmPassword !== '' && ErrorConfirmPassword !== Success
          }
          errorMessage={
            ErrorConfirmPassword !== Success ? ErrorConfirmPassword : ''
          }
          isSuccess={ErrorConfirmPassword === Success}
          isPassword
        />
      </SectionComponent>

      <SpaceComponent height={16} />

      <ButtonScreenSwitchAuth text="Already have an account?" />

      <SpaceComponent height={28} />

      {/* Section Button Sign up */}
      <SectionComponent>
        <ButtonComponent text="SIGN UP" onPress={() => handleLogin()} />
      </SectionComponent>

      <GGAndFbComponent text="Or sign up with social account" marginTop={54} />
    </ContainerComponent>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
