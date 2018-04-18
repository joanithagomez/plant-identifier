import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, Alert, ScrollView, Linking } from 'react-native';
const initialArr = {
  'plumeria': {
    name: 'plumeria',
    wiki: 'plumeria',
  },
  'iris': {
    name: 'iris',
    wiki: 'iris (plant)',
  },
  'sunflower': {
    name: 'sunflower',
    wiki: 'Helianthus',
  },
    'persimmon': {
    name: 'persimmon',
    wiki: 'persimmon',
  },
    'hibiscus': {
    name: 'hibiscus',
    wiki: 'hibiscus',
  },
    'lavender': {
    name: 'lavender',
    wiki: 'Lavandula',
  },
      'daffodil': {
    name: 'daffodil',
    wiki: 'Narcissus (plant)',
  },
        'orchid': {
    name: 'orchid',
    wiki: 'Orchidaceae',
  },
        'agave': {
    name: 'agave',
    wiki: 'agave',
  },
        'daisy': {
    name: 'daisy',
    wiki: 'Asteraceae',
  },
          'tulip': {
    name: 'tulip',
    wiki: 'tulip',
  },
          'bamboo': {
    name: 'bamboo',
    wiki: 'bamboo',
  },
          'rose': {
    name: 'rose',
    wiki: 'rose',
  },
};
export default class PlantInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    // const { params } = this.props.navigation.state;
    // const itemWiki = params ? params.itemWiki : null;
    const itemWiki = this.props.itemWiki;
    console.log(itemWiki);
    var convertItemWikii = itemWiki.item;
    var urlWiki = initialArr[convertItemWikii].wiki;

    var url =
      'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + urlWiki;
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
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
            "title" : hey[temp].title,
            "info" : hey[temp].extract
          }
        ];
        this.setState(
          {
            isLoading: false,
            dataSource: obj,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView>
      <View style={{ flex: 1, paddingTop: 20 }}>
        <View style={{backgroundColor: 'skyblue', paddingTop: 10, }}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item}) => <Text style={{fontSize:30, fontWeight: 'bold'}}>{item.title}</Text>}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View style={{ backgroundColor: 'powderblue', paddingTop: 10}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item}) => <Text>{item.title}: {item.info}</Text>}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item}) => <Button
            title="Open Wikipedia to Read More!"
              onPress={() => {
                var wikiUrl = 'https://en.wikipedia.org/wiki/' + item.title;
               Linking.openURL(wikiUrl).catch(err => {console.error('An error occurred', err), alert('Sorry! Cannot open Wikipedia at this time!')});

              }}
          />

            }
            keyExtractor={(item, index) => index}
          />


        </View>
      </View>
      </ScrollView>
    );

  }

}
