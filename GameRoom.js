import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Alert, Image, TouchableHighlight} from 'react-native';
import {Constants} from 'expo';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,ListItem,List,Thumbnail,Right,Body
} from 'native-base';
//import * as firebase from 'firebase';
import firebase from './Firebase';
import Room from './Room'
import Person from './Person'
// import {ShareDialog} from 'react-native-fbsdk'
import {Share} from 'react-native';

// or any pure javascript modules available in npm
import {Card} from 'react-native-elements'; //Version can be specified in package.json
var database = firebase.database();
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



const shareLinkContent = {
  contentType: 'link',
  contentUrl: "https://facebook.com",
  contentDescription: 'Facebook sharing is easy!',
};

export default class GameRoom extends Component {
  static navigationOptions = {
    header: null
  }

	constructor(props) {
		super(props);

		const {key} = this.props.navigation.state.params; //room passed from navigation
		var user = firebase.auth().currentUser;
		var uid = user.uid;
		this.state = {
			aroom: null,
			aname: "Plant Room",
			atime: "0:00",
			apoints: [],
			apeople: [],
			result: '',
			submitted: [],
			total: 0,
			currentid: uid, // 2. todo: replace with current user id
		  }
	}

componentDidMount() {
	const {key} = this.props.navigation.state.params; //room passed from navigation
	var database = firebase.database();
	database.ref("rooms").child(key).on('value', (snapshot) => {
		this.setState({
			aname: snapshot.val().roomname,
			atime: snapshot.val().endingtime,
			apoints: snapshot.val().allpoints,
			apeople: snapshot.val().people
		});
		var tempPoints = 90;
		for(var i = 1; i < snapshot.val().people.length; i++){
			if(this.state.currentid == snapshot.val().people[i].userid){
				tempPoints = snapshot.val().people[i].totalPoints;
				break;
			}
		}
		this.setState({
			total: tempPoints,
		});
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

	var database = firebase.database();
	var tempPoints = 0;
	for(var i = 1; i < this.state.apeople.length && tempPoints == 0; i++){
		if(currentid == this.state.apeople[i].userid){
			console.log("again");
			tempPoints = this.state.apeople[i].totalPoints;
			tempPoints += this.state.apoints[0];
			this.state.apeople[i].totalPoints = tempPoints;
		}
	}

	this.setState({
	  total: tempPoints
	})
	const {key} = this.props.navigation.state.params;

	database.ref("rooms").child(key).child("people").child(currentid).child("totalPoints").set(tempPoints);

    //room.updatePersonPoints(currentid, plantname, i);
	/*
    this.setState({
      total: this.state.aroom.getPerson(currentid).getTotalPoints()
    })
	*/
  }

  shareLinkWithShareDialog() {
  var tmp = this;
  ShareDialog.canShow(this.state.shareLinkContent).then(
    function(canShow) {
      if (canShow) {
        return ShareDialog.show(tmp.state.shareLinkContent);
      }
    }
  ).then(
    function(result) {
      if (result.isCancelled) {
        alert('Share operation was cancelled');
      } else {
        alert('Share was successful with postId: '
          + result.postId);
      }
    },
    function(error) {
      alert('Share failed with error: ' + error.message);
    }
  );
}
/*
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
*/
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
    return room.map(item => {
		if(item.userid != 'null'){
      return (<Text key={'room' + item} style={styles.paragraph}>
        {item.name}
        - {item.totalPoints}
        pts
      </Text>);}
    });
	  /*
    return room.getPeople().map(item => {
      return (<Text key={'room' + item} style={styles.paragraph}>
        {item.getName()}
        - {item.getTotalPoints()}
        pts
      </Text>);
    });
	*/
  }
  timeLeft(end){
	var arr_end = end.split(":");
	var hour_end = parseInt(arr_end[0]);
	var min_end = parseInt(arr_end[1]);
	var d = new Date();
	var hour_diff = hour_end - d.getHours();
	var min_diff = min_end - d.getMinutes();
	if(min_diff < 0){
		hour_diff--;
		min_diff += 60;
	}

	return (60*hour_diff) + min_diff;
  }

  hasGameEnded(end){
	var message = "blah";
	var remainingTime = this.timeLeft(end);
	if(remainingTime <= 0){
		// game has ended
		message = 'GAME OVER! The winner is ' + this.whoWon() + '!';
		return (
		<View>
          <Text style={styles.timeticker}>
			  {message}
			</Text>
        </View>);
	}
	else{
		message = remainingTime + 'mins';
		return (
		<View style={styles.timer}>
          <Text style={styles.timeticker}>
			  {message}
			</Text>
        </View>);
	}
  }

  whoWon() {
	var max = 0;
	var winner = 'nobody';
	for(var i = 1; i < this.state.apeople.length; i++){
		if(max < this.state.apeople[i].totalPoints){
			max = this.state.apeople[i].totalPoints;
			winner = this.state.apeople[i].name;
		}
	}
	return winner;
  }

  _showResult(result){
    console.log(result)
  }

_shareTextMessage(){
console.log(this.state.total)
console.log(this.state.aname)
  Share.share({
      message: 'Winner is ' + this.whoWon() + ' with total points of: ' + this.state.total + ' pts!',
      title: this.state.aname
    })
    .then(this._showResult)
    .catch(err => console.log(err))
}



  render() {
	var currentid = this.state.currentid;

    return (
      <ScrollView>
        <View style={styles.container}>
        {this.state.aname && <Text style={styles.header}>{this.state.aname}</Text>}
        <Text style={styles.totalpoints}>
          <Image source={require('./leaf.png')}/>{this.state.total}
        </Text>

		{this.hasGameEnded(this.state.atime)}


        {this.state.aname && <Text style={styles.paragraph}>
            End Time: {this.state.atime}
         </Text>
       }
        <View>
        {this.state.aname && <Button style={styles.buttonSubmit} onPress={() => this.handleCamera(this.state.aname, currentid)}>
          <Text style={styles.buttonSubmitText}>Take a Photo</Text>
        </Button>}

        <View style={styles.container2}>
        <TouchableHighlight onPress={ () => this._shareTextMessage()}>
          <Text style={styles.button}>Share!</Text>
        </TouchableHighlight>
        </View>

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
        {this.state.apeople && <Card title="Leaderboard" style={styles.cardStyle}>{this.renderLeaderBoard(this.state.apeople)}</Card>}

      </View>
    </ScrollView>
  );
  }
}


const styles = StyleSheet.create({

  container: {
    padding: Constants.statusBarHeight,
    backgroundColor: '#7ac3e2'
  },
  container2: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#76c9f8',
 },
  button: {
    backgroundColor: '#76c9f8',
    padding: 10,
    margin: 10,
    borderRadius: 5
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
