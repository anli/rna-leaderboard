import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';

const HomeScreenComponent = () => {
  return (
    <>
      <View>
        <Text>Home Screen</Text>
      </View>
    </>
  );
};

const HomeScreenOptions = {title: 'Home'};

const Stack = createStackNavigator();
const HomeStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreenComponent}
      options={HomeScreenOptions}
    />
  </Stack.Navigator>
);

export default HomeStackScreen;
