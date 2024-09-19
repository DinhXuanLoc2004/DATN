import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CategoriesSreen from './categories/CategoriesSreen';
import ProductsToCategoryScreen from './categories/ProductsToCategoryScreen';

export type StackParamsListCategory = {
  CategorisScreen: undefined;
  ProductsToCategoryScreen: {parent_id: string, name_category_parent: string};
};

const RootStack = createStackNavigator<StackParamsListCategory>();

const CategoriesStacks = () => {
  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="CategorisScreen">
      <RootStack.Screen name="CategorisScreen" component={CategoriesSreen} />
      <RootStack.Screen
        name="ProductsToCategoryScreen"
        component={ProductsToCategoryScreen}
      />
    </RootStack.Navigator>
  );
};

export default CategoriesStacks;

const styles = StyleSheet.create({});
