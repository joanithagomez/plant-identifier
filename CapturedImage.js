import React, {Component} from "react";
import { CameraRoll, StyleSheet, Text, View, Image } from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";
import { TfImageRecognition } from 'react-native-tensorflow';

export default class CapturedImage extends Component {
  static route = {
    navigationBar: {
      title: "Image"
    }
  };

constructor(){
  super();
  this.state = {
    result: "",
    image: null,
  };
}

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
      },() => this.recognizeImage());
    }
  };


  async recognizeImage() {

    try {
      const tfImageRecognition = new TfImageRecognition({
        model:require('./assets/model/optimized_graph.pb'),
        labels: require('./assets/model/retrained_labels.txt'),
        imageMean: 128,
        imageStd: 128,
      })

      const results = await tfImageRecognition.recognize({
        image: this.state.image,
        outputName:"final_result"
      })
      const resultText = `Name: ${results[0].name} - Confidence: ${results[0].confidence}`
      this.setState({result: resultText})

      await tfImageRecognition.close()
    } catch(err) {
      alert(err)
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.backButton} onPress={this._goBackHome}>
          Go back home
        </Text>
        {this.state.image && (<View>
          <Image source={{ uri: this.state.image }} style={styles.pic} />
          <Text style={styles.results}>
            {this.state.result}
          </Text>
        </View>

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
  results: {
   textAlign: 'center',
   color: '#333333',
   marginBottom: 5,
 },
  pic: {
    width: 600,
    height: 800
  }
});
