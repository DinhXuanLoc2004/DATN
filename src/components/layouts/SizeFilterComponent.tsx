import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../constants/colors';
import TextComponent from '../texts/TextComponent';

interface Props {
  text: string;
  width?: number; 
  height?: number; 
}

const SizeFilterComponent: React.FC<Props> = ({ text, width , height  }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isClicked && styles.clickedContainer,
        { width, height } 
      ]}
      onPress={() => setIsClicked(!isClicked)}
    >
      <TextComponent
        text={text}
        flex={0}
        style={[styles.text, isClicked && styles.clickedText]}
      />
    </TouchableOpacity>
  );
};

export default SizeFilterComponent;

const styles = StyleSheet.create({
  container: {
    margin:11,
    borderWidth: 0.5,
    borderColor: colors.Gray_Color,
    backgroundColor: colors.White_Color,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 4,
  },
  clickedContainer: {
    backgroundColor: colors.Primary_Color,
    borderColor: colors.Primary_Color,
  },
  text: {
    fontSize: 14,
    color: colors.Text_Color,
  },
  clickedText: {
    color: colors.White_Color,
  },
});
