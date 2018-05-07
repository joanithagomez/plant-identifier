import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import Home from "./Home";
import Firebase from "./Firebase";
import * as firebase from 'firebase';
import Login from "./Login";
import Game from "./Game";
import {addNavigationHelpers, TabNavigator, NavigationActions, StackNavigator} from 'react-navigation';


export default class Splash extends React.Component {
  static navigationOptions = {
    header: null
  }

    componentWillMount() {
      var routeName ;

      firebase.auth().onAuthStateChanged((user) => {
          if(user) {
            // User is signed in.
            routeName = "Game";
          } else {
            // No user is signed in.
              routeName = "Login";
          }

          const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({ routeName: routeName })
              ]
          });

          this.props.navigation.dispatch(resetAction);
        });
    }

    render() {
        return <View/>;
    }
}
