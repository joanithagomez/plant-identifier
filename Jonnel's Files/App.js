import React from "react";
import Settings from "./Settings.js";
import Home from "./Home.js";
import Profile from "./Profile.js";
import CapturedImage from "./CapturedImage";
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import{ StackNavigator,} from 'react-navigation';


import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  AndroidBackButtonBehavior
} from "@expo/ex-navigation";

const RootStack = StackNavigator(
  {
    Welcome: {screen: Home,},
    Profile: {screen: Profile,},
    Setting: {screen: Settings,},},
  {
    initialRouteName: 'Welcome',
  }
);

export default class App extends React.Component {
  render(){
    return <RootStack/>;
  }
  // render() {
  //   return (
  //     <NavigationProvider router={Router}>
  //       <StackNavigation initialRoute={Router.getRoute("setting")} />
  //     </NavigationProvider>
  //   );
}
