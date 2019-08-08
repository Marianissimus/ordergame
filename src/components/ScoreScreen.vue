<template>
  <ul>
    <li v-for="(score, index) in scores" :key="index">
      <span v-if="score.name">{{ score.value }} - {{ score.name }}</span>
      <span v-if="!score.name"  @click.stop="stopTheEvent">
        {{ score.value }} -
        <input type="text" ref="save" v-model="saveName" @keyup.enter="save(index)" autofocus />
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
      store.commit('setMessage', 'score saved')
      this.scores[index].name = this.saveName
      this.saved = true
      store.commit('setScoreMode', 'start')
      store.commit('updateScores', this.scores)
    },
    stopTheEvent: (event) => {
      event.stopPropagation()
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
      return store.state.scores.sort((a,b) => a.value - b.value).slice(0, 10) 
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
input {
  width: 6em;
  background-color: #263240;
  color: white;
  border: none;
  padding: 5px
}
</style>
