import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Vibration
} from "react-native";

import {Container, Button, Label} from 'native-base';
import PlantInfo from "./PlantInfo";

export default class Guess extends React.Component {

  constructor(props){
    super(props);
  }

  _goToInfoscreen = (name) => {
    console.log("Name going to _goToInfoscreen: " + name);
    this.props.navigation.navigate('PlantInfoPage', {itemWiki: {item: name}});
  };

  render(){

    return(
      <Container style={styles.container}>
        <Text style={styles.title}>What's your guess? </Text>
        <Button style={{ marginTop: 10,borderRadius:50 }} full success={true} >
          <Text style={{ color: 'white' }}>{this.props.option}</Text>
        </Button>
        <Button style={{ marginTop: 10,borderRadius:50 }} full success={true} onPress={() => {
          this._goToInfoscreen(this.props.option);
        }}>
          <Text style={{ color: 'white' }}>{this.props.option}</Text>
        </Button>
        <Button style={{ marginTop: 10,borderRadius:50 }} full success={true} >
          <Text style={{ color: 'white' }}>{this.props.option}</Text>
        </Button>
    </Container>);
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // padding: 10
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
