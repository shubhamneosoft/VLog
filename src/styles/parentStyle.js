import {StyleSheet, Dimensions} from 'react-native';
const dimensions = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawer: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    height: dimensions.height / 10,
    backgroundColor: '#4c8df5',
  },
});

export default styles;
