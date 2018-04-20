import React from "react";
import Home from "./Home";
import CapturedImage from "./CapturedImage";
import PlantInfo from "./PlantInfo";
import Recognize from "./Recognize";
import GalleryScreen from "./GalleryScreen";
import CameraScreen from "./CameraScreen";
import Login from "./Login";
import BottomTab from "./BottomTab";
import Guess from "./Guess";
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { Font, AppLoading } from "expo";
import { StackNavigator } from 'react-navigation';

const RootStack = StackNavigator(
  {
    Home: {
      screen:  Home,
    },
    Image:{
      screen: CapturedImage,
    },
    CameraScreen:{
      screen:CameraScreen,
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
    },
    BottomTab:{
      screen:BottomTab,
    },

  },
  {
    initialRouteName: 'BottomTab',
  }
);
export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = { loading: true };
    }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }
    return (
      <RootStack/>
    );
  }
}
