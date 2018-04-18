import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlantList from "./PlantList.js";
import PlantInfo from "./PlantInfo.js";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
