import React from "react";
import CapturedImage from "./CapturedImage";
import Firebase from "./Firebase";
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';
import{ StackNavigator,} from 'react-navigation';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'


var database = firebase.database();

export default class Register extends React.Component {

  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password:'',
      name: '',
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

      firebase.auth().createUserWithEmailAndPassword(email, password)
      this.props.navigation.navigate("Register");

      var data = {
        email: email,
        name:  this.state.name,
        totalIdentified: this.state.totalIdentified,
        numCorrect: this.state.numCorrect
      }

      database.ref("users").push(data)
      this.props.navigation.navigate("Game", {title: "Let's Play"})
      /*database.ref("users").push().child("email").set(email)
      database.ref("users").push().child("name").set(this.state.name)
      database.ref("users").push().child("total identified").set(this.state.totalIdentified)
      database.ref("users").push().child("num correct").set(this.state.numCorrect)
      database.ref("users").push().child("photos")*/
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
          <Label>Email</Label>
          <Input
            name="email"
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

          <Item floatingLabel>
          <Label>Name</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(name) => this.setState({name})}
            />
          </Item>

          <Item floatingLabel>
          <Label>Total Identified</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(totalIdentified) => this.setState({totalIdentified})}
            />
          </Item>

          <Item floatingLabel>
          <Label>Num Correct</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(numCorrect) => this.setState({numCorrect})}
            />
          </Item>

          <Button style={{ marginTop: 10 }} full success={true} onPress={()=>this.signUpUser(this.state.email, this.state.password)} >
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  }
});
