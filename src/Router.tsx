import { HomeScreen, TodayScreen, AccountScreen} from "./Screens";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, getActiveChildNavigationOptions } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Button, View } from "react-native";
import React from 'react'; // for JSX support
import AddScreen from "./Screens/AddScreen";
import LeaderboardScreen from "./Screens/LeaderboardScreen";


const TodayAdd = createStackNavigator(
  { Today: TodayScreen,
    Add: AddScreen },
  { initialRouteName: 'Today',
    navigationOptions: ({ navigation, screenProps }) => {
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

const LeaderboardStack = createStackNavigator({
  Leaderboard: LeaderboardScreen
}, {
    initialRouteName: 'Leaderboard',
    navigationOptions: ({ navigation, screenProps }) => {
      // you can put fallback values before here, eg: a default tabBarLabel
      const childOptions = getActiveChildNavigationOptions(navigation, screenProps)
      // put other navigationOptions that you don't want the active child to
      // be able to override here!

      return {
        title: childOptions.title,
        tabBarLabel: childOptions.tabBarLabel,
      }
}})

const AccountStack = createStackNavigator({
  Account: AccountScreen
}, {
    initialRouteName: 'Account',
    navigationOptions: ({ navigation, screenProps }) => {
      // you can put fallback values before here, eg: a default tabBarLabel
      const childOptions = getActiveChildNavigationOptions(navigation, screenProps)
      // put other navigationOptions that you don't want the active child to
      // be able to override here!

      return {
        title: childOptions.title,
        tabBarLabel: childOptions.tabBarLabel,
      }
}})

const HomeStack = createStackNavigator({
  Home: HomeScreen
}, {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation, screenProps }) => {
      // you can put fallback values before here, eg: a default tabBarLabel
      const childOptions = getActiveChildNavigationOptions(navigation, screenProps)
      // put other navigationOptions that you don't want the active child to
      // be able to override here!

      return {
        title: childOptions.title,
        tabBarLabel: childOptions.tabBarLabel,
      }
}})

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  TodayAdd,
  LeaderboardStack,
  AccountStack,
});

export default createAppContainer(TabNavigator);
