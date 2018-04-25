import React from "react";
import {Container, Text, Button, Content} from 'native-base';
import {
  CameraRoll,
  StyleSheet,
  View,
  Image
} from "react-native";

export default class Game extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
    headerTitleStyle: {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'center'
    },
    headerStyle: {
      backgroundColor: 'green'
    }
  });

  render() {
    return (<Container style={styles.container}>
      <View>
        <Button large style={styles.button} onPress={() => this.props.navigation.navigate('CreateRoom', {title: 'Create Room'})}>
          <Text style={styles.btnText}>Create Room</Text>
        </Button>
        <Button large style={styles.button} onPress={() => this.props.navigation.navigate('JoinRoom', {title: 'Join Room'})}>
          <Text style={styles.btnText}>Join Room</Text>
        </Button>
      </View>
    </Container>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
