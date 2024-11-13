import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import SectionComponent from '../layouts/SectionComponent';
import TextComponent from '../texts/TextComponent';
import SpaceComponent from '../layouts/SpaceComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import RowComponent from '../layouts/RowComponent';
import {colors} from '../../constants/colors';
import {handleSize} from '../../utils/handleSize';

interface Props {
  title?: string;
  content: string;
  txtBtnLeft?: string;
  txtBtnRight: string;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
  fnLeft?: () => void;
  fnRight: () => void;
}

const DialogIOSComponent: FC<Props> = ({
  content,
  fnRight,
  isVisible,
  setIsVisible,
  txtBtnRight,
  fnLeft,
  title,
  txtBtnLeft,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <SectionComponent style={styles.modal}>
        <View style={styles.containerDiaLogIOS}>
          <SectionComponent style={styles.containerContent}>
            <TextComponent
              text={title ?? 'Notification'}
              font={fontFamilies.semiBold}
              size={15}
            />
            <SpaceComponent height={7} />
            <TextComponent
              text={content}
              size={13}
              font={fontFamilies.medium}
              style={{textAlign: 'center'}}
            />
          </SectionComponent>
          <RowComponent style={styles.containerBtnDialog}>
            <SectionComponent
              style={styles.btnDialog}
              onPress={() => {
                fnLeft ? fnLeft() : setIsVisible(false);
              }}>
              <TextComponent
                text={txtBtnLeft ?? 'Cancel'}
                size={15}
                color="#1C98F3"
              />
            </SectionComponent>
            <SpaceComponent style={styles.line} />
            <SectionComponent style={styles.btnDialog} onPress={() => {fnRight()}}>
              <TextComponent
                text={txtBtnRight}
                size={15}
                color={colors.Primary_Color}
                font={fontFamilies.medium}
              />
            </SectionComponent>
          </RowComponent>
        </View>
      </SectionComponent>
    </Modal>
  );
};

export default DialogIOSComponent;

const styles = StyleSheet.create({
  line: {
    height: '100%',
    width: 3,
    backgroundColor: colors.Gray_Light_Color,
  },
  btnDialog: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.White_Color
  },
  containerBtnDialog: {
    height: handleSize(44),
  },
  containerContent: {
    padding: handleSize(16),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: colors.Gray_Light_Color,
  },
  containerDiaLogIOS: {
    width: handleSize(270),
    height: handleSize(139),
    borderRadius: handleSize(15),
    backgroundColor: colors.White_Color,
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
