import React, { Component } from 'react';
import PlantList from "./PlantList.js";
import PlantInfo from "./PlantInfo.js";

import { Text, View, StyleSheet,  TouchableOpacity, ScrollView } from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

const RootStack = StackNavigator(
  {
    Home: {
      screen:  PlantList,
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
    return <RootStack />;
  }
  
}

