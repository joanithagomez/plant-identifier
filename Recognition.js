import React, {Component} from "react";
import { CameraRoll, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from "expo";
import {Container, Spinner} from 'native-base';
import Guess from "./Guess";

export default class Recognition extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true , result: "", image: null};
    // console.log("Props in recognition: " + this.props);
    // for(var property in this.props.navigation.state.params){
    //   console.log(property);
    // }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const res = params ? params.result : null;
    const image = params ? params.image : null;
    if(res && image){
      this.setState({
        image: image,
        result: res,
        isLoading:false
      });
    }
  }
render(){
  if (this.state.isLoading) {
      return (<Container style={{flex: 1, padding:20 }}>
        <Spinner color='green'/>
      </Container>);
  }

  return(
    <View style={styles.container}>
      {/* {(this.state.image) &&<Image source={{uri: this.state.image}} style={styles.image} />} */}
      {(this.state.result !== "") && (this.state.image) && <Guess imageUri= {this.state.image} option={this.state.result} {...this.props}></Guess>}
    </View>
  );

  }
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    image: {
      width: 150,
      height: 100
    },
  });
