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

export default class Home extends React.Component {
  static route = {
    navigationBar: {
      title: "Home"
    }
  };

  state = {
    hasCameraPermission: null,
    type: "Camera.Constants.Type.back",
    showCam: false,
    photoId: 1,
    showGallery: false,
    showImage: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  componentDidMount() {
    FileSystem.getInfoAsync(FileSystem.documentDirectory + "photos").then(res => {
      if (!res.exists) {
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "photos").catch(e => {
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
        console.log("saveResult: " + saveResult);

        FileSystem.moveAsync({
          from: data.uri,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state.photoId}.jpg`
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1
          });
          Vibration.vibrate();
        })
			.catch((e) => {
				console.log(e, 'ERROR');
			});
      })
		.catch((e) => {
			console.log(e, 'takePicture ERROR');
		});
    }
  };

  openCam() {
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
              <TouchableOpacity
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
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.flipButton,
                  styles.picButton,
                  { flex: 0.3, alignSelf: "flex-end" }
                ]}
                onPress={this.takePicture.bind(this)}
              >
                <Text style={styles.flipText}> SNAP </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.flipButton, { flex: 0.25, alignSelf: "flex-end" }]}
                onPress={this._goToImageScreen}
              >
                <Text style={styles.flipText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }

  initialView() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({
              showCam: true
            });
          }}
        >
          <Text style={styles.flipText}> Take Photo </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this._goToImageScreen}>
          <Text style={styles.flipText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _goToImageScreen = () => {
    this.props.navigator.push("image");
  };

  render() {
    let currentView;
    currentView = this.state.showCam ? this.openCam() : this.initialView();
    // currentView = this.state.showImage ? this._goToImageScreen() : this.initialView();

    return <View style={{ flex: 1 }}>{currentView}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002800"
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
