/* eslint-disable */
import store from '@/store';

export const mixins = {
  created() {
    store.commit('setMessage', this.localMessage);
    store.commit('setSubtitle', this.localSubtitle);
  },
  computed: {
    message() {
      return store.state.message;
    },
    subtitle() {
      return store.state.subtitle;
    },
    screen() {
      return store.state.screen;
    },
    firstScreen() {
      return store.state.firstScreen;
    },
    scoremode() {
      return store.state.scoremode;
    },
    level() {
      return store.state.level;
    },
    alllevels() {
      return store.state.levels.map(el => el.level);
    },
    numberslevel () {
      return store.state.levels
    }
  },
};
