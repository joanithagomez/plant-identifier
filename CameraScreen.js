import React, {Component} from "react";
import {
  CameraRoll,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Vibration
} from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import { TfImageRecognition } from 'react-native-tensorflow';

export default class CameraScreen extends Component {


    state = {
      hasCameraPermission: null,
      type: "Camera.Constants.Type.back",
      showCam: false,
      photoId: 1,
      showGallery: false,
      showImage: false,
      image:null,
      result: '',
    };


    async componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === "granted" });
    }

    componentDidMount() {
      FileSystem.getInfoAsync(FileSystem.documentDirectory + "photos").then(res => {
        if (!res.exists) {
          FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "photos",{
            intermediates: true,
          }).catch(e => {
            console.log(e, "Directory exists");
          });
        }
      });

    }

    takePicture = async function() {
      if (this.camera) {
        this.camera.takePictureAsync().then(data => {

          let saveResult = CameraRoll.saveToCameraRoll(data.uri, 'photo');
          console.log("uri:" + data.uri);
          // console.log("saveResult: " + saveResult);
          console.log("Property in saveResult: ");
          for(var property in saveResult)
            console.log(property);

          let arr = (data.uri).split('/');
          let filename = arr[arr.length-1];

          FileSystem.moveAsync({
            from: data.uri,
            to: `${FileSystem.documentDirectory}photos/Photo_${filename}`
          }).then(() => {

          this.setState({
            image: `${FileSystem.documentDirectory}photos/Photo_${filename}`
          });
          Vibration.vibrate();
        });
      });
    }
  };

  render(){
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission == null) {
      return (
        <View>
          <Text>Permission:null</Text>
        </View>
      );
    } else if (hasCameraPermission === false) {
      return <Text>No access</Text>;
    } else {
      return (
        <View
          style={{
            flex: 1
          }}
        >
          <Camera
            style={{ flex: 1 }}
            ref={ref => {
              this.camera = ref;
            }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <Button
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                  {" "}
                  Flip{" "}
                </Text>
              </Button>
              <Button
                style={[
                  styles.flipButton,
                  styles.picButton,
                  { flex: 0.3, alignSelf: "flex-end" }
                ]}
                onPress={this.takePicture.bind(this)}
              >
                <Text style={styles.flipText}> SNAP </Text>
              </Button>
              <Button
                style={[styles.flipButton, { flex: 0.3, alignSelf: "flex-end" }]}
                onPress={() => this.props.navigation.navigate('Image')}
              >
                <Text style={styles.flipText}>Gallery</Text>
              </Button>

            </View>
          </Camera>
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee"
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

    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  picButton: {
    backgroundColor: "green"
  },
  backButton: {
    padding: 20,
    backgroundColor: "indianred"
  }
});
