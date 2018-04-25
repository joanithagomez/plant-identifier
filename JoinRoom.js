import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Constants } from 'expo';
import Room from './Room'
import Person from './Person'
export default class JoinRoom extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Join a Room!
        </Text>
        {this.renderRooms()}
      </View>
    );
  }

  renderRooms(){
    var name ="The Garden"
     var name1 ="Farming Elites"
    var time = "10:00";
    var points = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    var people = [];
    var aroom = new Room(name, time, points);
    var aroom1 = new Room(name1, time, points);

    var roomlist = [aroom, aroom1]; // 1. todo: get list of the rooms from FireBase

    return roomlist.map(item => {
      var dialogTitle = 'Are you sure to join' + item.toString() + '?';
      return(<TouchableOpacity
          key = {item}
          style={styles.buttonStyle}
          onPress={() => {
            Alert.alert(
              dialogTitle,
              'Click Join to Enter a Room',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {
                    var tempUserId = 1; //  2. todo: replace w/ current user's id
                    var tempUsername = 'Pearl'; // 3. todo: replace w/ current user's name
                    if(!item.personExists(tempUserId)){
                       var tempPerson = new Person(tempUserId, tempUsername);
                       item.addPeople(tempPerson);

                       // 4. todo: update the room in Firebase

                    }
                     // alert('added: ' + item.getPeople()); // this is a test that I can add a person obj to the room


                    // 5. todo: navigate to game page and send the room as well
                    this.props.navigation.navigate('GameRoom', {title: 'Game Room', room:item});

                  }

                },
              ],
              { cancelable: false }
            )
          }}>
          <Text style={styles.buttonTextStyle}>
            {item.toString()}
          </Text>

        </TouchableOpacity>);
    });
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  buttonStyle:{
    margin: 15,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'green',
    },
    buttonTextStyle:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 25,
    }
});
