import React, {Component} from "react";
import { CameraRoll, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";
import { TfImageRecognition } from 'react-native-tensorflow';
import PlantInfo from "./PlantInfo";
import Guess from "./Guess";

export default class CapturedImage extends Component {
  static route = {
    navigationBar: {
      title: "Image"
    }
  };

constructor(){
  super();
  this.state = {
    image: null,
    result: "",
    options:[],
  }
}

   componentDidMount() {
    this._pickImage();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      try{

        let res = FileSystem.getInfoAsync(FileSystem.documentDirectory + "selectedImages/");
          if (!res.exists) {
            FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "selectedImages/").catch(e => {
              console.log(e, "Directory exists");
            });
          }

        let info = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "selectedImages/");
        console.log(info);

        let arr = (result.uri).split('/');
        let filename = arr[arr.length-1];

        await FileSystem.copyAsync({
            from: result.uri,
            to: `${FileSystem.documentDirectory}selectedImages/Photo_${filename}`
          });


        this.setState({
          image: `${FileSystem.documentDirectory}selectedImages/Photo_${filename}`
        });

      let photos = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "selectedImages/");
      // console.log("Reading FileSystem.documentDirectory/selectedImages/: " + photos);
      this.recognizeImage();
      }
      catch(e){
        console.log(e);
      }
    }

  }


  async recognizeImage() {
    try {
      const tfImageRecognition = new TfImageRecognition({
        model:require('./assets/model/optimized_graph.pb'),
        labels: require('./assets/model/retrained_labels.txt'),
        imageMean: 128,
        imageStd: 128,
      })

      var img = decodeURI(this.state.image).replace("file://","");
      console.log("Passing to tf: " + img);
      const results = await tfImageRecognition.recognize({
        image: img,
        outputName:"final_result"
      });

      console.log("Tf recognition plants result:" + results);


      const resultText = `${results[0].name}`
      this.setState({
        // options: [results[0].name, results[1].name, results[2].name],
        result: resultText,
      });

      await tfImageRecognition.close()
    } catch(err) {
      alert(err)
    }
  }

  
    render() {
      return (
        <View style={styles.container}>
          {(this.state.image) &&<Image source={{uri: this.state.image}} style={styles.image} />}
          {(this.state.result) !== "" && <Guess option={this.state.result} {...this.props}></Guess>}

        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    results: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  buttonInfo: {
    margin: 15,
    padding: 20,
    width: 175,
    alignItems: 'center',
    backgroundColor: 'steelblue',
  },
  textInfo: {
    fontSize: 18,
    color: 'white',
  },
    image: {
      width: 150,
      height: 100
    },
  });
