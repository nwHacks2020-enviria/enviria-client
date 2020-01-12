import { HomeScreen, AccountScreen, TodayScreen } from "./Screens";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, getActiveChildNavigationOptions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Button, View } from "react-native";
import React from 'react'; // for JSX support


const Today = createStackNavigator(
  { TodayScreen },
  { navigationOptions: ({ navigation, screenProps }) => {
      // you can put fallback values before here, eg: a default tabBarLabel
      const childOptions = getActiveChildNavigationOptions(navigation, screenProps)
      // put other navigationOptions that you don't want the active child to
      // be able to override here!

      return {
        title: childOptions.title,
        tabBarLabel: childOptions.tabBarLabel,
        headerRight: childOptions.headerRight
      }
    },
  }  
)

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Account: AccountScreen,
  Today
});

export default createAppContainer(TabNavigator);
