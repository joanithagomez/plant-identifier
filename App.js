import React from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import { Camera, Permissions } from 'expo';
import { Button } from 'react-native';
export default class App extends React.Component {

  state = {
    hasCameraPermission: null,
    type: "Camera.Constants.Type.back",
    showCam: false
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  

  openCam() {
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission == null) {
        return <View style={{ flex: 1 }}><Text>Permission:null</Text></View>;
      }
      else if (hasCameraPermission === false) {
        return <Text>No access</Text>;
      }
      else {
        return (
        
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
        );
      
      }
  }

  initialView() {
    return (<View style={styles.buttonContainer}>
      <Button onPress={() => {
        this.setState({
          showCam: true
        }) 
      }} title="Hello" color="#FFFFFF" accessibilityLabel="Tap on Me" />
    </View>);
  }


  render() {
    let currentView;
    if (this.state.showCam) {
      currentView = this.openCam();
    }
    else {
      currentView = this.initialView();
    }

      return (
        <View style={{ flex: 1 }}>
          {currentView}
        </View>
      );

    }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
 
  },
  buttonContainer: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  }
});

