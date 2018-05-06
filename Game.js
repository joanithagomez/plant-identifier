import React from "react";
import {Container, Text, Button, Content} from 'native-base';
import {
  CameraRoll,
  StyleSheet,
  View,
  Image
} from "react-native";
import JoinRoom from './JoinRoom';

// retreive key from database
const key = {key};

export default class Game extends React.Component {
  static navigationOptions = {
        header: null
    }

  render() {

    return (<Container style={styles.container}>
      <View>
        <Button large style={styles.button} onPress={() => this.props.navigation.navigate('CreateRoom', {title: 'Create Room'})}>
          <Text style={styles.btnText}>Create Room</Text>
        </Button>
        <JoinRoom {...this.props}/>
      </View>
    </Container>);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    margin: 10,
  },
  btnText: {
    color: "white",
    fontSize: 15
  },

});
