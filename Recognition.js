import React, {Component} from "react";
import { CameraRoll, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";
// import PlantInfo from "./PlantInfo";
import Guess from "./Guess";

export default class Recognition extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true , answer: "", image: null};
    // console.log("Props in recognition: " + this.props);
    // for(var property in this.props.navigation.state.params){
    //   console.log(property);
    // }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    // console.log("Params: " + params);
    // for(var property in params){
    //   console.log(property);
    // }
    const result = params ? params.result : null;
    const image = params ? params.image : null;
    // console.log("image: " + image);
    // console.log("Result: " + result);
    if(result){
      this.setState({
        image: image,
        answer: result,
        isLoading:false
      });
    }
  }
render(){
  if (this.state.isLoading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return(
    <View style={styles.container}>
      {(this.state.image) &&<Image source={{uri: this.state.image}} style={styles.image} />}
      {(this.state.answer) !== "" && <Guess option={this.state.answer} {...this.props}></Guess>}
    </View>
  );

  }
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    image: {
      width: 150,
      height: 100
    },
  });
