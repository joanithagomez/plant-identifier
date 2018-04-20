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
  }

  render() {
    // console.log("Property in BottomTab: ");
    // for(var property in this.props)
    //   console.log(property);

    return (
      <Container>
        <Home {...this.props}></Home>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('CameraScreen')}>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button active vertical onPress={() => this.props.navigation.navigate('Image')}>
              <Icon active name="navigate" />
              <Text>Gallery</Text>
            </Button>          
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
