import React from "react";
import CapturedImage from "./CapturedImage";
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import{ StackNavigator,} from 'react-navigation';


import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'

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

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDR34ALXOEOnNqCvtGXsXnBThTZ6V-e-NM",
    authDomain: "plant-identifier-cf27c.firebaseapp.com",
    databaseURL: "https://plant-identifier-cf27c.firebaseio.com",
    projectId: "plant-identifier-cf27c",
    storageBucket: ""
};

firebase.initializeApp(firebaseConfig);

export default class Home extends React.Component {

  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password:''
    })
  }

signUpUser = (email,password)=>{
  try{

    if(this.state.password.length<6)
    {
      alert("Please enter at least 6 characters")
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  catch(error){
    console.log(error.toString())
  }

}

loginUser = (email,password)=>{

  try{

      firebase.auth().signInWithEmailAndPassword(email, password)
      this.props.navigation.navigate("Profile")
  }
  catch(error){
    console.log("User has not been created")
  }

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
