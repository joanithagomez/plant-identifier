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

export default class CapturedImage extends React.Component {
  static route = {
    navigationBar: {
      title: "Image"
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.backButton} onPress={this._goBackHome}>
          Go back home
        </Text>
        {this.props.image && (
          <Image source={{ uri: this.props.image }} style={styles.pic} />
        )}
      </View>
    );
  }
  _goBackHome = () => {
    this.props.navigator.pop();
  };
}

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    backgroundColor: "indianred"
  },
  pic: {
    width: 600,
    height: 800
  }
});
