import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';
import SectionComponent from '../layouts/SectionComponent';
import TextComponent from '../texts/TextComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import DialogBase from './DialogBase';

interface Props {
  title?: string;
  content: string;
  onPress?: () => void;
  isVisible: boolean;
  setIsvisble: (val: boolean) => void;
  txtButton?: string;
}

const DialogErrorIOS: FC<Props> = ({
  isVisible,
  setIsvisble,
  content,
  onPress,
  title,
  txtButton,
}) => {
  return (
    <DialogBase isVisible={isVisible}>
      <View style={styles.containerDiaLogIOS}>
        <SectionComponent style={styles.containerContent}>
          <TextComponent
            text={title ?? 'Error'}
            font={fontFamilies.medium}
            lineHeight={22}
          />
          <TextComponent
            text={content}
            size={13}
            font={fontFamilies.medium}
            lineHeight={18}
            style={styles.txtContent}
          />
        </SectionComponent>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            onPress ? onPress() : setIsvisble(false);
          }}>
          <TextComponent
            text={txtButton ?? 'OK'}
            color={colors.Action_Dialog_Blue}
            font={fontFamilies.medium}
            lineHeight={22}
          />
        </TouchableOpacity>
      </View>
    </DialogBase>
  );
};

export default DialogErrorIOS;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: handleSize(11),
    borderTopWidth: 2.5,
    borderTopColor: colors.Gray_Light_Color,
  },
  txtContent: {
    textAlign: 'center',
  },
  containerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
    width: '100%',
    height: handleSize(95),
    padding: handleSize(16),
  },
  line: {
    height: '100%',
    width: 3,
    backgroundColor: colors.Gray_Light_Color,
  },
  btnDialog: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.White_Color,
  },
  containerDiaLogIOS: {
    width: handleSize(270),
    height: handleSize(139),
    borderRadius: handleSize(15),
    backgroundColor: colors.White_Color,
    justifyContent: 'space-between',
  }
});
