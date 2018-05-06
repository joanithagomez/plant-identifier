import React from "react";
import {StyleSheet, Image, View} from "react-native";
import {Container, Text, Spinner, Card, Button} from 'native-base';
import PlantInfo from "./PlantInfo";
import Firebase from "./Firebase";
import * as firebase from 'firebase';
var database = firebase.database();
var usersRef = database.ref().child('users');

export default class Guess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsArr: [],
      isLoading: true,
      selection: 'none',
      showAnswer: false,
      total: null,
      numCorrect: null,
      userId: null
    }
  }
  componentDidMount() {
    var user = firebase.auth().currentUser;
    if (user) {

      console.log("User in Guessing component: " + user.uid)
      database.ref("users/" + user.uid).once("value").then((snapshot) => {
        console.log(snapshot.val());
        this.setState({userId: user.uid, numCorrect: snapshot.val().numCorrect, total: snapshot.val().totalIdentified});
      });

    }

    var labels = [
      'agave',
      'bamboo',
      'bird of paradise',
      'bleeding hearts ',
      'blue thistle ',
      'california poppy',
      'calla lily ',
      'cherry blossoms',
      'crocus ',
      'daffodil',
      'dahlia',
      'daisy',
      'fern',
      'fly agaric ',
      'forsythia',
      'foxgloves',
      'gerbera',
      'hibiscus',
      'iris',
      'lace leaf',
      'lavender',
      'orchid',
      'persimmon',
      'plumeria',
      'poinsettia',
      'protea',
      'rose',
      'snowdrop',
      'sunflower',
      'tulip'
    ];

    //remove answer from labels array so that one of the 2 random elements picked are not the answer
    var dupLabels = labels;
    var index = dupLabels.indexOf(this.props.option);
    if (index > -1) {
      dupLabels.splice(index, 1);
    }
    //shuffle the array and pick the first to elements from array and set as option 1 and 2
    var arr = shuffleArray(dupLabels);

    var finalOptionsArr = shuffleArray([arr[0], arr[1], this.props.option]);
    // console.log("shuffled: " + finalOptionsArr + ".");
    if (finalOptionsArr.length === 3)
      this.setState({optionsArr: finalOptionsArr, isLoading: false});

    }

  _goToInfoscreen = (name, image) => {
    // console.log("Name going to _goToInfoscreen: " + name);
    this.props.navigation.navigate('PlantInfoPage', {
      itemWiki: {
        item: name,
        image: image
      }
    });
  };

  handleSelection(selected) {

    // if the answer is right, set new state of numCorrect, and update the value in database after setting state
    if (this.isAnswer(selected)) {

      this.setState((prevState) => {
        return {numCorrect: prevState.numCorrect + 1};
      }, () => {
        var userRef = usersRef.child(this.state.userId + '');
        userRef.update({"numCorrect": this.state.numCorrect});
      });
    }

    //in any case set new state of total, and update the value in database after setting state
    this.setState((prevState) => {
      return {total : prevState.total + 1};
    }, () => {
      var userRef = usersRef.child(this.state.userId + '');
      userRef.update({"totalIdentified": this.state.total});
    });

    this._goToInfoscreen(this.props.option, this.props.imageUri);
  }

  isAnswer = (selection) => {
    return (selection === this.props.option);
  };

  getColor(optionName) {
    if (this.state.selection === optionName) {
      return styles.greenButton;
    } else
      return styles.button;
    }

  //if showAnswer, change answer to greenButton
  //if showAnswer = true and button not equal to answer, change button to red
  render() {

    if (this.state.isLoading) {
      return (<Container style={styles.container}>
        <Spinner color='green'/>
      </Container>);
    }

    return (<Container style={styles.container}>
      {
        (this.props.imageUri) && <Image source={{
              uri: this.props.imageUri
            }} style={styles.image}/>
      }
      <Text style={styles.title}>What's your best guess?
      </Text>
      <Button full rounded style={this.getColor(this.state.optionsArr[0])} onPress={() => this.handleSelection(this.state.optionsArr[0])} >
        <Text style={{
            color: 'white'
          }}>{this.state.optionsArr[0]}</Text>
      </Button>
      <Button full rounded style={this.getColor(this.state.optionsArr[1])} onPress={() => this.handleSelection(this.state.optionsArr[1])} >
        <Text style={{
            color: 'white'
          }}>{this.state.optionsArr[1]}</Text>
      </Button>
      <Button full rounded style={this.getColor(this.state.optionsArr[2])} onPress={() => this.handleSelection(this.state.optionsArr[2])} >
        <Text style={{
            color: 'white'
          }}>{this.state.optionsArr[2]}</Text>
      </Button>

      <Button transparent full rounded style={{
          marginTop: 40
        }} onPress={() => {
          // console.log(this.props.option)
          this._goToInfoscreen(this.props.option, this.props.imageUri);
        }}>
        <Text>Skip to answer</Text>
      </Button>

      <Text>{this.state.numCorrect}/ {this.state.total}</Text>
    </Container>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#cbe86b",
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  greenButton: {
    backgroundColor: '#007830',
    marginTop: 10
  },
  redButton: {
    backgroundColor: 'red',
    marginTop: 10
  },
  button: {
    backgroundColor: '#34282F',
    margin: 10,
    height: 80
  },
  image: {
    marginTop: 20,
    width: 150,
    height: 100
  }
});

function writeUserData(userId) {
  firebase.database().ref('users/' + userId).set({numCorrect: numCorrect, totalIdentified: total});
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [
      array[i], array[j]
    ] = [
      array[j], array[i]
    ];
  }
  return array;
}
