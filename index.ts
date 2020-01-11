import { AppRegistry } from 'react-native';
import Router from './src/Router';
import { name as appName } from './app.json';
import ReactNavigation, { TabRouter } from 'react-navigation'

AppRegistry.registerComponent(appName, () => Router);