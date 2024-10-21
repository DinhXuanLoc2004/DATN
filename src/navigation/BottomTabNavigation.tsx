import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Heart, User} from 'iconsax-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../constants/colors';
import CartScreen from '../screens/mains/tabs/CartScreen';
import FavoriteScreen from '../screens/mains/tabs/FavoriteScreen';
import HomeScreen from '../screens/mains/tabs/HomeScreen';
import ProfileScreen from '../screens/mains/tabs/ProfileScreen';
import CategoriesStacks from '../screens/mains/tabs/CategoriesStacks';
import {handleSize} from '../utils/handleSize';
import RequiredLoginScreen from '../screens/mains/tabs/RequiredLoginScreen';
import {useAppSelector} from '../helper/store/store';

type RootBottomTabParamList = {
  HomeScreen: undefined;
  CategoriesStacks: undefined;
  CartScreen: undefined;
  FavoriteScreen: undefined;
  ProfileScreen: undefined;
};

const RootTab = createBottomTabNavigator<RootBottomTabParamList>();

export const BottomTab = () => {
  const userId = useAppSelector(state => state.auth.user.userId);
  return (
    <RootTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: handleSize(55),
          elevation: 0,
          backgroundColor: colors.White_Color,
          borderTopLeftRadius: handleSize(20),
          borderTopEndRadius: handleSize(20),
        },
      }}
      initialRouteName="HomeScreen">
      <RootTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="home"
              size={handleSize(focused ? 27 : 25)}
              color={focused ? colors.Primary_Color : colors.Gray_Color}
            />
          ),
        }}
      />
      <RootTab.Screen
        name="CategoriesStacks"
        component={CategoriesStacks}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="shopping-bag"
              size={handleSize(focused ? 25 : 21)}
              color={focused ? colors.Primary_Color : colors.Gray_Color}
            />
          ),
        }}
      />
      <RootTab.Screen
        name="CartScreen"
        component={userId ? CartScreen : RequiredLoginScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="shopping-cart"
              size={handleSize(focused ? 27 : 23)}
              color={focused ? colors.Primary_Color : colors.Gray_Color}
            />
          ),
        }}
      />
      <RootTab.Screen
        name="FavoriteScreen"
        component={userId ? FavoriteScreen : RequiredLoginScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Heart
              size={handleSize(focused ? 30 : 25)}
              variant="Bold"
              color={focused ? colors.Primary_Color : colors.Gray_Color}
            />
          ),
        }}
      />
      <RootTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <User
              size={handleSize(focused ? 30 : 25)}
              variant="Bold"
              color={focused ? colors.Primary_Color : colors.Gray_Color}
            />
          ),
        }}
      />
    </RootTab.Navigator>
  );
};
