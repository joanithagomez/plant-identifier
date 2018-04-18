import React from "react";
import Home from "./Home";
import CapturedImage from "./CapturedImage";
import PlantInfo from "./PlantInfo";
import Recognize from "./Recognize";
import GalleryScreen from "./GalleryScreen";
import Login from "./Login";
import Guess from "./Guess";

import { StackNavigator } from 'react-navigation';

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
    GalleryScreen:{
      screen: GalleryScreen,
    },
    Recognize: {
      screen:Recognize,
    },
    Login: {
      screen: Login,
    },
    Guess:{
      screen: Guess,
    }
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
