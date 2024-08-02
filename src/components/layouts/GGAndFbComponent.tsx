import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import SectionComponent from './SectionComponent';
import TextComponent from '../texts/TextComponent';
import {globalStyles} from '../../styles/globalStyle';
import SpaceComponent from './SpaceComponent';
import RowComponent from './RowComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import IonIcon from 'react-native-vector-icons/Ionicons';

interface Props {
  text: string;
  onPressGG?: () => void;
  onPressFB?: () => void;
  marginTop?: number;
}

const GGAndFbComponent: FC<Props> = ({
  text,
  onPressGG,
  onPressFB,
  marginTop,
}) => {
  return (
    <SectionComponent
      style={[
        globalStyles.containerGGAndFB,
        {marginTop: marginTop, paddingBottom: 23},
      ]}>
      <SectionComponent>
        <TextComponent text={text} size={14} font={fontFamilies.regular} />
        <SpaceComponent height={12} />
        <RowComponent justify="space-between">
          <RowComponent justify="flex-end">
            <TouchableOpacity style={styles.button}>
              <Image source={require('../../assets/images/GG.png')} />
            </TouchableOpacity>
          </RowComponent>
          <SpaceComponent width={16} />
          <RowComponent justify="center">
            <TouchableOpacity style={styles.button}>
              <IonIcon name="logo-facebook" size={26} color={'#3B5998'} />
            </TouchableOpacity>
          </RowComponent>
        </RowComponent>
      </SectionComponent>
    </SectionComponent>
  );
};

export default GGAndFbComponent;

const styles = StyleSheet.create({
  button: {
    width: 92,
    height: 64,
    borderRadius: 24,
    backgroundColor: colors.White_Color,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 2,
  },
});
