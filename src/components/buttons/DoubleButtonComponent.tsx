import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';
import RowComponent from '../layouts/RowComponent';
import SpaceComponent from '../layouts/SpaceComponent';
import ButtonComponent from './ButtonComponent';

interface Props {
  textBtnLeft: string;
  textBtnRight: string;
  onPressBtnLeft: () => void;
  onPressBtnRigth: () => void;
  bottom?: number;
  zIndex?: number;
  backgroundColor?: string;
  style?: ViewStyle
}

const DoubleButtonComponent: FC<Props> = ({
  textBtnLeft,
  textBtnRight,
  onPressBtnLeft,
  onPressBtnRigth,
  bottom,
  zIndex,
  backgroundColor,
  style
}) => {
  return (
    <RowComponent
      justify="space-between"
      style={[
        {
          bottom: bottom,
          zIndex: zIndex ?? 0,
          backgroundColor: backgroundColor ?? colors.Backgournd_Color,
        },
        styles.containerBtn,
        style
      ]}>
      <ButtonComponent
        style={[styles.btn, styles.btnDiscard]}
        onPress={onPressBtnLeft}
        text={textBtnLeft}
        colorText={colors.Text_Color}
      />
      <SpaceComponent width={23} />
      <ButtonComponent style={styles.btn} onPress={onPressBtnRigth} text={textBtnRight} />
    </RowComponent>
  );
};

export default DoubleButtonComponent;

const styles = StyleSheet.create({
  btnDiscard: {
    backgroundColor: colors.White_Color,
    borderColor: colors.Text_Color,
    borderWidth: 2,
  },
  btn: {
    width: 'auto',
    flex: 1,
    elevation: 0,
  },
  containerBtn: {
    paddingHorizontal: handleSize(16),
    paddingVertical: handleSize(20),
    width: '100%',
  },
});
