import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {Children} from 'react';
import {StyleSheet} from 'react-native';
import ContainerComponent from '../../../../components/layouts/ContainerComponent';
import {globalStyles} from '../../../../styles/globalStyle';
import VouchersUserNotUsed from './VouchersUserNotUsed';
import VouchersUserUsed from './VouchersUserUsed';
import SpaceComponent from '../../../../components/layouts/SpaceComponent';
import {handleSize} from '../../../../utils/handleSize';
import {fontFamilies} from '../../../../constants/fontFamilies';
import TextComponent from '../../../../components/texts/TextComponent';
import {colors} from '../../../../constants/colors';

type topTabParamList = {
  VouchersUserNotUsed: undefined;
  VouchersUserUsed: undefined;
};

const Tab = createMaterialTopTabNavigator<topTabParamList>();

const VouchersUserScreen = () => {
  return (
    <ContainerComponent
      isHeader
      back
      title="My vouchers"
      styleHeader={globalStyles.headerElevation}
      style={styles.container}>
      <SpaceComponent height={7} />
      <Tab.Navigator
        screenOptions={{
          animationEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: colors.Primary_Color,
            height: handleSize(2.5),
          },
        }}>
        <Tab.Screen
          name="VouchersUserNotUsed"
          component={VouchersUserNotUsed}
          options={{
            tabBarLabel: ({focused, color}) => (
              <TextComponent
                text="Not used"
                color={focused ? colors.Primary_Color : colors.Gray_Color}
                size={14}
                font={fontFamilies.semiBold}
              />
            ),
          }}
        />
        <Tab.Screen
          name="VouchersUserUsed"
          component={VouchersUserUsed}
          options={{
            tabBarLabel: ({focused, color}) => (
              <TextComponent
                text="Used"
                color={focused ? colors.Primary_Color : colors.Gray_Color}
                size={14}
                font={fontFamilies.semiBold}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </ContainerComponent>
  );
};

export default VouchersUserScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
});
