import React from "react";
import {StyleSheet, Image, View} from "react-native";
import {Container, Text, Spinner, Button} from 'native-base';
import PlantInfo from "./PlantInfo";

export default class Guess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsArr: [],
      isLoading: true,
      selection: 'none',

    }
  }

  componentDidMount() {
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

    // console.log("Labels array: " + labels);
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
    if(selected === this.props.option){
      this.setState({
        selection: selected
      });
    }
    //todo: go to next page after some time
      this._goToInfoscreen(this.props.option, this.props.imageUri);

  }

  getColor(optionName){
    if(this.state.selection === optionName){
      return styles.greenButton;
    }else
      return styles.button;
  }
  render() {

    if (this.state.isLoading) {
      return (<Container style={styles.container}>
        <Spinner color='green'/>
      </Container>);
    }


    return (<Container style={styles.container}>
      {(this.props.imageUri) && <Image source = {{uri: this.props.imageUri}} style={styles.image}/>}
      <Text style={styles.title}>What's your best guess?
      </Text>
      <Button style={this.getColor(this.state.optionsArr[0])} onPress={() => this.handleSelection(this.state.optionsArr[0])} full rounded>
          <Text style={{
            color: 'white'
          }}>{this.state.optionsArr[0]}</Text>
      </Button>
      <Button style={this.getColor(this.state.optionsArr[1])} onPress={() => this.handleSelection(this.state.optionsArr[1])} full rounded >
        <Text style={{
            color: 'white'
          }}>{this.state.optionsArr[1]}</Text>
      </Button>
      <Button style={this.getColor(this.state.optionsArr[2])} onPress={() => this.handleSelection(this.state.optionsArr[2])} full rounded>
      <Text style={{
            color: 'white'
          }}>{this.state.optionsArr[2]}</Text>
      </Button>

      <Button transparent full rounded style={{marginTop: 40}}
        onPress={() => {
          // console.log(this.props.option)
          this._goToInfoscreen(this.props.option, this.props.imageUri);
        }}>
          <Text>Skip to answer</Text>
        </Button>
    </Container>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#cbe86b",
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  greenButton:{
    backgroundColor: '#007830',
  },
  redButton:{
    backgroundColor: 'red'
  },
  button: {
    backgroundColor: '#34282F',
    marginTop: 10
  },
  image: {
    marginTop: 20,
    width: 150,
    height: 100
  },
});

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
