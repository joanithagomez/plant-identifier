import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Constants } from 'expo';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class App extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Check out what other people are classifying! 
          </Text>
          <Card title="Pearl's Recent Classification">
            <Image source={require('./flower1.jpg')} style={styles.imgStyle}/>
            <Text style={styles.subheader}>
              Sunflower
            </Text>
          </Card>
          <Card title="Pearl's Recent Classification">
            <Image source={require('./flower1.jpg')} style={styles.imgStyle}/>
            <Text style={styles.subheader}>
              Sunflower
            </Text>
          </Card>
          <Card title="Pearl's Recent Classification">
            <Image source={require('./flower1.jpg')} style={styles.imgStyle}/>
            <Text style={styles.subheader}>
              Sunflower
            </Text>
          </Card>
        </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
    subheader: {
    margin: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
    imgStyle: {
    width: 300,
    height: 300
  },
});
