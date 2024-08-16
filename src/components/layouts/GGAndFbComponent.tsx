import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { fontFamilies } from '../../constants/fontFamilies';
import { globalStyles } from '../../styles/globalStyle';
import TextComponent from '../texts/TextComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';
import { handleSize } from '../../utils/handleSize';

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
        {marginTop: marginTop ? handleSize(marginTop) : 0, paddingBottom: handleSize(23)},
      ]}>
      <SectionComponent>
        <TextComponent text={text} size={14} font={fontFamilies.regular} />
        <SpaceComponent height={12} />
        <RowComponent justify="center">
          <RowComponent justify="center">
            <TouchableOpacity style={styles.button}>
              <Image source={require('../../assets/images/GG.png')} style={{width: handleSize(24), height: handleSize(24)}}/>
            </TouchableOpacity>
          </RowComponent>
          <SpaceComponent width={16}/>
          <RowComponent justify="center">
            <TouchableOpacity style={styles.button}>
              <IonIcon name="logo-facebook" size={handleSize(26)} color={'#3B5998'} />
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
    width: 'auto',
    height: 'auto',
    paddingHorizontal: 34.31,
    paddingVertical: 20,
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
