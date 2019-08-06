<template>
  <ul>
    <li v-for="(score, index) in scores" :key="index">
      {{ score.value }} - {{ score.name }}
    </li>
  </ul>
</template>

<script>
import store from '@/store';

export default {
  data () {
    return {
    }
  },
  computed: {
    scores () {
      // if the sorting is done in backend, remove .sort
      return store.state.scores.sort((a,b) => b.value - a.value)
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>
