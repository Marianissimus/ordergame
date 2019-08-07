<template>
  <ul>
    <li v-for="(score, index) in scores" :key="index">
      <span v-if="score.name">{{ score.value }} - {{ score.name }}</span>
      <span v-if="!score.name">
        {{ score.value }} -
        <input type="text" v-model="saveName" @keyup.enter="save(index)" />
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
      store.commit('updateScores', this.scores)
    }
  },
  computed: {
    localMessage () {
      return this.scoreMode === 'start' ? 'click anywhere to START' : 'enter highscore nickname'
    },
    localSubtitle () {
      return this.scoreMode === 'start' ? 'game' : 'highscores'
    },
    scores () {
      // if sorting done in backend, remove .sort
      return store.state.scores.sort((a,b) => a.value - b.value)
    },
    scoreMode () {
      return store.state.scoreMode
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>
