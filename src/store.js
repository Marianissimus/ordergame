import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screen: 'scores',
    levels: {
    // name?
    letters: {
      list: ['A', 'B', 'C', 'D'],
      scores: []
    }
   },
   lastScore: 0,
   scoremode: 'start',
   message: '',
   subtitle: '',
   scores: [
      {
        name: 'Alex',
        value: 20
      },
      {
        name: 'Miki',
        value: 34
      },
      {
        name: 'Mary',
        value: 18
      },
      {
        name: 'John',
        value: 23
      },
      {
        name: 'John',
        value: 24
      },
      {
        name: 'Sohn',
        value: 25
      },
      {
        name: 'Ror',
        value: 33
      },
      {
        name: 'AAA',
        value: 3
      },
      {
        name: 'sss',
        value: 22
      },
      {
        name: 'sdhn',
        value: 23
      },
      {
        name: 'Jhn',
        value: 43
      }
    ],
  },
  mutations: {
    setScore(state, score) {
      state.scores.unshift(score)
    },
    setScoreMode(state, mode){
      state.scoremode = mode
    },
    updateScores(state, scores) {
      state.scores = scores
    },
    setScreen(state, screen) {
      state.screen = screen
    },
    setMessage(state, message){
      state.message = message
    },
    setSubtitle(state, subtitle){
      state.subtitle = subtitle
    }
  },
  actions: {

  },
})
