import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {StyleProp, StyleSheet, TextInput, ViewStyle} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import { handleSize } from '../../utils/handleSize';

interface Props {
  onChangeText: (val: string) => void;
  style?: StyleProp<ViewStyle>;
}

const InputOTPComponent = forwardRef(({onChangeText, style}: Props, ref) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

  return (
    <TextInput
      maxLength={1}
      keyboardType="number-pad"
      ref={inputRef}
      onChangeText={onChangeText}
      style={[
        styles.input,
        {borderColor: isFocused ? colors.Primary_Color : colors.Text_Color}, // Change border color based on focus
        style,
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: '20%',
    height: 'auto',
    borderRadius: 10,
    fontSize: handleSize(20),
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
    aspectRatio: '1.15'
  },
});

export default InputOTPComponent;
