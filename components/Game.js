import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { emojis } from '../utils/emojis';
const image = require('../assets/globe.png');
var _ = require('lodash');

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: emojis,
      curr: {},
      score: 0,
      guess: '',
      message: "Make a guess!",
      active: true
    }
    this.pickRandomQuestion = this.pickRandomQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.advanceGame = this.advanceGame.bind(this);
  }

  advanceGame() {
    let ind = this.pickRandomQuestion(this.state.emojis);
    let active = (this.state.emojis.length !== 0);
    if(active) {
      this.setState({ curr: this.state.emojis[ind], emojis: this.state.emojis.slice(0, ind).concat(this.state.emojis.slice(ind+1))});
    } else {
      this.setState({ active })
    }

  }

  restartGame() {
    let ind = this.pickRandomQuestion(emojis);
    let curr = emojis[ind];
    console.log(curr)
    this.setState({ curr, emojis: emojis.slice(0, ind).concat(emojis.slice(ind+1)), score: 0, message: "Make a guess!", active: true});
  }

  pickRandomQuestion(arr) {
    return Math.floor(Math.random() * (arr.length - 1));
  }

  componentDidMount() {
    this.restartGame();
  }

  handleSubmit() {
    let guess = this.state.guess.replace(/\W+/g, " ").toLowerCase();
    let result = (guess === this.state.curr.answer);
    if(result) this.advanceGame();
    this.setState({ guess: '', score: (result) ? this.state.score+10 : this.state.score, message: (result) ? "Correct! Next question..." : "Nope, you're terrible at this." });
  }

  handleChange(guess) {
    this.setState({ guess });
  }

  render() {
    if(this.state.active) {
      return (
          <View style={styles.container}>
            <Image source={image} style={styles.image}/>
            <View style={styles.centerer}>
              <View style={styles.gameInfo}>
                <Text style={{textAlign: 'center'}}>
                  {this.state.message}
                </Text>
                  <Text style={{textAlign: 'center'}}>
                    {
                      this.state.curr.question
                    }
                  </Text>
                  <Text style={{textAlign: 'center'}}> Score: { this.state.score } </Text>
                </View>
                <View style={styles.gamePlay}>
                  <TextInput
                    style={{textAlign: 'center'}}
                    onChangeText={(guess) => this.handleChange(guess)}
                    value={this.state.guess}
                    placeholder="Guess"
                  />
                  <Button
                    color="green"
                    onPress = {this.handleSubmit}
                    title = "Submit Guess"
                  />
                </View>
                <View style={styles.gameManager}>
                  <Button
                    color="red"
                    onPress = {this.restartGame}
                    title = "Give up like a lil bitch"
                  />
                </View>
            </View>
          </View>
      )
    } else {
        return (
          <View>
            <View style={styles.gameInfo}>
              <Text style={{textAlign: 'center'}}>
                You Win!
              </Text>
              <Button
                onPress = {this.restartGame}
                title = "Restart"
              />
            </View>
          </View>
        )
      }

  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(185, 185, 185, .5)',
    justifyContent: 'center'
  },
  gameInfo: {
    margin: 5,
    backgroundColor: 'rgba(185, 185, 185, .75)'
  },
  gamePlay:{
    margin: 5,
    backgroundColor: 'rgba(185, 185, 185, .75)'
  },
  gameManager: {
    margin: 5,
    backgroundColor: 'rgba(185, 185, 185, .75)'
  },
  image: {
    zIndex: -10,
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  centerer: {
    bottom: 50 + "%"
  }
})
