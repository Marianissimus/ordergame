import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screen: 'scores',
    levels: [
      {
        level: 'numbers',
        list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        scores: [
          {
            name: 'Pitagora',
            value: 20,
          },
          {
            name: 'Thales',
            value: 34,
          },
        ],
      },
      {
        level: 'Windows',
        list: [3, 95, 98, 'ME', 'XP', 'Vista', 7, 8, 10],
        scores: [
          {
            name: 'Bill',
            value: 22,
          },
          {
            name: 'Gates',
            value: 29,
          },
        ],
      },
      {
        level: 'A romantic comedy formula',
        list: ['boy meets girl', 'one has a secret!', 'fall in love', 'secret revealed!', 'break-up', 'the chase', 'happily ever after'],
        scores: [
          {
            name: 'Julia',
            value: 21,
          },
          {
            name: 'Roberts',
            value: 29,
          },
        ],
      },
      {
        level: 'supa de pui',
        list: ['apa', 'pui', 'spumam', 'morcov + telina + ceapa', 'taitei / galuste', 'stingem focul', 'patrunjel'],
        scores: [
          {
            name: 'Jamie',
            value: 10,
          },
          {
            name: 'Gordon',
            value: 12,
          },
        ],
      },
      {
        level: 'ciorba de perisoare',
        list: ['apa', 'oase/carne', 'spumam', 'radacinoase', 'rosii', 'ardei gras', 'bors', 'dovlecel', 'perisoare', 'stingem focul', 'leustean'],
        scores: [
          {
            name: 'Jamila',
            value: 30,
          },
          {
            name: 'Chef',
            value: 25,
          },
        ],
      },
      {
        level: 'new employee @ MTS',
        list: ['M', 'A', 'R', 'I', 'A', 'N'],
        scores: [
          {
            name: 'Diana',
            value: 10,
          },
          {
            name: 'Cos',
            value: 10,
          },
        ],
      },
    ],
    firstScreen: true,
    scoremode: 'start',
    message: '',
    subtitle: '',
    level: 'numbers',
  },
  mutations: {
    setScore(state, score) {
      state.levels.find(el => el.level === state.level).scores.push(score);
    },
    setScoreMode(state, mode) {
      state.scoremode = mode;
    },
    setScreen(state, screen) {
      state.screen = screen;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setFirstScreen(state, value) {
      state.firstScreen = value;
    },
    setSubtitle(state, subtitle) {
      state.subtitle = subtitle;
    },
    setNumbersScore(state, scores) {
      state.levels.find(el => el.level === 'numbers').scores = scores;
    },
    setLevel(state, level) {
      state.level = level;
    },
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem('ordergame')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('ordergame'))),
        );
      }
    },
  },
});
