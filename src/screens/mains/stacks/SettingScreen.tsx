import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import TextInputAnimationComponent from '../../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import SwitchNotifiComponent from '../../../components/texts/SwitchNotifiComponent';
import TextComponent from '../../../components/texts/TextComponent';
import { colors } from '../../../constants/colors';
import { fontFamilies } from '../../../constants/fontFamilies';
import { handleSize } from '../../../utils/handleSize';
const SettingScreen = () => {
  const [Name, setName] = useState<string>('');
  const [DateorBirth, setDateorBirth] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [notifi_sale, setnotifi_sale] = useState<boolean>(false);
  const [notifi_new, setnotifi_new] = useState<boolean>(false);
  const [notifi_delivery, setnotifi_delivery] = useState<boolean>(false);
  return (
    <ContainerComponent
      style={styles.container}
      isScroll
      isHeader
      back
      rightIcon={
        <IonIcon
          name="search"
          size={handleSize(24)}
          color={colors.Text_Color}
        />
      }>
      <SpaceComponent height={30} />
      <TextComponent text="Settings" font={fontFamilies.bold} size={34} />
      <SpaceComponent height={23} />
      <TextComponent text="Personal Information" font={fontFamilies.semiBold} />
      <SpaceComponent height={21} />
      <TextInputAnimationComponent
        value={Name}
        style={styles.input}
        onChange={val => setName(val)}
        plahoder="Full name"
        isAnimationEnabled={false}
      />
      <SpaceComponent height={24} />
      <TextInputAnimationComponent
        value={DateorBirth}
        style={styles.input}
        onChange={val => setDateorBirth(val)}
        plahoder="Date of Birth"
        isAnimationEnabled={false}
      />
      <SpaceComponent height={55} />
      <RowComponent>
        <TextComponent text="Password" font={fontFamilies.semiBold} />
        <TextComponent
          color={colors.Gray_Color}
          text="Change"
          size={14}
          font={fontFamilies.semiBold}
        />
      </RowComponent>
      <SpaceComponent height={21} />
      <TextInputAnimationComponent
        value={Password}
        style={styles.input}
        onChange={val => setPassword(val)}
        plahoder="Password"
        isPassword
        isAnimationEnabled={false}
      />

      <SpaceComponent height={55} />
      <TextComponent text="Notifications" font={fontFamilies.semiBold} />
      <SpaceComponent height={23} />

      <SwitchNotifiComponent
        text="Sale"
        selected={notifi_sale}
        set_selected={setnotifi_sale}
      />
      <SpaceComponent height={24}/>
      <SwitchNotifiComponent
        text="New arrivals"
        selected={notifi_new}
        set_selected={setnotifi_new}
      />
      <SpaceComponent height={24}/>
      <SwitchNotifiComponent
        text="Delivery status change"
        selected={notifi_delivery}
        set_selected={setnotifi_delivery}
      />
    </ContainerComponent>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  input: {
    borderRadius: handleSize(2),
    elevation: handleSize(1),
  },
  container: {
    paddingHorizontal: handleSize(10),
  },
});
