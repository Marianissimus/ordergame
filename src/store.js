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
      }
    ],
  },
  mutations: {
    setScore(state, score) {
      state.scores.unshift(score)
    },
    updateScores(state, scores) {
      state.scores = scores
    },
    setScreen(state, screen) {
      state.screen = screen
    }
  },
  actions: {

  },
})
