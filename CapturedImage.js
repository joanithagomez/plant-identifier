import React from "react";
import { CameraRoll, StyleSheet, Text, View, Image } from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";

export default class CapturedImage extends React.Component {
  static route = {
    navigationBar: {
      title: "Image"
    }
  };

  state = {
    image: null
  };

  componentDidMount() {
      this._pickImage();
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
        showImage: true
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.backButton} onPress={this._goBackHome}>
          Go back home
        </Text>
        {this.state.image && (
          <Image source={{ uri: this.state.image }} style={styles.pic} />
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
