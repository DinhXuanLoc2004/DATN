import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import DialogBase from './DialogBase';
import FastImage from 'react-native-fast-image';
import { handleSize } from '../../utils/handleSize';

interface Props {
  is_loading: boolean;
}

const DialogLoading: FC<Props> = ({is_loading}) => {
  return (
    <DialogBase isVisible={is_loading}>
      <FastImage
        source={{
          uri: 'https://i.stack.imgur.com/kOnzy.gif',
        }}
        style={styles.img}
      />
    </DialogBase>
  );
};

export default DialogLoading;

const styles = StyleSheet.create({
    img: {
        width: handleSize(50),
        height: handleSize(50)
    }
});
