<template>
  <div class="home" @click="startGame">
    <div class="title">
      <h1 class="logo">order<span class="asterisk">*</span></h1>
      <h4 class="subtitle">{{ subtitle }}</h4>
    </div>
    <ScoreScreen v-if="screen === 'scores'"/>
    <GameScreen v-else/>
    <h5 class="instructions">* {{ message }}</h5>
  </div>
</template>

<script>
import store from '@/store'
import ScoreScreen from '@/components/ScoreScreen.vue'
import GameScreen from '@/components/GameScreen.vue'
import { mixins } from '@/mixins.js'

export default{
  name: 'home',
  mixins: [mixins],
  components: {
    ScoreScreen, GameScreen
  },
  methods: {
    startGame () {
      if (this.screen === 'scores' && this.scoremode === 'start') {
        store.commit('setScreen', 'game')
      }
    }
  }
}

</script>

<style>
.home {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.logo {
  font-weight: 400;
  font-size: 3em;
  letter-spacing: .1em;
}
.subtitle {
  font-weight: 300;
  letter-spacing: .1em;
  margin: 1em 0;
}
.asterisk, .instructions {
  color: yellow;
}
</style>
