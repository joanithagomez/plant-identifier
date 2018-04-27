import React from "react";
import CapturedImage from "./CapturedImage";
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import{ StackNavigator,} from 'react-navigation';


import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDR34ALXOEOnNqCvtGXsXnBThTZ6V-e-NM",
    authDomain: "plant-identifier-cf27c.firebaseapp.com",
    databaseURL: "https://plant-identifier-cf27c.firebaseio.com",
    projectId: "plant-identifier-cf27c",
    storageBucket: ""
};

firebase.initializeApp(firebaseConfig);

export default class Login extends React.Component {
  // static navigationOptions = ({navigation}) => ({
  //   title: `${navigation.state.params.title}`,
  //   headerTitleStyle: {
  //     color: 'white',
  //     textAlign: 'center',
  //     alignSelf: 'center'
  //   },
  //   headerStyle: {
  //     backgroundColor: 'green'
  //   }
  // });

  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password:''
    })
  }

signUpUser = (email,password) => {
try
  {  if(this.state.password.length<6)
    {
      alert("Please enter at least 6 characters")
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password);
    this.props.navigation.navigate("Home", {title: "Let's Play"});

}
    catch(error) {
   console.log(error.code);
   console.log(error.message);
  }

}

loginUser = (email,password)=>{
    try{
      firebase.auth().signInWithEmailAndPassword(email, password)
         // this.props.navigation.navigate("Game", {title: "Let's Play"});
         this.props.navigation.navigate("Home", {title: "Home"})

       }
        catch(error) {
             console.error("Sign in failed.");
        }
      // this.props.navigation.navigate("Game", {title: "Let's Play"})

}


  render() {
    return (

      <Container style={styles.container}>

        <Form>

          <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
          />
          </Item>

          <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Button style={{ marginTop: 10 }} full success={true} onPress={()=>this.loginUser(this.state.email, this.state.password)} >
            <Text style={{ color: 'white' }}>Login</Text>
          </Button>

          <Button style={{marginTop: 10 }} full primary={true} onPress={()=>this.signUpUser(this.state.email, this.state.password)} >
            <Text style={{ color: 'white' }}>Sign Up</Text>
          </Button>
          <Button rounded dark style={{ marginTop: 10}} onPress={() => {this.props.navigation.navigate('Setting')}}>
            <Text style={{ color: 'white'}}>Settings</Text>
          </Button>


        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  }
});
