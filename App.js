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
import Splash from "./Splash";
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

  PlantInfoPage: {
    screen: PlantInfo
  },
  GalleryScreen: {
    screen: GalleryScreen
  },
  Register: {
    screen: Register
  },
  Guess: {
    screen: Guess
  },
  Recognition: {
    screen: Recognition
  },
  // Game: {
  //   screen: Game
  // },
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
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  },
  CameraScreen: {
    screen: CameraScreen
  },

  ListItem: {
	  screen: ListItem
  },

},{initialRouteName: 'Game'});


const InitialStackRoutes = StackNavigator(
  {
      SplashScreen: {
          screen: Splash
      },
      Login: {
          screen: Login
      },
      Game: {
          screen: GameStack
      },
  },{initialRouteName: 'SplashScreen'},
  {
      headerMode: 'none',
      gesturesEnabled: false
  }
);

const Tab = TabNavigator({
  Home: { screen: HomeStack },
  Game: { screen: InitialStackRoutes },
},
{
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeBackgroundColor: '#cbe86b',
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      labelStyle: {
       fontSize: 14,
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
