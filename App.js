import React from "react";
import {
  Container,
  Footer,
  Content,
  FooterTab,
  Button,
  Icon,
  Text
} from "native-base";
import { Ionicons } from '@expo/vector-icons';
import Home from "./Home";
import CapturedImage from "./CapturedImage";
import PlantInfo from "./PlantInfo";
import Register from "./Register";
import Recognition from "./Recognition";
import GalleryScreen from "./GalleryScreen";
import CameraScreen from "./CameraScreen";
import Login from "./Login";
import CreateRoom from "./CreateRoom";
import Guess from "./Guess";
import Game from "./Game";
import JoinRoom from './JoinRoom';
import ListItem from './ListItem';
import GameRoom from './GameRoom';

import {Font, AppLoading} from "expo";
import {addNavigationHelpers, TabNavigator, TabBarBottom , StackNavigator} from 'react-navigation';

console.ignoredYellowBox = [
  'Setting a timer'
];

const HomeStack = StackNavigator({
  Home: {
    screen: Home
  },
  Image: {
    screen: CapturedImage
  },
  CameraScreen: {
    screen: CameraScreen
  },
  Register: {
    screen: Register
  },
  PlantInfoPage: {
    screen: PlantInfo
  },
  GalleryScreen: {
    screen: GalleryScreen
  },
  Login: {
    screen: Login
  },
  Guess: {
    screen: Guess
  },
  Recognition: {
    screen: Recognition
  }
}, {initialRouteName: 'Home'});

const GameStack = StackNavigator({
  Game: {
    screen: Game
  },
  JoinRoom: {
    screen: JoinRoom
  },
  GameRoom: {
    screen: GameRoom
  },
  CreateRoom: {
    screen: CreateRoom
  },
  CameraScreen: {
    screen: CameraScreen
  },
  ListItem: {
	  screen: ListItem
  },

}, {initialRouteName: 'Game'});

const Tab = TabNavigator({
  Home: { screen: HomeStack },
  Game: { screen: GameStack },
},
{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#AACD6E',
      activeBackgroundColor: '#fff',
      inactiveTintColor: 'gray',
      labelStyle: {
       fontSize: 12,
       padding: 12
     }
    },
    animationEnabled: true,
    swipeEnabled: true,
  });

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({Roboto: require("native-base/Fonts/Roboto.ttf"), Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")});
    this.setState({loading: false});
  }


  render() {
    if (this.state.loading) {
      return <Expo.AppLoading/>;
    }
    return (<Container>
      <Tab />
    </Container>);
  }
}
