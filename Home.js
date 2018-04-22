import React from "react";
import {
  CameraRoll,
  StyleSheet,
  View,
  Image
} from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";
import { Container,Button, Icon, Text } from 'native-base';

export default class Home extends React.Component {
  static route = {
    navigationBar: {
      title: "Home"
    }
  };


  render() {
    // for(var property in this.props)
    //   console.log("Home: " + property);

    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          onPress={() => this.props.navigation.navigate('CameraScreen')}
        >
          <Text style={styles.flipText}> Take Photo </Text>
        </Button>
        <Button style={styles.button} onPress={() => this.props.navigation.navigate('Image')}>
          <Text style={styles.flipText}>Open Gallery</Text>
        </Button>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10
  },
  flipText: {
    color: "white",
    fontSize: 15
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  picButton: {
    backgroundColor: "darkseagreen"
  },
  backButton: {
    padding: 20,
    backgroundColor: "indianred"
  }
});
