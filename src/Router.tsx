import { HomeScreen, AccountScreen, TodayScreen } from "./Screens";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Account: AccountScreen,
  Today: TodayScreen
});

export default createAppContainer(TabNavigator);
