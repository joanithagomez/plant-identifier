import React from "react";
import {Container, Text, Button, Content} from 'native-base';
import {
  CameraRoll,
  StyleSheet,
  View,
  Image, 
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {Constants} from 'expo';
import JoinRoom from './JoinRoom';

export default class Game extends React.Component {
  static navigationOptions = {
        header: null
    }

  render() {
    return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.containerInner}>
					<Text style={styles.headingStyle}>❁ Create a Room to Play!... ❁</Text>
					<TouchableOpacity
						style={styles.button} 
						onPress={() => this.props.navigation.navigate('CreateRoom', {title: 'Create Room'})}
					>
						<Text style={styles.btnText}>Create a Room</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.containerBottom}>
				<Text style={styles.headingStyle}>❁ ...Or Choose a Room to Join! ❁</Text>
				<JoinRoom {...this.props}/>
			</View>
		</ScrollView>
	);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
	padding: Constants.statusBarHeight,
    backgroundColor: '#cbe86b',
	flex: 1,
  },
   containerBottom: {
    justifyContent: 'center',
    alignItems: 'center',
	padding: Constants.statusBarHeight,
	flex: 2,
  },
  containerInner: {
	marginTop: 50,
	marginBottom: 25,
  },  
  button: {
    alignItems: "center",
	borderColor: '#c2f9cf',
    backgroundColor: "#45c6b5",
    padding: 10,
    margin: 10,
  },
  btnText: {
    color: "white",
    fontSize: 15,
	padding: 15,
	fontWeight:'bold'
  },
  headingStyle: {
    color: 'black',
    fontSize: 20,
	fontWeight:'bold'
  },
});
