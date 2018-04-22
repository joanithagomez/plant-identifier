import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Constants } from 'expo';

import Room from './Room'
import Person from './Person'

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json
const allplants = [ 'agave', 'bamboo', 'bird of paradise', 'bleeding hearts', 'blue thistle', 'california poppy', 'calla lily', 'cherry blossoms', 'crocus', 'daffodil', 'dahlia', 'daisy', 'fern', 'fly agaric', 'forsythia', 'foxgloves', 'gerbera', 'hibiscus', 'iris', 'lace leaf', 'lavender', 'orchid', 'persimmon', 'plumeria', 'poinsettia', 'protea', 'rose', 'snowdrop', 'sunflower', 'tulip'];

  var name ="The Garden";
  var time = "10:00";
  var points = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
  var people = [];
  
  var aroom = new Room(name, time, points, people); // 1. todo: replace with room sent from navigation
  var currentPerson = new Person(1, 'Pearl');
  
  var currentid = 1; // 2. todo: replace with current user id
  aroom.addPeople(currentPerson);   
    
export default class App extends Component {
  render() {


    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Classification Game</Text>
            <Text style={styles.header}>Room: {aroom.getRoomName()}</Text> // here aroom referenced
          </View>
          <Text style={styles.paragraph}>
            Try to correctly classify as many plants!
          </Text>
          <Card title="Submit Your Photos">
              <View>
                <TouchableOpacity style={styles.buttonSubmit} onPress={() => this.handleCamera(aroom, currentid)}>
                  <Text style={styles.buttonSubmitText}>Take a Photo</Text>
                </TouchableOpacity>
              </View>
            <Card title="Timer">
              <Text style={styles.paragraph}>
                 4:45 minutes
              </Text>
              <Text style={styles.paragraph}>
                 End Time: {aroom.getEndingTime()} 
              </Text>
            </Card>
          </Card>
          <Card title="Your Submissions" style={styles.cardStyle}>

            {this.renderPoints(aroom.getPerson(currentid))}
            
            <Card title="Your Points" style={styles.cardStyle}>
              <Text style={styles.paragraph}>
                 {aroom.getPerson(currentid).getTotalPoints()} pts
              </Text>
            </Card>
          </Card>
          <Card title="Leaderboard">
            {this.renderLeaderBoard(aroom)}
          </Card>
        </View>
      </ScrollView>
    );
  }
  
  handleCamera(room, currentid){
     // 3. todo: navigate to camera for id
     
     // 4. todo: add if-statement to check if user was correct, so we can award points for them
     // would get back that correctness in boolean? 
     var classified = 'plumeria'; // would also be passed the plant name
     this.awardPoints(classified, room, currentid); 
     this.forceUpdate();
     
     // 5. todo: update room obj in Firebase
  }
  
  awardPoints(plantname, room, currentid) {
    var i;
    for(i = 0; i < allplants.length; i++){
      if(allplants[i] === plantname){
        break;
      }
    }
    
    room.updatePersonPoints(currentid, plantname, i);
  }
  
  
  renderPoints(person){
    var arr = person.getPlants();
    if(arr.length == 0){
      return (
        <Text style={styles.paragraph}>
          Start Classifying Now!
        </Text>
      );
    }
    return arr.map(item => {
      return(
          <Text style={styles.paragraph}>
            {item}
          </Text>
        );
    });
  }
  
  renderLeaderBoard(room){
    return room.getPeople().map(item => {
      return(
          <Text style={styles.paragraph}>
            {item.getName()} - {item.getTotalPoints()} pts
          </Text>
        );
    });
  }
}

const styles = StyleSheet.create({
   buttonSubmit: {
    align: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'salmon',
    padding: 10,
    borderRadius: 10,
  },
  buttonSubmitText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardStyle: {
    padding: 500 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  header:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
