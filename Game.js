import React from "react";
import {Container, Text, Button, Content} from 'native-base';

import {
  CameraRoll,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import {Constants} from 'expo';

import JoinRoom from './JoinRoom';
import Firebase from "./Firebase";
import * as firebase from 'firebase';

// retreive key from database
const key = {key};

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

    return (
		<ScrollView contentContainerStyle={styles.container}>
			<Container >
					<Text style={styles.headingStyle}>Create a Room to Play!</Text>
          <View style={styles.contentContainer}>
					<Button
						style={styles.createbutton}
						onPress={() => this.props.navigation.navigate('CreateRoom', {title: 'Create Room'})}
					>
						<Text style={styles.btnText}>Create a Room</Text>
					</Button>
        </View>
      <View contentContainerStyle={styles.contentContainer}>
				<Text style={styles.headingStyle}>Or Choose a Room to Join!</Text>
				<JoinRoom  {...this.props}/>
        {this.state.userId && <Button transparent onPress={() => {
                firebase.auth().signOut().then(() => {
                  console.log("Sign-out successful.");
                  this.props.navigation.navigate('Login');
                }, function(error) {
                  console.log("An error happened.");
                });
              }}>
         <Text style={{color: '#000'}}>Sign out</Text>
         </Button>}
       </View>
			</Container>

		</ScrollView>
	);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
	  padding: 20,
    paddingTop: 40,
    backgroundColor: '#BFF165',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  // paddingVertical: 20
},
   containerBottom: {
     justifyContent: 'center',
     alignItems: 'center',
  },

  createbutton:{
    backgroundColor: '#45c6b5',
    alignItems: "center",
    padding: 20,
    // marginLeft: 60,
    height: 60,
    width: 'auto',
    justifyContent: 'center',
    marginLeft: 30

  },

  btnText: {
    color: "white",
    fontSize: 18,
	  padding: 15,
  },
  headingStyle: {
    color: '#000',//'#c2f9cf',
    fontSize: 16,
    textAlign: 'center',
    padding: 20
  },
});
