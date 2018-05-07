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
		<ScrollView>
			<Container>
        <Content contentContainerStyle={styles.contentContainer}>
					<Text style={styles.headingStyle}>Create a Room to Play!</Text>
					<Button
						style={styles.button}
						onPress={() => this.props.navigation.navigate('CreateRoom', {title: 'Create Room'})}
					>
						<Text style={styles.btnText}>Create a Room</Text>
					</Button>
        </Content>
				{/* </View> */}
      <Content contentContainerStyle={styles.contentContainer}>
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
         <Text>Sign out</Text>
         </Button>}
       </Content>
			</Container>

		</ScrollView>
	);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
	  padding: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  contentContainer: {
  paddingVertical: 20
},
   containerBottom: {
     justifyContent: 'center',
     alignItems: 'center',
  },
  containerInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: "center",
	borderColor: '#c2f9cf',
    backgroundColor: "#45c6b5",
    padding: 10,
    margin: 10
  },
  btnText: {
    color: "white",
    fontSize: 15,
	  padding: 15,
  },
  headingStyle: {
    color: 'black',
    fontSize: 14,
  },
});
