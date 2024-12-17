import React, { useEffect, useRef, useState } from 'react';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import InputOTPComponent from '../../components/inputs/InputOTPComponent';
import ContainerComponent from '../../components/layouts/ContainerComponent';
import RowComponent from '../../components/layouts/RowComponent';
import SpaceComponent from '../../components/layouts/SpaceComponent';
import TextComponent from '../../components/texts/TextComponent';
import TitleComponent from '../../components/texts/TitleComponent';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { RouteProp } from '@react-navigation/native';
import { navigationRef, RootStackParamList } from '../../navigation/RootNavigation';
import { useAppDispatch, useAppSelector } from '../../helper/store/store';
import { verifyThunk } from '../../helper/store/thunk/auth.thunk';
import { TextInput, TouchableOpacity } from 'react-native';
import SectionComponent from '../../components/layouts/SectionComponent';
import { resendOtpAPI } from '../../helper/apis/auth.api';

type routeProp = RouteProp<RootStackParamList, 'VerifyOTPScreen'>;

const VerifyOTPScreen = ({ route }: { route: routeProp }) => {
  const { email, fromForgotPassword } = route.params;
  const [code, setCode] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [seconde, setseconde] = useState<number>(60);
  const [errMes, seterrMes] = useState<string>('');

  const number1 = useRef<TextInput>(null);
  const number2 = useRef<TextInput>(null);
  const number3 = useRef<TextInput>(null);
  const number4 = useRef<TextInput>(null);

  useEffect(() => {
    number1.current?.focus();
  }, []);

  useEffect(() => {
    let item = '';
    code.forEach(val => (item += val));
    setNewCode(item);
    seterrMes('');
  }, [code]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...code];
    data[index] = val;
    setCode(data);
  };

  useEffect(() => {
    if (seconde > 0) {
      const intervalId = setInterval(() => setseconde(seconde - 1), 1000);
      return () => clearInterval(intervalId);
    }
  }, [seconde]);

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(state => state.auth.status.loading);

  const handleVerifyOtp = () => {
    if (newCode.length === 4) {
      dispatch(verifyThunk({ email, otp: newCode }))
        .unwrap()
        .then(res => {
          if (res.metadata.status === 'active') {
            if (fromForgotPassword) {
              // Redirect to NewPasswordScreen if coming from Forgot Password
              navigationRef.reset({
                index: 0,
                routes: [{ name: 'NewPasswordScreen', params: { email } }],
              });
            } else {
              // Otherwise, redirect to main navigation
              navigationRef.reset({
                index: 0,
                routes: [{ name: 'StackMainNavigation' }],
              });
            }
          }
        })
        .catch(err => {
          if (err.message === 'OTP is incorrect!') seterrMes('OTP is incorrect!');
        });
    }
  };

  const handleResendOtp = async () => {
    const data = await resendOtpAPI({ email });
    if (data?.metadata) {
      setCode([]);
      setNewCode('');
      setseconde(60);
    }
  };

  return (
    <ContainerComponent isHeader back isScroll>
      <SpaceComponent height={30} />
      <TitleComponent text="Verify account" size={30} font={fontFamilies.bold} />
      <SpaceComponent height={102} />
      <TextComponent text="Please enter the OTP code sent to your email" size={14} color={colors.Text_Color} />
      <SpaceComponent height={22} />
      <RowComponent justify="space-between">
        <InputOTPComponent
          ref={number1}
          onChangeText={val => {
            handleChangeCode(val, 0);
            if (val.length > 0) number2.current?.focus();
          }}
        />
        <InputOTPComponent
          ref={number2}
          onChangeText={val => {
            handleChangeCode(val, 1);
            if (val.length > 0) number3.current?.focus();
            if (val.length === 0) number1.current?.focus();
          }}
        />
        <InputOTPComponent
          ref={number3}
          onChangeText={val => {
            handleChangeCode(val, 2);
            if (val.length > 0) number4.current?.focus();
            if (val.length === 0) number2.current?.focus();
          }}
        />
        <InputOTPComponent
          ref={number4}
          onChangeText={val => {
            handleChangeCode(val, 3);
            if (val.length === 0) number3.current?.focus();
          }}
        />
      </RowComponent>
      {errMes && (
        <SectionComponent>
          <SpaceComponent height={10} />
          <RowComponent justify="center">
            <TextComponent text={errMes} size={14} color={colors.Primary_Color} />
          </RowComponent>
        </SectionComponent>
      )}
      <SpaceComponent height={73} />
      <ButtonComponent
        isLoading={isLoading}
        disable={newCode.length < 4}
        text={newCode.length < 4 ? `${seconde} s` : 'Verify'}
        style={{
          backgroundColor: isLoading
            ? colors.White_Color
            : newCode.length < 4
            ? colors.Gray_Color
            : colors.Primary_Color,
          borderColor: newCode.length < 4 ? colors.Gray_Color : colors.Primary_Color,
        }}
        onPress={() => {
          handleVerifyOtp();
        }}
      />
      <SpaceComponent height={20} />
      <RowComponent justify="center">
        <TouchableOpacity
          onPress={() => {
            handleResendOtp();
          }}
        >
          <TextComponent text="Resend Otp" color="blue" style={{ textDecorationLine: 'underline' }} size={14} />
        </TouchableOpacity>
      </RowComponent>
    </ContainerComponent>
  );
};

export default VerifyOTPScreen;
