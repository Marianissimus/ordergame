<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1 class="logo">Order<span class="asterix">*</span></h1>
    <h3 class="subtitle">Screen info here</h3>
    <!-- for development and testing only -->
    <button @click="mode = 'game'">Game</button>
    <button @click="mode = 'score'">Screen</button>
    <!-- end mode testing -->
    <ScoreScreen v-if="mode === 'score'"/>
    <GameScreen v-else/>
    <h5 class="instructions">Some instructions here</h5>
  </div>
</template>

<script>
// @ is an alias to /src
import ScoreScreen from '@/components/ScoreScreen.vue';
import GameScreen from '@/components/GameScreen.vue';

export default{
  name: 'home',
  components: {
    ScoreScreen, GameScreen
  },
  data () {
    return {
      mode: 'game'
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
