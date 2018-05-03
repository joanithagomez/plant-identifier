import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Alert, Image} from 'react-native';
import {Constants} from 'expo';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,ListItem,List,Thumbnail,Right,Body
} from 'native-base';

import Room from './Room'
import Person from './Person'

// or any pure javascript modules available in npm
import {Card} from 'react-native-elements'; //Version can be specified in package.json
const allplants = [
  'agave',
  'bamboo',
  'bird of paradise',
  'bleeding hearts',
  'blue thistle',
  'california poppy',
  'calla lily',
  'cherry blossoms',
  'crocus',
  'daffodil',
  'dahlia',
  'daisy',
  'fern',
  'fly agaric',
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

var name = "The Garden";
var time = "10:00";
var points = [
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10,
  10
];
var people = [];

var currentPerson = new Person(1, 'Pearl');

var currentid = 1; // 2. todo: replace with current user id

export default class GameRoom extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
     aroom: null,
    result: '',
    submitted: [],
    total: 0
  }

    componentDidMount(){
      const {room} = this.props.navigation.state.params; //room passed from navigation

      if(room) room.addPeople(currentPerson);
      console.log(room)

      this.setState({
        aroom: room
      });
    }

  renderSubmissions() {
    var arr = [];
    var submittedArray = this.state.submitted;
    if (!submittedArray) {
      return null;
    }

    submittedArray.forEach((element) => {
      // console.log("name: " + element.name + " img: " + element.imgurl );
      arr.push(<ListItem key={new Date().getTime()}>
        {element.imgurl && <Thumbnail square size={80} source={{ uri: element.imgurl }} />}
        <Body>
          <Text>{element.name}</Text>
        </Body>
        <Right>
          <Text note>10 pts</Text>
        </Right>
      </ListItem>);

    });
    return arr;
  }

  // returnData(res, img) { //callback function getting the recognition result and image url back
  //   this.setState({
  //     result: res,
  //     submitted: [
  //       res, ...this.state.submitted //new result is added to the existing array of submissions
  //     ]
  //   });
  // }


  handleCamera(room, currentid) {
    // 3. todo: navigate to camera for id
    var classified = '';
    this.props.navigation.navigate('CameraScreen', {
      returnData: (res, img) => { //callback function getting the recognition result and image url back
      this.setState({
        result: res,
        submitted: [
          {name: res, imgurl: img}, ...this.state.submitted//new result is added to the existing array of submissions along with the img url
        ],
      }, () => { //passing setState a 2nd parameter - a callback function to be triggered after the new state (result: res) has been set
        classified = this.state.result;  // would be passed the newly set result (plant name)

            // 4. todo: add if-statement to check if user was correct, so we can award points for them
            // would get back that correctness in boolean?

        this.awardPoints(classified, room, currentid);
        // 5. todo: update room obj in Firebase

      });
    }
  });

}

  awardPoints(plantname, room, currentid) {
    var i;
    for (i = 0; i < allplants.length; i++) {
      if (allplants[i] === plantname) {
        break;
      }
    }

    room.updatePersonPoints(currentid, plantname, i);
    this.setState({
      total: this.state.aroom.getPerson(currentid).getTotalPoints()
    })
  }

  renderPoints(person) {
    var arr = person.getPlants();
    if (arr.length == 0) {
      return (<Text style={styles.paragraph}>
        Start Classifying Now!
      </Text>);
    }
    return arr.map(item => {
      return (<Text key={'person' + item} style={styles.paragraph}>
        {item}
      </Text>);
    });
  }

  renderLeaderBoard(room) {
    return room.getPeople().map(item => {
      return (<Text key={'room' + item} style={styles.paragraph}>
        {item.getName()}
        - {item.getTotalPoints()}
        pts
      </Text>);
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
        {this.state.aroom && <Text style={styles.header}>{this.state.aroom.getRoomName()}</Text>}
        <Text style={styles.totalpoints}>
          <Image source={require('./leaf.png')}/>{this.state.total}
        </Text>

        <View style={styles.timer}>
          <Text style={styles.timeticker}>
            10:00
          </Text>
        </View>
        {this.state.aroom && <Text style={styles.paragraph}>
            End Time: {this.state.aroom.getEndingTime()}
         </Text>
       }
        <View>
        {this.state.aroom && <Button style={styles.buttonSubmit} onPress={() => this.handleCamera(this.state.aroom, currentid)}>
          <Text style={styles.buttonSubmitText}>Take a Photo</Text>
        </Button>}

        {/* {this.renderPoints(aroom.getPerson(currentid))} */}

        <Card title="Your Submissions" style={styles.cardStyle}>
          <List>
         {
            this.renderSubmissions()
              ? this.renderSubmissions()
              : <Text>''</Text>
          }
          </List>
        </Card>
      </View>
        {this.state.aroom && <Card title="Leaderboard" style={styles.cardStyle}>{this.renderLeaderBoard(this.state.aroom)}</Card>}
      </View>
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({

  container: {
    padding: Constants.statusBarHeight,
    backgroundColor: '#34282F'
  },
  header: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    // paddingTop: Constants.statusBarHeight
  },
  timer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    borderColor: 'white',
    borderWidth: 1
  },
  timeticker: {
    textAlign: 'center',
    color: 'white'
  },
  buttonSubmit: {
    justifyContent: 'center',
    width: 200,
    height: 60,
    backgroundColor: '#AACD6E',
    borderRadius: 2,
    // borderColor: 'black',
    // borderWidth: 2,
  },
  pointsbox:  {
    width: 'auto',
    height: 30,
    flexDirection: 'row'
  },
  buttonSubmitText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center'
  },
  cardStyle: {
    padding: 5,
    borderRadius: 50,
  },
  totalpoints:{
    color: 'white',
    fontSize: 24,
    fontWeight:'bold'
  },
  paragraph: {
    color: 'black',
    fontSize: 18,
    // fontWeight:'bold'
  }
});
