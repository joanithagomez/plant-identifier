import React from "react";

import {Container, Text, Button, Label} from 'native-base';

export default class Game extends React.Component {
  static route = {
    navigationBar: {
      title: "Game"
    }
  };


  render() {
    return (
    <Container>
      <Button><Text>Create Room</Text></Button>
      <Button><Text>Room1</Text></Button>
      <Button><Text>Room2</Text></Button>
      <Button><Text>Room3</Text></Button>
    </Container>);
  }
}
