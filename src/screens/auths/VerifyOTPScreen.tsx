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
      <SpaceComponent height={30} />
      <TitleComponent
        text="Verify account"
        size={30}
        font={fontFamilies.bold}
      />
      <SpaceComponent height={102} />
      <TextComponent
        text="Please enter the OTP code sent to your email"
        size={14}
        color={colors.Text_Color}
      />
      <SpaceComponent height={22} />
      <RowComponent justify="space-between">
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
