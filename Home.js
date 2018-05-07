import React from "react";
import {
  CameraRoll,
  StyleSheet,
  View,
  Image
} from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";
import { Container, H1, H3, Button,Content, Icon, Text } from 'native-base';
import Firebase from "./Firebase";
import * as firebase from 'firebase';


export default class Home extends React.Component {
  static navigationOptions = {
          header: null,
      }

componentDidMount(){
  var user = firebase.auth().currentUser;
  if(user){
    console.log("User in Home component: " + user.uid)
    }
}
  render() {
    // console.log("home: " + this.props.navigation.state);
    // for(var property in this.props.navigation.state){
    //   console.log(property);
    // }
    // var user = firebase.auth().currentUser;
    // if(user){
    //   console.log("User in Home component: " + user.uid)
    //   }
    return (
      <Container style={styles.container}>
          <H1 style={styles.h1}>Hello</H1>
          <H3 style={styles.h3}>Let's identify your plant!</H3>
          <View style={styles.buttonscontainer}>
            <View style={styles.buttons}>
          <Button large style={styles.button} onPress={() => this.props.navigation.navigate('CameraScreen',{returnData:
            (res, image) => {
             this.props.navigation.navigate('Recognition', {result: res, image: image});
            }
          })}>
           <Icon style={styles.icon} name='camera' />
            {/* <Text style={styles.btnText}>Take Photo</Text> */}
          </Button>
          <Button large style={styles.button} onPress={() => this.props.navigation.navigate('Image')}>
            <Icon style={styles.icon} name='image' />
            {/* <Text style={styles.btnText}>Open Gallery</Text> */}
          </Button>
            </View>
          </View>
      </Container>);
  }
}

const styles = StyleSheet.create({
  h1: {
    lineHeight: 70 * 0.75,
    fontSize: 70,
    fontWeight: 'bold',
    paddingTop: 70 - (70 * 0.75),
    color:'#009F18'

  },
  h3: {
    fontSize: 30,
    fontWeight: '100',
    paddingTop: 30 - (30 * 0.75),
    lineHeight: 30 * 0.75,
    color:'#009F18'
  },
  container: {
    flex:1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#cbe86b",
    padding: 10
  },
  buttonscontainer:{
    alignItems:'center',
    justifyContent:'center',
  },
  buttons:{
    flexDirection:'row',
    paddingTop: 40
  },
  icon: {
    color:'#009F18',
    fontSize: 35
  },
  button: {
    borderWidth: 0,
    // borderColor: '#fff',
    justifyContent: 'center',
    alignItems: "center",
    width: 150,
    height: 100,
    // borderRadius: 100 / 2,
    backgroundColor: '#fff',
    // padding: 20,
    margin: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 15
  },

});
