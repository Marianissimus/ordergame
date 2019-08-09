import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screen: 'scores',
    levels: [
      {
        level: 'letters',
        list: ['A', 'B', 'C', 'D'],
        scores: [
            {
              name: 'sdcsd',
              value: 1
            },
            {
              name: 'Miki',
              value: 34
            }
          ],
      },
      {
        level: 'numbers',
        list: [0, 1, 2, 3],
        scores: [
            {
              name: 'sdcsd',
              value: 2
            },
            {
              name: 'Miki',
              value: 34
            },
            {
              name: 'Mary',
              value: 18
            }
        ]
      },
      {
        level: 'supa de pui',
        list: ['apa', 'pui', 'spumam', 'morcov + telina + ceapa', 'taitei / galuste', 'stingem focul', 'patrunjel'],
        scores: [
          {
            name: 'jamie oliver',
            value: 10
          },
          {
            name: 'Gordon',
            value: 12
          }
        ]
      },
      {
        level: 'a rom-com formula',
        list: ['boys meet girl', 'one has a secret', 'fall in love', 'overcome conflict', 'secret revealed!', 'break-up', 'the chase', 'happily ever after'],
        scores: [
          {
            name: 'Julia',
            value: 21
          },
          {
            name: 'Roberts',
            value: 29
          }
        ]
      },
      {
        level: 'ciorba de perisoare',
        list: [ 'apa', 'oase/carne', 'spumam', 'radacinoase', 'rosii', 'ardei gras', 'bors', 'dovlecel', 'perisoare', 'stingem focul', 'leustean' ],
        scores: [
          {
            name: 'Jamilla',
            value: 30
          },
          {
            name: 'Cezar',
            value: 25
          }
        ]
      }
    ],
   lastScore: 0,
   scoremode: 'start',
   message: '',
   subtitle: '',
   level: 'numbers',
  },
  mutations: {
    setScore: function (state, score) {
      state.levels.find(el => el.level === state.level).scores.push(score)
    },
    setScoreMode(state, mode){
      state.scoremode = mode
    },
    setScreen(state, screen) {
      state.screen = screen
    },
    setMessage(state, message){
      state.message = message
    },
    setSubtitle(state, subtitle){
      state.subtitle = subtitle
    },
    setLevel(state, level) {
      state.level = level
    }
  },
  actions: {

  },
})
