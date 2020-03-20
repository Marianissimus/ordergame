<template>
  <ul>
    <li v-for="(score, index) in scores" :key="index">
      <span v-if="score.name">{{ score.value }} - {{ score.name }}</span>
      <span v-if="!score.name"  @click.stop="stopTheEvent">
        {{ score.value }} -
        <input v-focus
        autofocus onblur="this.focus()"
        type="text" ref="saveInput" v-model="saveName"
        @keyup.enter="save(index)"
        />
      </span>
    </li>
    <div style="margin-top: 1em; padding: 0" @click.stop="stopTheEvent">
<!--       <button @click="cheat">Cheat! :)</button> -->
      <button @click="resetScores">Reset Scores</button>
    </div>
  </ul>
</template>


<script>
/* eslint-disable consistent-return */
import { setTimeout } from 'timers';
import store from '@/store';
import { mixins } from '@/mixins';

export default {
  mixins: [mixins],
  data() {
    return {
      saved: false,
      saveName: '',
      cheatMode: false,
    };
  },
  mounted() {
    window.addEventListener('unload', this.sanitizeScores);
    // subscribe store levels to localstorage
    store.subscribe((mutation, state) => {
      const toStore = {
        levels: state.levels,
      };
      localStorage.setItem('ordergame2', JSON.stringify(toStore));
    });

    if (this.scores.find(el => el.name === null)) {
      return false;
    }
    if (store.state.firstScreen === true) {
      store.commit('setMessage', 'click anywhere to play');
      return false;
    }
    store.commit('setMessage', 'not a highscore. try again');
    setTimeout(store.commit('setScoreMode', 'start'), 1000);
  },
  beforeDestroyed() {
    window.removeEventListener('unload', this.sanitizeScores);
  },
  methods: {
    sanitizeScores() {
      store.commit('sanitizeScore', this.level);
    },
    resetScores() {
      store.commit('resetScore');
      store.commit('setScreen', 'levels');
    },
    save(index) {
      if (!this.saveName) {
        store.commit('setMessage', 'no empty names, please!');
        return false;
      }
      store.commit('setMessage', 'Score saved. Click to play again or change level');
      this.scores[index].name = this.saveName;
      this.saved = true;
      store.commit('setScoreMode', 'start');
    },
    cheat() {
      store.commit('setScoreMode', 'save');
      this.cheatMode = true;
      store.commit('setScore', {
        name: null,
        value: parseInt(this.scores[0].value, 10) - 1,
      });
      this.save();
    },
    stopTheEvent: (event) => {
      event.stopPropagation();
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  computed: {
    localMessage() {
      return this.scoremode === 'start' ? 'click anywhere to START' : 'enter highscore nickname';
    },
    localSubtitle() {
      return this.scoremode === 'start' ? 'game' : `highscores level: ${this.level}`;
    },
    scores() {
      return store.state.levels
        .find(el => el.level === this.level).scores
        .sort((a, b) => a.value - b.value)
        .slice(0, 10); // remove scores not in top 10
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
input[type="text"] {
  width: 8em;
  background-color: #263240;
  color: white;
  border: none;
  padding: 1em;
}
@-moz-document url-prefix() {
  input[type="text"] {
    margin-top: 5px;
    margin-bottom: 5px;
    outline: 1px solid yellow;
  }
}
button {
  border: 1px solid white;
  border-radius: 5px;
  padding: .5em;
  font-weight: 400;
  color: white;
  background-color: #263240;
  text-decoration: none;
}
button:focus{outline:none !important;}
</style>
