<template>
  <div>
    <ul>
      <li v-for="(item, index) in alllevels" :key="index">
        <input type="radio" v-model="selectedLevel"
        :value=item @change="selectLevel">&nbsp;&nbsp;{{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store';
import { mixins } from '@/mixins';

export default {
  mixins: [mixins],
  name: 'levels',
  data() {
    return {
      localMessage: 'choose level to play',
      localSubtitle: 'level selector',
      selectedLevel: '',
    };
  },
  methods: {
    selectLevel() {
      store.commit('setLevel', this.selectedLevel);
    },
    goToScores() {
      store.commit('setScreen', 'scores');
    },
  },
  created() {
    this.selectedLevel = this.level;
  },
};

</script>

<style lang="scss" scoped>
ul {
  width: 200px;
  display: block;
  text-align: left;
  margin: 0 auto;
}
ul li {
  list-style: none;
  margin: 1em;
}
</style>
