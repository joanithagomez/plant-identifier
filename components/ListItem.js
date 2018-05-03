import React, {
  Component
} from 'react';
import {
  View,
  Text,
  StyleSheet, 
} from 'react-native';

class ListItem extends Component {
  render() {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{this.props.task.name}</Text>
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
module.exports = ListItem;