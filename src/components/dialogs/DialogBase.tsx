import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {FC, ReactNode} from 'react';
import SectionComponent from '../layouts/SectionComponent';

interface Props {
  isVisible: boolean;
  children: ReactNode;
  backgroundColor?: string;
}

const DialogBase: FC<Props> = ({isVisible, children, backgroundColor}) => {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <SectionComponent
        style={[
          styles.modal,
          {backgroundColor: backgroundColor ?? 'rgba(0,0,0,0.5)'},
        ]}>
        {children}
      </SectionComponent>
    </Modal>
  );
};

export default DialogBase;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
