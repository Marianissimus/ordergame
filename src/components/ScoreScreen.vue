<template>
  <ul>
    <li v-for="(score, index) in scores" :key="index">
      <span v-if="score.name">{{ score.value }} - {{ score.name }}</span>
      <span v-if="!score.name"  @click.stop="stopTheEvent">
        {{ score.value }} -
        <input v-focus type="text" ref="save" v-model="saveName" @keyup.enter="save(index)" />
      </span>
    </li>
  </ul>
</template>

<script>
import store from '@/store'
import { mixins } from '@/mixins.js'

export default {
  mixins: [mixins],
  data () {
    return {
      saved: false,
      saveName: ''
    }
  },
  methods: {
    save (index) {
      if (!this.saveName.length) {
       store.commit('setMessage', 'no empty names, please!')
       return
      }
      store.commit('setMessage', 'Score saved. Change level or click anywhere to play again')
      this.scores[index].name = this.saveName
      this.saved = true
      store.commit('setScoreMode', 'start')
    },
    stopTheEvent: (event) => {
      event.stopPropagation()
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  computed: {
    localMessage () {
      return this.scoremode === 'start' ? 'click anywhere to START' : 'enter highscore nickname'
    },
    localSubtitle () {
      return this.scoremode === 'start' ? 'game' : 'highscores'
    },
    scores () {
      // if sorting done in backend, remove .sort
      return store.state.levels.find(el => el.level === this.level).scores.sort((a,b) => a.value - b.value).slice(0, 10) // also remove scores not in highscores
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
input {
  width: 8em;
  background-color: #263240;
  color: white;
  border: none;
  padding: 1em;
}
</style>
