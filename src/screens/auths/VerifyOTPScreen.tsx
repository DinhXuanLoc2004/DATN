import {StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ContainerComponent from '../../components/layouts/ContainerComponent';
import TitleComponent from '../../components/texts/TitleComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import SpaceComponent from '../../components/layouts/SpaceComponent';
import TextComponent from '../../components/texts/TextComponent';
import {colors} from '../../constants/colors';
import RowComponent from '../../components/layouts/RowComponent';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import InputOTPComponent from '../../components/inputs/InputOTPComponent';

const VerifyOTPScreen = () => {
  const [code, setCode] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');

  const number1 = useRef<any>(null);
  const number2 = useRef<any>(null);
  const number3 = useRef<any>(null);
  const number4 = useRef<any>(null);

  useEffect(() => {
    number1.current?.focus();
  }, []);

  useEffect(() => {
    let item = '';
    code.forEach(val => (item += val));
    setNewCode(item);
  }, [code]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...code];
    data[index] = val;
    setCode(data);
  };

  return (
    <ContainerComponent isHeader back isScroll>
      <SpaceComponent height={18} />
      <TitleComponent
        text="Verify account"
        size={34}
        font={fontFamilies.bold}
      />
      <SpaceComponent height={94} />

      <TextComponent
        text="Please enter the otp code sent to your email"
        size={14}
        font={fontFamilies.semiBold}
        color={colors.Text_Color}
      />

      <SpaceComponent height={10} />
      <RowComponent justify="space-around" style={{right: 3, width: '100%'}}>
        <InputOTPComponent
          ref={number1}
          onChangeText={val => {
            val.length > 0 && number2.current?.focus();
            handleChangeCode(val, 0);
          }}
        />
        <InputOTPComponent
          ref={number2}
          onChangeText={val => {
            val.length > 0 && number3.current?.focus();
            handleChangeCode(val, 1);
          }}
        />
        <InputOTPComponent
          ref={number3}
          onChangeText={val => {
            val.length > 0 && number4.current?.focus();
            handleChangeCode(val, 2);
          }}
        />
        <InputOTPComponent
          ref={number4}
          onChangeText={val => {
            val.length > 0 && console.log(newCode);
            handleChangeCode(val, 3);
          }}
        />
      </RowComponent>
      <SpaceComponent height={73} />
      <ButtonComponent
        text="VERIFY"
        onPress={() => {
          console.log('Your code is ' + newCode);
        }}
      />
    </ContainerComponent>
  );
};

export default VerifyOTPScreen;
