import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  Image,
  Alert,
  StyleSheet,
  Linking
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  H1,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body
} from 'native-base';

const initialArr = {
  'plumeria': {
    name: 'plumeria',
    wiki: 'plumeria'
  },
  'iris': {
    name: 'iris',
    wiki: 'iris (plant)'
  },
  'sunflower': {
    name: 'sunflower',
    wiki: 'Helianthus'
  },
  'persimmon': {
    name: 'persimmon',
    wiki: 'persimmon'
  },
  'hibiscus': {
    name: 'hibiscus',
    wiki: 'hibiscus'
  },
  'lavender': {
    name: 'lavender',
    wiki: 'Lavandula'
  },
  'daffodil': {
    name: 'daffodil',
    wiki: 'Narcissus (plant)'
  },
  'orchid': {
    name: 'orchid',
    wiki: 'Orchidaceae'
  },
  'agave': {
    name: 'agave',
    wiki: 'agave'
  },
  'daisy': {
    name: 'daisy',
    wiki: 'Asteraceae'
  },
  'tulip': {
    name: 'tulip',
    wiki: 'tulip'
  },
  'bamboo': {
    name: 'bamboo',
    wiki: 'bamboo'
  },
  'rose': {
    name: 'rose',
    wiki: 'rose'
  }
};
export default class PlantInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      image: null
    };
    // console.log("Props in plantinfo: " + this.props);
    // for(var property in this.props.navigation.state.params){
    //   console.log(property);
    // }
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    const itemWiki = params
      ? params.itemWiki
      : null;
    // console.log("itemWiki: " +this.props.navigation.state);
    const imageUri = itemWiki.image;
    var convertItemWikii = itemWiki.item;
    var urlWiki = initialArr[convertItemWikii].wiki;

    var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + urlWiki;
    return fetch(url).then(response => response.json()).then(responseJson => {
      var hey = responseJson.query.pages;

      var temp = hey;
      var count = 0;
      for (var prop in hey) {
        if (count == 0) {
          // object
          temp = prop;
        }
        count++;
      }
      var obj = [
        {
          "title": hey[temp].title,
          "info": hey[temp].extract
        }
      ];
      this.setState({image: imageUri, isLoading: false, dataSource: obj});
    }).catch(error => {
      console.error(error);
    });
  }

  render() {
    // console.log("Image uri in plantinfo: " + image);
    // console.log("datasource: " + this.state.dataSource);
    // console.log("Property in datasource: ");
    // for (var property in this.state.dataSource)
    //   console.log(property);

    if (this.state.isLoading) {
      return (<View style={{
          flex: 1,
          padding: 20
        }}>
        <ActivityIndicator/>
      </View>);
    }

    return (
       <Container >
         <Content>
      <Card style={{
          flex: 0
        }}>
        <CardItem header>
          <Left>
            {/* <Thumbnail source={{uri: this.state.image}} /> */}
            <H1>{this.state.dataSource[0].title}</H1>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={{
        uri: this.state.image
      }} style={{height: 200, width: 200, flex: 1}}/>

            <Text style={{paddingTop: 10}} >{this.state.dataSource[0].info}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{
                color: '#87838B'
              }} onPress={() => {
                var wikiUrl = 'https://en.wikipedia.org/wiki/' + this.state.dataSource[0].title;
                Linking.openURL(wikiUrl).catch(err => {
                  console.error('An error occurred', err),
                  alert('Sorry! Cannot open Wikipedia at this time!')
                });
              }}>
              <Text>Open Wikipedia to Read More!</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    </Content>
  </Container>);
  }
}
const styles = StyleSheet.create({
  imagecard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative'
  },
  container:{
    padding: 20
  }
});
