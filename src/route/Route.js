import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import VisitorsLog from '../screens/VisitorsLog';
import News from '../screens/News';
import AddVisitor from '../screens/AddVisitor';
const Drawer = createDrawerNavigator();
const Route = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType={'slide'}>
        <Drawer.Screen name="Add Visitor" component={AddVisitor} />
        <Drawer.Screen name="VisitorsLog" component={VisitorsLog} />
        <Drawer.Screen name="Latest News" component={News} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Route;
