import React from "react";
import {
  CameraRoll,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Vibration
} from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";

export default class Profile extends React.Component {
  static route = {
    navigationBar: {
      title: "Profile"
    }
  };

  render(){
    return(
      <Text>Profile Page</Text>
    );
  }
}
