import React, {Component} from "react";
import {
  CameraRoll,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Vibration
} from "react-native";
import {Constants, Camera, FileSystem, Permissions, ImagePicker} from "expo";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text} from 'native-base';
import {TfImageRecognition} from 'react-native-tensorflow';
import firebase from './Firebase';

var database = firebase.database();

export default class CameraScreen extends Component {
  static navigationOptions = {
    header: null
  }
  state = {
    hasCameraPermission: null,
    type: "Camera.Constants.Type.back",
    showCam: false,
    photoId: 1,
    showGallery: false,
    showImage: false,
    image: null,
    result: ''
  };

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  }

  async componentDidMount() {
    try {
      let res = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "photos");
      if (!res.exists) {
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "photos", {intermediates: true}).catch(e => {
          console.log(e, "Directory exists");
        });
      }
    } catch (error) {
      console.log('Caught', error.message);
    }
  }


  takePicture = async function() {
    if (this.camera) {
      let data = await this.camera.takePictureAsync({skipProcessing: true,fixOrientation: false});

      // save pictures to firebase
      // var uid = firebase.auth().currentUser.uid;
      // database.ref("users").child(uid).child("photos").push(data.uri);
        let saveResult = CameraRoll.saveToCameraRoll(data.uri, 'photo');

        let arr = (data.uri).split('/');
        let filename = arr[arr.length - 1];

        FileSystem.copyAsync({from: data.uri, to: `${FileSystem.documentDirectory}photos/Photo_${filename}`}).then(() => {

        this.setState({image: `${FileSystem.documentDirectory}photos/Photo_${filename}`});
          Vibration.vibrate();
          this.recognizeImage();
          // this.props.navigation.navigate('Recognition', {result: this.state.result});

        });
    }
  };


    async recognizeImage() {
      try {
        const tfImageRecognition = new TfImageRecognition({
          model:require('./assets/model/retrained_graph.pb'),
          labels: require('./assets/model/retrained_labels.txt'),
          imageMean: 128,
          imageStd: 128,
        })

        var img = decodeURI(this.state.image).replace("file://","");
        // console.log("Passing to tf: " + img);
        const results = await tfImageRecognition.recognize({
          image: img,
          outputName:"final_result"
        });

        // console.log("Tf recognition plant result:" + results);

        const resultText = `${results[0].name}`
        this.setState({
          result: resultText,
        });

        await tfImageRecognition.close()
        // console.log("this.state.result in cameraScreen: " + this.state.result);

        this.props.navigation.state.params.returnData(this.state.result, this.state.image);
        this.props.navigation.goBack();

      } catch(err) {
        alert(err)
      }
    }

  render() {
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission == null) {
      return (<View>
        <Text>Permission:null</Text>
      </View>);
    } else if (hasCameraPermission === false) {
      return <Text>No access</Text>;
    } else {
      return (
        <Camera style={{
            flex: 1
          }} ref={ref => {
            this.camera = ref;
          }} type={this.state.type}>
          <View style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}>
            <Button style={styles.flipbutton} onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                });
              }}>
              <Text style={styles.buttonText}>
                Flip
              </Text>
            </Button>
            <Button style={styles.capturebtn} onPress={
            this.takePicture.bind(this)}>
              <Text style={styles.capturebtnText}>
                Recognize
              </Text>
            </Button>
            <Button style={styles.gallerybtn} onPress={() => this.props.navigation.navigate('Image')}>
              <Text style={styles.buttonText}>Gallery</Text>
            </Button>

          </View>
        </Camera>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee"
  },
  buttonText: {
    color: "white",
    fontSize: 15
  },
  flipbutton:{
      backgroundColor: 'black',
      alignSelf: "flex-end",
      alignItems: "center",
      marginHorizontal: 2,
      marginBottom: 10,

    },
capturebtn:{
      backgroundColor: 'white',
      alignSelf: "flex-end",
      marginHorizontal: 2,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    capturebtnText:{
      color:'black',
    },
    gallerybtn:{
      backgroundColor: 'black',
      alignSelf: "flex-end",
      marginHorizontal: 2,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center"
    },
  button: {
    marginHorizontal: 2,
    // marginBottom: 10,
    marginTop: 20,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },

});
