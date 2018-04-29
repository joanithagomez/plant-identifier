import React from "react";
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge
} from "native-base";
import Home from "./Home";
export default class BottomTab extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'home'
    };
  }

  render() {
    // console.log("Property in BottomTab: ");
    // for(var property in this.props)
    //   console.log(property);

    return (
      // <Container>
      // <Home {...this.props}></Home>
        <Footer>
          <FooterTab>
            <Button vertical active={this.state.selectedTab === 'home'} onPress={() => this.setState({selectedTab: 'home'})}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Game')}>
              <Icon name="md-game-controller-b" />
              <Text>Game</Text>
            </Button>
          </FooterTab>
         </Footer>
      // </Container>
    );
  }
}
