import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonProfileComponent from '../../../components/buttons/ButtonProfileComponent';
import RowComponent from '../../../components/layouts/RowComponent';
import SectionComponent from '../../../components/layouts/SectionComponent';
import SpaceComponent from '../../../components/layouts/SpaceComponent';
import TextComponent from '../../../components/texts/TextComponent';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {handleSize} from '../../../utils/handleSize';

const ProfileScreen = () => {
  const handlePress = (screen: string) => {};

  return (
    <SectionComponent>
      <SpaceComponent height={20} />
      <TouchableOpacity>
        <Icon
          name="search"
          style={styles.icon}
          size={handleSize(24)}
          color={colors.Text_Color}
        />
      </TouchableOpacity>
      <SpaceComponent height={30} />
      <TextComponent
        style={styles.title}
        text="My profile"
        font={fontFamilies.bold}
        size={34}
      />
      <SpaceComponent height={24} />
      <RowComponent justify="flex-start">
        <Image
          source={{
            uri: 'https://tse2.mm.bing.net/th?id=OIP.erwk0wdihtPHnii2ZGqaNgAAAA&pid=Api&P=0&h=180',
          }}
          style={styles.image}
        />
        <SectionComponent style={styles.name}>
          <TextComponent
            text="Matilda Brown"
            font={fontFamilies.semiBold}
            size={18}
          />
          <SpaceComponent height={5} />
          <TextComponent
            text="matildabrown@mail.com"
            font={fontFamilies.medium}
            size={14}
            color={colors.Secondary_Text_Color}
          />
        </SectionComponent>
      </RowComponent>
      <SpaceComponent height={28} />
      <ButtonProfileComponent
        title="My orders"
        description="Already have 12 orders"
        onPress={() => handlePress('Orders')}
      />
      <ButtonProfileComponent
        title="Shipping addresses"
        description="3 ddresses"
        onPress={() => handlePress('Addresses')}
      />
      <ButtonProfileComponent
        title="Payment methods"
        description="Visa  **34"
        onPress={() => handlePress('Payment')}
      />
      <ButtonProfileComponent
        title="Promocodes"
        description="You have special promocodes"
        onPress={() => handlePress('Promocodes')}
      />
      <ButtonProfileComponent
        title="My reviews"
        description="Reviews for 4 items"
        onPress={() => handlePress('Reviews')}
      />
      <ButtonProfileComponent
        title="Settings"
        description="Notifications, password"
        onPress={() => handlePress('Settings')}
      />
    </SectionComponent>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'flex-end',
    marginRight: handleSize(15),
  },
  title: {
    marginLeft: handleSize(14),
  },
  image: {
    marginLeft: handleSize(14),
    width: handleSize(64),
    height: handleSize(64),
    borderRadius: 100,
  },
  name: {
    marginLeft: handleSize(17),
  },
});

export default ProfileScreen;
