import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View, Text, Image} from 'react-native';
import styles from './../../styles/parentStyle';
import Header from '../../components/Header';
import {getNews} from './../../redux/actions/NewsAction';
import {LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class News extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getNews();
  }
  renderNews = ({item, index}) => {
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
          {item.urlToImage ? (
            <Image
              style={{
                height: 70,
                width: 70,
                borderRadius: 35,
                borderWidth: 1,
                borderColor: 'black',
              }}
              source={{uri: item.urlToImage}}
            />
          ) : (
            <Image
              style={{height: 70, width: 70, borderRadius: 35}}
              source={require('./../../assets/icons/account.png')}
            />
          )}
        </View>
        <View style={{flex: 0.75, padding: 5}}>
          {item.title ? (
            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
          ) : null}
          {item.author ? (
            <Text style={{fontSize: 12, color: 'grey'}}>{item.author}</Text>
          ) : null}
          {item.description ? (
            <Text style={{fontSize: 12}}>{item.description}</Text>
          ) : null}
        </View>
      </View>
    );
  };
  onRefresh = () => {
    this.props.getNews();
  };
  renderHeader = () => {
    return (
      <View style={{alignItems: 'center', backgroundColor: 'red'}}>
        <Text style={{color: 'white'}}>
          Feeds are not latest. Please check back again later.
        </Text>
      </View>
    );
  };
  render() {
    return (
      <>
        <Header title={'Latest News'} navigation={this.props.navigation} />
        {this.props.NewsReducer.isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <FlatList
            keyExtractor={(item) => item.description}
            ListHeaderComponent={
              this.props.NewsReducer.error ? this.renderHeader : null
            }
            refreshing={this.props.NewsReducer.isLoading}
            onRefresh={this.onRefresh}
            data={this.props.NewsReducer.news}
            renderItem={this.renderNews}
          />
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {NewsReducer: state.NewsReducer};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getNews}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(News);
