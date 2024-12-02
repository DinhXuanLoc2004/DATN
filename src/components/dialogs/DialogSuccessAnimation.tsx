import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import DialogBase from './DialogBase';
import SectionComponent from '../layouts/SectionComponent';
import FastImage from 'react-native-fast-image';
import {handleSize} from '../../utils/handleSize';
import {colors} from '../../constants/colors';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import ButtonComponent from '../buttons/ButtonComponent';
import SpaceComponent from '../layouts/SpaceComponent';

interface Props {
  isVisible: boolean;
  setisVisible: (val: boolean) => void;
  title: string;
  onPress?: () => void;
  textBtn: string;
}

const DialogSuccessAnimation: FC<Props> = ({
  isVisible,
  setisVisible,
  title,
  onPress,
  textBtn,
}) => {
  return (
    <DialogBase isVisible={isVisible}>
      <SectionComponent flex={0} style={styles.container}>
        <TextComponent
          text={title}
          font={fontFamilies.medium}
        />
        <SpaceComponent height={10} />
        <FastImage
          source={{
            uri: 'https://businessfundusa.com/assets/gif/success.gif',
            priority: FastImage.priority.high,
          }}
          style={styles.img}
        />
        <ButtonComponent
          style={styles.btn}
          text={textBtn}
          onPress={() => (onPress ? onPress() : setisVisible(false))}
        />
      </SectionComponent>
    </DialogBase>
  );
};

export default DialogSuccessAnimation;

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    elevation: 0,
  },
  container: {
    width: '80%',
    backgroundColor: colors.White_Color,
    paddingVertical: handleSize(30),
    borderRadius: handleSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: handleSize(210),
    height: handleSize(150),
  },
});
