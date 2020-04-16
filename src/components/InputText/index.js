import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import {  } from "react-native-gesture-handler";

const {width, height} = Dimensions.get('window');

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onValueChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    return (
      <View style={[styles.container]}>
        <TextInput
          onChangeText={this.onValueChange}
          placeholder={
            this.props.placeholder ? this.props.placeholder : 'Placeholder Text'
          }
          multiline={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: 50,
    flexDirection: 'row',

    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginVertical: 15,
  },
  icon: {
    height: 20,
    width: 20,
  },
});
