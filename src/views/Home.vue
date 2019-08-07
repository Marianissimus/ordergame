<template>
  <div class="home">
    <h1 class="logo" @click="startGame">Order<span class="asterix">*</span></h1>
    <h3 class="subtitle">Screen info here</h3>
    <ScoreScreen v-if="screen === 'scores'"/>
    <GameScreen v-else/>
    <h5 class="instructions">Some instructions here</h5>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import ScoreScreen from '@/components/ScoreScreen.vue';
import GameScreen from '@/components/GameScreen.vue';

export default{
  name: 'home',
  components: {
    ScoreScreen, GameScreen
  },
  data () {
    return {
    }
  },
  methods: {
    startGame () {
      if (this.screen === 'scores') {
        store.commit('setScreen', 'game')
      }
    }
  },
  computed: {
    screen () {
      return store.state.screen
    }
  }
}

</script>

<style scoped>
.asterix {
  /* TO DO: change this by importing global scss variables in vue.config.js */
  color: yellow;
}
.instructions {
  color: yellow;
}
</style>
