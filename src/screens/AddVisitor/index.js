import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import styles from '../../styles/parentStyle';
import Header from '../../components/Header';
import Input from '../../components/InputText';
import {addVisitor} from './../../redux/actions/VisitorsActions';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the API Reference... just some common use cases shown here

let radio_props = [
  {label: 'Meeting', value: 0},
  {label: 'Delivery', value: 1},
  {label: 'Personal', value: 2},
];

class AddVisitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      meetingType: '',
      person: '',
      show: false,
      entryTime: '',
      exitTime: '',
      val: 0,
      avatarSource: null,
      date: moment(new Date()).format('DD MMMM YYYY'),
    };
  }

  addVisitor = () => {
    let {
      name,
      email,
      meetingType,
      person,
      entryTime,
      exitTime,
      avatarSource,
    } = this.state;
    if (
      name &&
      email &&
      meetingType &&
      person &&
      entryTime &&
      exitTime &&
      avatarSource
    ) {
      this.props.addVisitor(this.state);
      Alert.alert(
        'VLog',
        'Logged successfully.',
        [
          {
            text: 'View logs',
            onPress: () => this.props.navigation.navigate('VisitorsLog'),
          },

          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      this.setState({
        name: '',
        email: '',
        meetingType: '',
        person: '',
        show: false,
        entryTime: '',
        exitTime: '',
        val: 0,
        avatarSource: null,
        date: moment(new Date()).format('DD MMMM YYYY'),
      });
    } else {
      alert('All fields are required.');
    }
  };
  openImagePicker = () => {
    const options = {
      title: 'Add Photo',
      allowsEditing: true,
      maxWidth: 150,
      maxHeight: 150,
      quality: 0.95,
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = {uri: 'data:image/png;base64,' + response.data};

        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  onMetingTypeChange = (val) => {
    switch (val) {
      case 0:
        this.setState({meetingType: 'Meeting'});
        break;
      case 1:
        this.setState({meetingType: 'Delivery'});
        break;
      case 2:
        this.setState({meetingType: 'Personal'});
        break;
      default:
        this.setState({meetingType: 'Meeting'});
    }
  };
  toggleTimePicker = (val) => {
    this.setState({
      show: !this.state.show,
      value: val,
    });
  };

  onChange = (time) => {
    console.log(time);
    if (this.state.value == 1) {
      this.setState({
        entryTime: moment(time.nativeEvent.timestamp).format('hh:mm a'),
        show: false,
      });
    } else if (this.state.value == 2) {
      this.setState({
        exitTime: moment(time.nativeEvent.timestamp).format('hh:mm a'),
        show: false,
      });
    }
  };
  render() {
    let {show, entryTime, exitTime, avatarSource} = this.state;
    console.log('state:', this.state);
    return (
      <>
        <Header title={'Add Visitor'} navigation={this.props.navigation} />
        <ScrollView
          contentContainerStyle={{alignItems: 'center', paddingVertical: 30}}>
          <TouchableOpacity
            onPress={this.openImagePicker}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderWidth: 1,
            }}>
            {avatarSource ? (
              <Image
                style={internalStyles.image}
                source={avatarSource}
                resizeMode={'contain'}
              />
            ) : (
              <Image
                style={[internalStyles.image, {tintColor: 'grey'}]}
                source={require('./../../assets/icons/add.png')}
                resizeMode={'contain'}
              />
            )}
          </TouchableOpacity>
          <Input
            onChange={(name) => this.setState({name})}
            placeholder={'Name'}
          />

          <Input
            placeholder={'Email'}
            onChange={(email) => this.setState({email})}
          />
          <View style={{width: '70%'}}>
            <Text style={{marginVertical: 10, fontWeight: 'bold'}}>
              Select Type of visit :
            </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              // formHorizontal={true}
              onPress={(value) => {
                this.onMetingTypeChange(value);
              }}
            />
          </View>
          <Input
            placeholder={'Person to visit'}
            onChange={(person) => this.setState({person})}
          />
          <View
            style={[
              internalStyles.timeContainer,
              {backgroundColor: '#cdcdcd', borderColor: 'grey'},
            ]}>
            <Text style={[internalStyles.label, {color: '#787878'}]}>
              Date of entry : {moment(new Date()).format('DD MMMM YYYY')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.toggleTimePicker(1)}
            style={internalStyles.timeContainer}>
            {entryTime ? (
              <Text>{entryTime}</Text>
            ) : (
              <Text>Select Entry time</Text>
            )}
            <Text>></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.toggleTimePicker(2)}
            style={internalStyles.timeContainer}>
            {exitTime ? <Text>{exitTime}</Text> : <Text>Select Exit time</Text>}
            <Text>></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.addVisitor}
            style={internalStyles.buttonContainer}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
          {show ? (
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          ) : null}
        </ScrollView>
      </>
    );
  }
}

const internalStyles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#4c8df5',
    width: '40%',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
  },
  label: {},
  timeContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: '70%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 80,
    width: 80,
    // tintColor: 'grey',
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addVisitor}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AddVisitor);
