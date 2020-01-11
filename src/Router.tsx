import {
    HomeScreen,
    AccountScreen
} from './Screens';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Account: AccountScreen
});

export default createAppContainer(TabNavigator);