import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>WHY GOD</Text>
        <Text>WHY HAST THOU FORSAKEN ME</Text>
        <Text>probably all the blasphemy</Text>
      </View>
    );
  }
}

const RootNavigator = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Home',
    },
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
