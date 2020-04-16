import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/parentStyle';
export default (props) => {
  return (
    <View style={styles.drawer}>
      <View style={internalStyle.iconView}>
        <TouchableOpacity onPress={props.navigation.toggleDrawer}>
          <Image
            tintColor={'white'}
            style={internalStyle.icon}
            resizeMode={'contain'}
            source={require('./../../assets/icons/menu.png')}
          />
        </TouchableOpacity>
      </View>

      <Text style={internalStyle.title}>{props.title}</Text>
    </View>
  );
};

const internalStyle = StyleSheet.create({
  iconView: {
    flex: 0.2,
    alignItems: 'center',
  },
  icon: {height: 30, width: 30},
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
