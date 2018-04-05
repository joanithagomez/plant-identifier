import React, { Component } from 'react';
import PlantInfo from './PlantInfo.js';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

const initialArr = [
  ('plumeria': {
    name: 'plumeria',
    wiki: 'plumeria',
  }),
  ('iris': {
    name: 'iris',
    wiki: 'iris (plant)',
  }),
  ('sunflower': {
    name: 'sunflower',
    wiki: 'Helianthus',
  }),
    ('persimmon': {
    name: 'persimmon',
    wiki: 'persimmon',
  }),
    ('hibiscus': {
    name: 'hibiscus',
    wiki: 'hibiscus',
  }),
    ('lavender': {
    name: 'lavender',
    wiki: 'Lavandula',
  }),
      ('daffodil': {
    name: 'daffodil',
    wiki: 'Narcissus (plant)',
  }),
        ('orchid': {
    name: 'orchid',
    wiki: 'Orchidaceae',
  }),
        ('agave': {
    name: 'agave',
    wiki: 'agave',
  }),
        ('daisy': {
    name: 'daisy',
    wiki: 'Asteraceae',
  }),
          ('tulip': {
    name: 'tulip',
    wiki: 'tulip',
  }),
          ('bamboo': {
    name: 'bamboo',
    wiki: 'bamboo',
  }),
          ('rose': {
    name: 'rose',
    wiki: 'rose',
  }),
];

export default class PlantList extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>

          {this.renderButtons()}

        </View>
      </ScrollView>
    );
  }
  renderButtons() {
    return initialArr.map(item => {
      return (
        <TouchableOpacity
          style={styles.buttonInfo}
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('PlantInfoPage', {itemWiki: {item}});
          }}>
          <Text style={styles.textInfo}>
            {item}
          </Text>

        </TouchableOpacity>
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ecf0f1',
    marginTop: 24,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  buttonInfo: {
    margin: 15,
    padding: 20,
    width: 175,
    fontWeight: 'bold',
    alignItems: 'center',
    borderRa: 'red',
    backgroundColor: 'steelblue',
  },
  textInfo: {
    fontSize: 18,
    color: 'white',
  },
});
