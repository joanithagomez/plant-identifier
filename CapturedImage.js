import React, {Component} from "react";
import {CameraRoll, StyleSheet, Text, View, Image} from "react-native";
import {Constants, Camera, FileSystem, Permissions, ImagePicker} from "expo";
import {TfImageRecognition} from 'react-native-tensorflow';
import PlantInfo from "./PlantInfo";
import Guess from "./Guess";
import {Container, Spinner} from 'native-base';
import model from './assets/model/optimized_graph.pb';
import labels from './assets/model/retrained_labels.txt';

export default class CapturedImage extends Component {
  static route = {
    navigationBar: {
      title: "Image"
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      result: "",
      isLoading: true
    }
  }

  componentDidMount() {
    // console.log("Property in Gallery: ");
    // for(var property in this.props)
    //   console.log(property);
    this._pickImage();
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      try {

        let res = FileSystem.getInfoAsync(FileSystem.documentDirectory + "selectedImages/");
        if (!res.exists) {
          FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "selectedImages/").catch(e => {
            console.log(e, "Directory exists");
          });
        }

        let info = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "selectedImages/");
        console.log(info);

        let arr = (result.uri).split('/');
        let filename = arr[arr.length - 1];

        await FileSystem.copyAsync({from: result.uri, to: `${FileSystem.documentDirectory}selectedImages/Photo_${filename}`});

        this.setState({image: `${FileSystem.documentDirectory}selectedImages/Photo_${filename}`});

        let photos = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "selectedImages/");
        // console.log("Reading FileSystem.documentDirectory/selectedImages/: " + photos);
        console.log(this.state.image);
        this.recognizeImage();
      } catch (e) {
        console.log(e);
      }
    }
    else{
      this.props.navigation.navigate('Home',{title: "Plant Identifier"})
    }
  }

  async recognizeImage() {
    try {
      const tfImageRecognition = new TfImageRecognition({model , labels, imageMean: 128, imageStd: 128})
      console.log(tfImageRecognition);


      var img = decodeURI(this.state.image).replace("file://", "");
      console.log("Passing to tf: " + img);
      const results = await tfImageRecognition.recognize({image: img, outputName: "final_result", maxResults: 3});

      console.log("Tf recognition plants result:" + results);
      for(var property in results)
        console.log(property);

      console.log("Result : " + results[0].name + " confidence: " + results[0].confidence);
      // console.log("Result : " + results[1].name + " confidence: " + results[1].confidence);

      const resultText = `${results[0].name}`
      this.setState({result: resultText, isLoading: false});

      await tfImageRecognition.close()
    } catch (err) {
      alert(err)
    }
  }

  render() {
    if (this.state.isLoading) {
      return (<Container style={{
          flex: 1,
          padding: 20
        }}>
        <Spinner color='green'/>
      </Container>);
    }

    return (<View style={styles.container}>
      {(this.state.image) && <Image source = {{uri: this.state.image}} style={styles.image}/>}
      {(this.state.result !== "") && (this.state.image) && <Guess imageUri={this.state.image} option={this.state.result} {...this.props}></Guess>}
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  results: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  buttonInfo: {
    margin: 15,
    padding: 20,
    width: 175,
    alignItems: 'center',
    backgroundColor: 'steelblue'
  },
  textInfo: {
    fontSize: 18,
    color: 'white'
  },
  image: {
    width: 150,
    height: 100
  },
});
