import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {fontFamilies} from '../../constants/fontFamilies';
import { colors } from '../../constants/colors';

const InputOTPComponent = forwardRef(
  ({maxLength=1, keyboardType ="number-pad", onChangeText, placeholder="", style}, ref) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <TextInput
        maxLength={maxLength}
        keyboardType={keyboardType}
        ref={inputRef}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[
          styles.input,
          style,
          {borderColor: isFocused ? colors.Primary_Color : colors.Text_Color}, // Change border color based on focus
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: 50,
    height: 45,
    borderRadius: 10,
    margin: 15,
    fontSize: 18,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
  },
});

export default InputOTPComponent;
