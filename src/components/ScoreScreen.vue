<template>
  <ul>
    <li v-for="(score, index) in scores" :key="index">
      <span v-if="score.name">{{ score.value }} - {{ score.name }}</span>
      <span v-else>
        {{ score.value }} -
        <input v-if="!saved" type="text" v-model="saveName" @keyup.enter="save(score.value)" />
        <span v-if="saved"> {{ saveName }}</span>
      </span>
<!--  this sucks; i'll rewrite it
      <span v-if="!score.name">{{ score.value }} - </span>
      <input type="text" v-if="!score.name && !saved" @keyup.enter="save(score.value)" v-model="nameToSave"></input>
      <span v-if="!score.name && saved">{{ nameToSave }}</span> -->
    </li>
  </ul>
</template>

<script>
import store from '@/store';

export default {
  data () {
    return {
      saveName: '',
      saved: false
    }
  },
  methods: {
    save (scoreValue) {
      // console.log(this.saveName, scoreValue)
      this.saved = true
      store.commit('updateScores', this.scores)
      // this.saved = true
      // store.commit('setScore', score)
    }
  },
  computed: {
    scores () {
      // if sorting done in backend, remove .sort
      return store.state.scores.sort((a,b) => b.value - a.value)
    },
    screen () {
      return store.state.screen
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>
