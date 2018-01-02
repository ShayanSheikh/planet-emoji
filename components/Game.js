import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { emojis } from '../utils/emojis';
var _ = require('lodash');

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: emojis,
      curr: {},
      score: 0,
      guess: '',
      message: ""
    }
    this.pickRandomQuestion = this.pickRandomQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  restartGame() {
    let ind = this.pickRandomQuestion(this.state.emojis);
    this.setState({ curr: this.state.emojis[ind], emojis: this.state.emojis.slice(0, ind).concat(this.state.emojis.slice(ind+1)) });
  };

  pickRandomQuestion(arr) {
    return Math.floor(Math.random() * arr.length);
  };

  componentDidMount() {
    this.restartGame();
  };

  handleSubmit() {
    let guess = this.state.guess.replace(/\W+/g, " ").toLowerCase();
    let result = (guess === this.state.curr.answer);
    this.restartGame();

    this.setState({ guess: '', score: (result) ? this.state.score+10 : this.state.score })
  }

  handleChange(guess) {
    this.setState({ guess });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {
            this.state.emojis.length && this.state.curr.question
          }
        </Text>
        <Text> Score: { this.state.score } </Text>
        <TextInput
          onChangeText={(guess) => this.handleChange(guess)}
          value={this.state.guess}
          placeholder="Guess"
        />
        <Button
          onPress = {this.handleSubmit}
          title = "Submit Guess"
        />
        <Button
          onPress = {this.restartGame}
          title = "Give up like a lil bitch"
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#AAA',
    justifyContent: 'center'
  }
})