<template>
  <ul>
    <li v-for="(score, index) in scores" :key="index">
      <span v-if="score.name">{{ score.value }} - {{ score.name }}</span>
      <span v-if="!score.name"  @click.stop="stopTheEvent">
        {{ score.value }} -
        <input v-focus
        onblur="this.focus()" autofocus
        type="text" ref="save" v-model="saveName"
        @keyup.enter="save(index, score.value)"
        />
      </span>
    </li>
    <div v-if="level==='numbers' && !firstScreen && !cheatMode"
      style="margin-top: 1em; padding: 0"
      @click.stop="stopTheEvent">
      <button @click="cheat">Cheat! :)</button>
    </div>
  </ul>
</template>

<script>
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
    // subscribe store levels to localstorage
    store.subscribe((mutation, state) => {
      const toStore = {
        levels: state.levels,
      };
      localStorage.setItem('ordergame', JSON.stringify(toStore));
    });

    if (this.scores.find(el => el.name === null)) {
      // console.log('found');
    } else {
      if (store.state.firstScreen === true) {
        store.commit('setMessage', 'click anywhere to play');
        return;
      }
      store.commit('setMessage', 'not a highscore. try again');
      setTimeout(store.commit('setScoreMode', 'start'), 1000);
    }
  },
  methods: {
    save(index, value) {
      if (!this.saveName.length) {
        store.commit('setMessage', 'no empty names, please!');
        return;
      }
      store.commit('setMessage', 'Score saved. Change level or play again');
      // only post results from numbers level to API
      const url = 'https://development.m75.ro/test_mts/public/highscore/';
      const req = `name=${this.saveName}&value=${value}/`;
      if (this.level === 'numbers') {
        fetch(url, {
          method: 'post',
          body: req,
          headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        })
          .then(response => response.json())
          .then(response => console.log('Success:', JSON.stringify(response)))
          .catch(error => console.error('Error:', error));
      }

      this.scores[index].name = this.saveName;
      this.saved = true;
      store.commit('setScoreMode', 'start');
    },
    cheat() {
      store.commit('setScoreMode', 'save');
      this.cheatMode = true;
      store.commit('setScore', {
        name: null,
        value: parseInt(this.scores[0].value) - 1,
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
      // if sorting done in backend, remove .sort
      return store.state.levels
        .find(el => el.level === this.level).scores
        .sort((a, b) => a.value - b.value)
        // .sort((a, b) => b.value - a.value) // temp for dev
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
