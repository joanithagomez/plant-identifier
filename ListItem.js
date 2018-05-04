import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableOpacity, 
  Alert,
  StyleSheet, 
} from 'react-native';
import * as firebase from 'firebase';
import Room from './Room'
import Person from './Person'

class ListItem extends Component {
  render() {
	var dialogTitle = 'Are you sure you want to join ' + this.props.task.name + "?";
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>
			Room: {this.props.task.name}
		</Text>
		<TouchableOpacity
          style={styles.joinButtonStyle}
		  onPress={() => {
            Alert.alert(
              dialogTitle,
              'Click OK to Join!',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {
					var item = this.props.task.obj;
					console.log("faith" + item.endingtime);
					console.log("hey"+item.people);
                    var tempUserId = 2; //  2. todo: replace w/ current user's id
                    var tempUsername = 'Faith'; // 3. todo: replace w/ current user's name
                    
					var temporaryRoom = new Room(item.roomname, item.endingtime, item.allpoints, item.people);
					var allpeople = [];
					var heyPromise = new Promise(function(resolve, reject) {
						database.ref("rooms").child(this.props.task._key).child("people").once('value').then(function(snapshot){
							snapshot.forEach((child)=> {
								var id1 = child.val().userid;
								allpeople.push(id1);
								
								if(allpeople.length === 1){
									resolve(allpeople);
								}
							});
						});
					});
					
					heyPromise.then(function(full){
						console.log(full);
					});
					
					if(!temporaryRoom.personExists(tempUserId)){
						var tempPerson = new Person(tempUserId, tempUsername);		
                       // 4. todo: update the room in Firebase
						var database = firebase.database();
						var tempPeople = item.people;
						tempPeople.push(tempPerson);
						database.ref("rooms").child(this.props.task._key).child("people").set(tempPeople);
						//database.ref("rooms").child(this.props.task._key).child("people").child(1).push(tempPerson);
                    }
                    
                    // 5. todo: navigate to game page and send the room as well
                    //this.props.navigation.navigate('GameRoom', {title: 'Game Room', key: this.props.task._key, room:item});

                  }

                },
              ],
              { cancelable: false }
            )
          }}
          >
          <Text style={styles.joinButtonTextStyle}>
            JOIN
          </Text>

        </TouchableOpacity>
	  </View>
    );
  }
}
const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
    joinButtonStyle:{
    margin: 5,
    padding: 10,
    alignItems: 'center',
	borderColor: '#c2f9cf',
    backgroundColor: "#45c6b5",
    },
    joinButtonTextStyle:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
  buttonStyle:{
    margin: 15,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#45c6b5',
    },
    buttonTextStyle:{
      color: 'white',
      // fontWeight: 'bold',
      fontSize: 25,
    },
	listView: {
    flex: 2,
  },
  listItem: {
    borderBottomColor: '#c2f9cf',
    borderColor: '#c2f9cf',
	backgroundColor: 'white',
    flexDirection:'row',
    alignItems:'center',
    borderWidth: 1,
    padding: 10,
	width: 300,
  },
  listItemTitle: {
    flex: 6,
    color: '#000',
    fontSize: 16,
	fontWeight: 'bold',
	padding: 5,
  },
  listItemAction: {
    flex: 2,
    width: 100,
    height: 40
  },
});
module.exports = ListItem;