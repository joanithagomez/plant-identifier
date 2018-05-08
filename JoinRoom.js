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
 import ListItem from './ListItem.js';
import { Constants } from 'expo';
import Room from './Room'
import Person from './Person'
import {Container, Text, Spinner} from 'native-base';
import * as firebase from 'firebase';

export default class JoinRoom extends Component {
  static navigationOptions = {
    header: null
  }

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

    componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }


_renderItem(task) {
  return (
    <ListItem {...this.props} task={task} />
  );
}
listenForTasks(tasksRef) {
  tasksRef.on('value', (dataSnapshot) => {
    var tasks = [];
    dataSnapshot.forEach((child) => {
      tasks.push({
        name: child.val().roomname,
		obj: child.val(),
        _key: child.key
      });
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(tasks)
    });
  });
}

  render() {
    return (
      <View style={styles.container}>
	   <ToolbarAndroid
			  style={styles.navbar}
			  title="Room List" />
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listView}
		  />
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
});
