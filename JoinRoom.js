import React, { Component } from 'react';
import {  
View, 
StyleSheet, 
TouchableOpacity, 
Alert,
AppRegistry,
  ListView,
  ToolbarAndroid
 } from 'react-native';
 import ListItem from './components/ListItem.js';
import { Constants } from 'expo';
import Room from './Room'
import Person from './Person'
import {Container, Text, Spinner} from 'native-base';
import * as firebase from 'firebase';

export default class JoinRoom extends Component {
	/*
  constructor(props){
    super(props);
	this.database = firebase.database();
	this.roomlist = [];
	this.tasksRef = this.database.ref("rooms");
	
	firebase.database().ref("rooms").once('value').then(snap => snap.val()).then(items => {
		console.log('items ', items);
		this.roomlist.push(items);
	});
	
  }
*/
constructor(props) {
    super(props);
    this.tasksRef = firebase.database().ref("rooms");
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource
    };
  }
_renderItem(task) {
  return (
    <ListItem task={task} />
  );
}
listenForTasks(tasksRef) {
  tasksRef.on('value', (dataSnapshot) => {
    var tasks = [];
    dataSnapshot.forEach((child) => {
      tasks.push({
        name: child.val().roomname,
        _key: child.key
      });
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(tasks)
    });
  });
}

  componentDidMount() {
  // start listening for firebase updates
  this.listenForTasks(this.tasksRef);
}

  render() {
    return (
      <View style={styles.container}>
   <ToolbarAndroid
          style={styles.navbar}
          title="Todo List" />
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listView}/>
      </View>
    );
  }
  /*
  render() {
    return (
      <Container>
        <Text style={styles.paragraph}>
          Join a Room!
        </Text>
        {this.renderlist();}
      </Container>
    );
  }
  */
 /*
renderlist = () =>{
	return firebase.database().ref("rooms").once('value').then(snap => snap.val()).then(items => {
				return(  <Text style={styles.buttonTextStyle}>
					{items.getName()}
			</Text>);
			});
}
  renderRooms = () => {
    return this.roomlist.map(item => {
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
*/

}

const styles = StyleSheet.create({
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
      // fontWeight: 'bold',
      fontSize: 25,
    },
	listView: {
    flex: 1,
  },
  listItem: {
    borderBottomColor: '#eee',
    borderColor: 'gray',
    flexDirection:'row',
    alignItems:'center',
    borderWidth: 1,
    padding:20
  },
  listItemTitle: {
    flex: 6,
    color: '#000',
    fontSize: 16,
  },
  listItemAction: {
    flex: 1,
    width: 40,
    height: 40
  },
});
