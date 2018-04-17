import React from "react";
import Home from "./Home";
import CapturedImage from "./CapturedImage";
import PlantInfo from "./PlantInfo";
import { StackNavigator } from 'react-navigation';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from "@expo/ex-navigation";

const RootStack = StackNavigator(
  {
    Home: {
      screen:  Home,
    },
    Image:{
      screen: CapturedImage,
    },
    PlantInfoPage: {
      screen: PlantInfo,
    },
  },
  {
    initialRouteName: 'Home',
  }
);
export default class App extends React.Component {
 
  render() {
    return (
      <RootStack/>
    );
  }
}
