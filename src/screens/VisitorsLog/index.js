import React, {Component} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {View, Text, Image} from 'react-native';
import styles from '../../styles/parentStyle';
import Header from '../../components/Header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class VisitorsLog extends Component {
  constructor(props) {
    super(props);
  }
  renderVisitorData = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,

          backgroundColor: '#efefef',
          borderRadius: 2,
          elevation: 3,
          margin: 2,
        }}>
        <View
          style={{
            flex: 0.25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {item.avatarSource ? (
            <Image
              style={{
                height: 70,
                width: 70,
                borderRadius: 35,
                borderWidth: 1,
                borderColor: 'black',
              }}
              source={item.avatarSource}
            />
          ) : (
            <Image
              style={{height: 70, width: 70, borderRadius: 35}}
              source={require('./../../assets/icons/account.png')}
            />
          )}
        </View>
        <View style={{flex: 0.75, padding: 5}}>
          {item.name ? (
            <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          ) : null}
          {item.email ? (
            <Text style={{fontSize: 12, color: 'grey'}}>{item.email}</Text>
          ) : null}
          {item.entryTime && item.exitTime ? (
            <Text style={{fontSize: 12}}>
              From {item.entryTime} To {item.exitTime}
            </Text>
          ) : null}
          {item.date ? (
            <Text style={{fontSize: 12}}>On {item.date}</Text>
          ) : null}
          {item.meetingType ? (
            <Text style={{fontSize: 12}}>For {item.meetingType}</Text>
          ) : null}
          {item.person ? (
            <Text style={{fontSize: 12}}>Person to visit : {item.person}</Text>
          ) : null}
        </View>
      </View>
    );
  };
  render() {
    return (
      <>
        <Header title={'Visitors Log'} navigation={this.props.navigation} />
        <FlatList
          data={this.props.VisitorsReducer.visitors.reverse()}
          renderItem={this.renderVisitorData}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {VisitorsReducer: state.VisitorsReducer};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(VisitorsLog);
