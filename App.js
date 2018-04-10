import React from "react";
import Home from "./Home";
import CapturedImage from "./CapturedImage";

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  AndroidBackButtonBehavior
} from "@expo/ex-navigation";

const Router = createRouter(() => ({
  home: () => Home,
  image: () => CapturedImage
}));

export default class App extends React.Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute("home")} />
      </NavigationProvider>
    );
  }
}

//
// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Image
// } from 'react-native';
// import { TfImageRecognition } from 'react-native-tensorflow';
//
// export default class App extends Component<{}> {
//
//   constructor() {
//     super()
//     this.state = {
//       image:require('./assets/flower_photos/dandelion/8223968_6b51555d2f_n.jpg'),
//       result: ""
//     }
//   }
//
//   componentDidMount() {
//     this.recognizeImage()
//   }
//
//   async recognizeImage() {
//
//     try {
//       const tfImageRecognition = new TfImageRecognition({
//         model:require('./assets/model/optimized_graph.pb'),
//         labels: require('./assets/model/retrained_labels.txt'),
//         imageMean: 128,
//         imageStd: 128,
//       })
//
//       const results = await tfImageRecognition.recognize({
//         image: this.state.image,
//         outputName:"final_result"
//       })
//
//       const resultText = `Name: ${results[0].name} - Confidence: ${results[0].confidence}`
//       this.setState({result: resultText})
//
//       await tfImageRecognition.close()
//     } catch(err) {
//       alert(err)
//     }
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           sunflowers!
//         </Text>
//         <Image source={this.state.image} style={styles.image} />
//         <Text style={styles.results}>
//           {this.state.result}
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   results: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   image: {
//     width: 150,
//     height: 100
//   },
// });
