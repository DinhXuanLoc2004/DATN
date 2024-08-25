import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import TextInputAnimationComponent from '../../../components/inputs/TextInputAnimationComponent';
import ContainerComponent from '../../../components/layouts/ContainerComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SelectNotificationsComponent from '../../../components/layouts/selects/SelectNotificationsComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {handleSize} from '../../../utils/handleSize';
const SettingScreen = () => {
  const [Name, setName] = useState<string>('');
  const [DateorBirth, setDateorBirth] = useState<string>('');
  const [Password, setPassword] = useState<string>('');
  const [SelectNotifi, setSelectNotifi] = useState<string[]>([]);

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
      <SpaceComponent height={handleSize(20)} />
      <SectionComponent>
        <TextComponent
          text="Settings"
          font={fontFamilies.bold}
          size={handleSize(34)}
          color={colors.Text_Color}
        />
        <SpaceComponent height={handleSize(23)} />
        <TextComponent
          text="Personal Information"
          font={fontFamilies.semiBold}
          size={handleSize(16)}
          color={colors.Text_Color}
        />
        <SpaceComponent height={handleSize(20)} />
        <TextInputAnimationComponent
          value={Name}
          style={{borderRadius: handleSize(2), elevation: handleSize(1)}}
          onChange={val => setName(val)}
          plahoder="Full name"
          isAnimationEnabled={false}
        />
        <SpaceComponent height={handleSize(20)} />
        <TextInputAnimationComponent
          value={DateorBirth}
          style={{borderRadius: handleSize(2), elevation: handleSize(1)}}
          onChange={val => setDateorBirth(val)}
          plahoder="Date of Birth"
          isAnimationEnabled={false}
        />
        <SpaceComponent height={handleSize(55)} />
        <RowComponent>
          <TextComponent
            text="Password"
            size={handleSize(16)}
            font={fontFamilies.semiBold}
          />
          <TextComponent
            color={colors.Gray_Color}
            text="Change"
            size={handleSize(14)}
            font={fontFamilies.semiBold}
          />
        </RowComponent>
        <SpaceComponent height={handleSize(20)} />
        <TextInputAnimationComponent
          value={Password}
          style={{borderRadius: handleSize(2), elevation: handleSize(1)}}
          onChange={val => setPassword(val)}
          plahoder="Password"
          isPassword
          isAnimationEnabled={false}
        />

        <SpaceComponent height={handleSize(55)} />
        <TextComponent
          text="Notifications"
          size={handleSize(16)}
          font={fontFamilies.semiBold}
        />
        <SpaceComponent height={handleSize(15)} />

        <SelectNotificationsComponent
          arr_select={SelectNotifi}
          set_arr_select={setSelectNotifi}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: handleSize(10),
  },
});
