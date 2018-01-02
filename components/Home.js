import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Check out my Home Screen!</Text>
    <Button
      onPress={() => navigation.navigate('Game')}
      title="Start Game"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;