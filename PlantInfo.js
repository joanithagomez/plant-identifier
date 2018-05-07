import React from 'react';
import {View, Image, Alert, StyleSheet, Linking} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  H1,
  Spinner,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body
} from 'native-base';
const initialArr = {
  'plumeria': {
    wiki: 'plumeria'
  },
  'iris': {
    wiki: 'iris (plant)'
  },
  'sunflower': {
    wiki: 'Helianthus'
  },
  'persimmon': {
    wiki: 'persimmon'
  },
  'hibiscus': {
    wiki: 'hibiscus'
  },
  'lavender': {
    wiki: 'Lavandula'
  },
  'daffodil': {
    wiki: 'Narcissus (plant)'
  },
  'orchid': {
    wiki: 'Orchidaceae'
  },
  'agave': {
    wiki: 'agave'
  },
  'daisy': {
    wiki: 'Asteraceae'
  },
  'tulip': {
    wiki: 'tulip'
  },
  'bamboo': {
    wiki: 'bamboo'
  },
  'rose': {
    wiki: 'rose'
  },
  'bird of paradise': {
    wiki: 'bird of paradise'
  },
  'bleeding hearts': {
    wiki: 'bleeding hearts'
  },
  'blue thistle': {
    wiki: 'blue thistle'
  },
  'california poppy': {
    wiki: 'california poppy'
  },
  'calla lily': {
    wiki: 'calla lily'
  },
  'cherry blossoms': {
    wiki: 'cherry blossoms'
  },
  'crocus': {
    wiki: 'crocus'
  },
  'dahlia': {
    wiki: 'dahlia'
  },
  'fern': {
    wiki: 'fern'
  },
  'fly agaric': {
    wiki: 'Amanita muscaria'
  },
  'forsythia': {
    wiki: 'forsythia'
  },
  'foxgloves': {
    wiki: 'digitalis'
  },
  'gerbera': {
    wiki: 'gerbera'
  },
  'lace leaf': {
    wiki: 'Anthurium'
  },
  'poinsettia': {
    wiki: 'poinsettia'
  },
  'protea': {
    wiki: 'protea'
  },
  'snowdrop': {
    wiki: 'snowdrop'
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
    // for (var property in itemWiki)
    //   console.log(property);

    const imageUri = itemWiki.image;
    var convertItemWikii = itemWiki.item;
    // console.log(convertItemWikii);
    // console.log(initialArr[convertItemWikii].wiki);
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
        return (<Container style={{flex: 1, padding:20 }}>
          <Spinner color='green'/>
        </Container>);
    }

    return (
       <Container style={{backgroundColor:'#BFF165'}}>
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
            <Button transparent textStyle={{
                color: '#87838B'
              }} onPress={() => {
                var shopUrl = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords='+ this.state.dataSource[0].title;
                Linking.openURL(shopUrl).catch(err => {
                  console.error('An error occurred', err),
                  alert('Sorry! Cannot open Amazon at this time!')
                });
              }}>
              <Text>Buy it</Text>
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
