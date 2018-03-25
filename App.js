// import React from "react";
// import Home from "./Home";
// import CapturedImage from "./CapturedImage";

// import {
//   createRouter,
//   NavigationProvider,
//   StackNavigation,
//   AndroidBackButtonBehavior
// } from "@expo/ex-navigation";

// const Router = createRouter(() => ({
//   home: () => Home,
//   image: () => CapturedImage
// }));

// export default class App extends React.Component {
//   render() {
//     return (      
//       <NavigationProvider router={Router}>
//         <StackNavigation initialRoute={Router.getRoute("home")} />
//       </NavigationProvider>
//     );
//   }
// }

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { TfImageRecognition } from 'react-native-tensorflow';

export default class App extends Component {

  constructor() {
    super()
    this.image = require('./assets/daisy.jpg');
    this.state = {result: ""}
  }

  componentDidMount() {
    this.recognizeImage()
  }

  async recognizeImage() {

    try {
      const tfImageRecognition = new TfImageRecognition({
        model:require('./assets/tensorflow_inception_graph.pb'),
        labels: require('./assets/labels.txt')
      })

      const results = await tfImageRecognition.recognize({
        image: this.image
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
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome !
        </Text>
        <Image source={this.image} style={styles.image} />
        <Text style={styles.results}>
          {this.state.result}
        </Text>
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
  image: {
    width: 150,
    height: 100
  },
});