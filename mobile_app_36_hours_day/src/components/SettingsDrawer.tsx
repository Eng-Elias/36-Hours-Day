import * as React from 'react';
import {IconButton, Drawer as PaperDrawer} from 'react-native-paper';
import {Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();

export const screens = {
  home: 'Home',
};

function DrawerContent() {
  return (
    <PaperDrawer.Section title="Start Hour">
      <Text>Drawer Content</Text>
    </PaperDrawer.Section>
  );
}

const SettingsDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        drawerStyle: {
          backgroundColor: Colors.darker,
        },
      })}
      initialRouteName={screens.home}
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name={screens.home} component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default SettingsDrawer;
