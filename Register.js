import React from "react";
import CapturedImage from "./CapturedImage";
import Firebase from "./Firebase";
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import{ StackNavigator,} from 'react-navigation';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'


var database = firebase.database();
var ref = database.ref();
var usersRef = ref.child('users');

export default class Register extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password:'',
      name: '',
      currentUserID: null,
      totalIdentified: 0,
      numCorrect: 0
    })
  }

  signUpUser = (email,password)=>{
    try{

      if(this.state.password.length<6)
      {
        alert("Please enter at least 6 characters")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        console.log(user);
        // user.forEach((item) => {console.log(item);});

        var userId = user.uid;

              usersRef.child(userId).set({
                email: this.state.email,
                  name:  this.state.name,
                  totalIdentified: this.state.totalIdentified,
                  numCorrect: this.state.numCorrect,
                  photos: 0,
              });


        // this.setState({ currentUserID: userId});
      });


      this.props.navigation.navigate("Game", {title: "Let's Play"})

    }

    catch(error){
      console.log(error.toString())
    }

  }


  render() {
    return (

      <Container style={styles.container}>

        <Form>

          <Item floatingLabel>
          <Label style={{ color: '#009F18' }}>Email</Label>
          <Input
			style={{ color: 'white' }}
            name="email"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
          />
          </Item>

          <Item floatingLabel>
          <Label style={{ color: '#009F18' }}>Password</Label>
          <Input
			style={{ color: 'white' }}
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Item floatingLabel>
          <Label style={{ color: '#009F18' }}>Name</Label>
          <Input
			style={{ color: 'white' }}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(name) => this.setState({name})}
            />
          </Item>

          <Button style={{ marginTop: 10, backgroundColor: '#45c6b5' }} full dark onPress={()=>this.signUpUser(this.state.email, this.state.password)} >
            <Text style={{ color: 'white' }}>Register</Text>
          </Button>


        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#bff165',
    justifyContent: 'center',
    padding: 10
  }
});
