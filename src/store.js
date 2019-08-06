import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    gameLists: {
      numbers: [1, 2, 3, 4]
    }
  },
  mutations: {
    setScore(scores, item) {
      state.scores.push(item)
    }
  },
  actions: {

  },
});
