import { HomeScreen, AccountScreen, TodayScreen } from "./Screens";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Button } from "react-native";
import React from 'react'; // for JSX support


const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Account: AccountScreen,
  Today: createStackNavigator({ 
    TodayScreen: {
      screen: TodayScreen,
      navigationOptions: {
        title: "Today",
        headerRight: () => (
          <Button
            onPress={() => {}}
            title={"Add"}
          />)
    }
  }})
});

export default createAppContainer(TabNavigator);
