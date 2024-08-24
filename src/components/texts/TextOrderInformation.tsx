import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import RowComponent from '../layouts/RowComponent';
import TextComponent from './TextComponent';

interface Props {
  lable: string;
  content: string;
}

const TextOrderInformation: FC<Props> = ({lable, content}) => {
  return (
    <RowComponent
      flex={1}
      justify="flex-start"
      style={{alignItems: 'flex-start'}}>
      <TextComponent
        text={lable}
        size={14}
        color={colors.Gray_Color}
        flex={0.4}
        lineHeight={20}
      />
      <TextComponent
        text={content}
        size={14}
        font={fontFamilies.medium}
        flex={0.6}
        lineHeight={20}
      />
    </RowComponent>
  );
};

export default TextOrderInformation;

const styles = StyleSheet.create({});
