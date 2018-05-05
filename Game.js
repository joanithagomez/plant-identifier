import React from "react";
import {Container, Text, Button, Content} from 'native-base';
import {CameraRoll, StyleSheet, View, Image} from "react-native";
import JoinRoom from './JoinRoom';
import Firebase from "./Firebase";
import * as firebase from 'firebase';

export default class Game extends React.Component {
  static navigationOptions = {
    header: null
  }
  state={
    userId: null
  };
  
  componentDidMount(){
    var userId;

    if(firebase.auth().currentUser){
       this.setState({userId : firebase.auth().currentUser.uid});
    }
  }
  render() {

    //This is the id of the logged in user
    // var userId = firebase.auth().currentUser.uid;
    console.log(this.state.userId + " in Game");

    return (<Container style={styles.container}>
      <View>
        <Button large style={styles.button} onPress={() => this.props.navigation.navigate('CreateRoom', {title: 'Create Room'})}>
          <Text style={styles.btnText}>Create Room</Text>
        </Button>
        <JoinRoom {...this.props}/>
        {this.state.userId && <Button transparent onPress={() => {
                firebase.auth().signOut().then(() => {
                  console.log("Sign-out successful.");
                  this.props.navigation.navigate('Login');
                }, function(error) {
                  console.log("An error happened.");
                });
              }}>
              <Text>Sign out</Text>
            </Button>}
      </View>

    </Container>);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    margin: 10
  },
  btnText: {
    color: "white",
    fontSize: 15
  }
});
