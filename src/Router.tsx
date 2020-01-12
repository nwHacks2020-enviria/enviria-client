import { HomeScreen, AccountScreen, TodayScreen } from "./Screens";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Account: AccountScreen,
  Today: createStackNavigator({ TodayScreen })
});

export default createAppContainer(TabNavigator);
