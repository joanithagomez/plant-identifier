import React from "react";
import {StyleSheet} from "react-native";
import {Container, Text, Spinner, Button} from 'native-base';
import PlantInfo from "./PlantInfo";


export default class Guess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsArr: [],
      isLoading: true
    }
  }

  componentDidMount() {

    var labels = [
      'plumeria',
      'iris',
      'sunflower',
      'persimmon',
      'hibiscus',
      'lavender',
      'daffodil',
      'orchid',
      'agave',
      'daisy',
      'tulip',
      'bamboo',
      'rose'
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
        this.setState({
          optionsArr: finalOptionsArr,
          isLoading: false,
        });

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

  render() {

    if (this.state.isLoading) {
      return (<Container style={styles.container}>
        <Spinner color='green'/>
      </Container>);
    }

    return (<Container>
      <Text style={styles.title}>What's your best guess?
      </Text>
      <Button style={{
          marginTop: 10,
        }} rounded full primary={true}>
        <Text style={{
            color: 'white'
          }}>{this.state.optionsArr[0]}</Text>
      </Button>
      <Button style={{
          marginTop: 10 }} full rounded primary={true} onPress={() => {
          this._goToInfoscreen(this.props.option, this.props.imageUri);
        }}>
        <Text style={{
            color: 'white'
          }}>{this.state.optionsArr[1]}</Text>
      </Button>
      <Button style={{
          marginTop: 10 }} full rounded primary={true}>
        <Text style={{
            color: 'white'
          }}>{this.state.optionsArr[2]}</Text>
      </Button>
    </Container>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
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
