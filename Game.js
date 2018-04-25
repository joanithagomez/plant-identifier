import React from "react";
import {Container, Text, Button, Label} from 'native-base';

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
    return (<Container>
      <Button>
        <Text>Create Room</Text>
      </Button>
      <Button onPress={() => this.props.navigation.navigate('JoinRoom', {title: 'Join Room'})}>
        <Text>Join Room</Text>
      </Button>
      {/* <Button><Text>Room3</Text></Button> */}
    </Container>);
  }
}
