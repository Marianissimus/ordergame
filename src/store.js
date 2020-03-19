import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getDefaultState = () => ({
  screen: 'scores',
  levels: [
    {
      level: 'Numbers',
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
      level: 'Most visited countries',
      list: ['France', 'Spain', 'USA', 'China', 'Italy', 'Turkey', 'Mexico'],
      scores: [
        {
          name: 'Marco',
          value: 22,
        },
        {
          name: 'Polo',
          value: 29,
        },
      ],
    },
    {
      level: 'A rom-com formula',
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
      level: 'Most Popular Dog Breeds',
      list: ['Labrador Retriever', 'German Shepherd Dog', 'Poodle', 'Chihuahua', 'Golden Retriever', 'Dachshund'],
      scores: [
        {
          name: 'Rex',
          value: 30,
        },
        {
          name: 'Max',
          value: 25,
        },
      ],
    },
    {
      level: 'Star Wars by release date',
      list: ['IV', 'V', 'VI', 'I', 'II', 'III', 'VII', 'VIII', 'IX'],
      scores: [
        {
          name: 'George',
          value: 10,
        },
        {
          name: 'Lucas',
          value: 9,
        },
      ],
    },
    {
      level: 'Supa de pui',
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
  ],
  firstScreen: true,
  scoremode: 'start',
  message: '',
  subtitle: '',
  level: 'Numbers',
});

export default new Vuex.Store({
  state: getDefaultState(),
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
      state.levels.find(el => el.level === 'Numbers').scores = scores;
    },
    setLevel(state, level) {
      state.level = level;
    },
    sanitizeScore(state, level) {
      const clearScores = state.levels.find(el => el.level === level).scores.filter(el => el.name);
      state.levels.find(el => el.level === level).scores = clearScores;
    },
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem('ordergame2')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('ordergame2'))),
        );
      }
    },
    resetScore(state) {
      Object.assign(state, getDefaultState());
    },
  },
});
