<template>
  <div class="home" @click="startGame">
    <div id="nav">
      <a @click="gotoLevels" v-if="screen === 'scores' && scoremode ==='start'"
      style="cursor: pointer">Levels</a>
      <a @click="goToScores" v-if="screen === 'levels'" style="cursor: pointer">Back</a>
    </div>
    <div class="title">
      <h1 class="logo">order<span class="asterisk">*</span></h1>
      <h4 class="subtitle">{{ subtitle }}</h4>
    </div>
    <!-- not the best pattern, but i shouldn't use routes just for this-->
    <ScoreScreen v-if="screen === 'scores'"/>
    <GameScreen v-if="screen === 'game'"/>
    <LevelsScreen v-if="screen === 'levels'" />

    <h5 class="instructions">* {{ message }}</h5>
  </div>
</template>

<script>
import store from '@/store';
import ScoreScreen from '@/components/ScoreScreen.vue';
import GameScreen from '@/components/GameScreen.vue';
import LevelsScreen from '@/components/LevelsScreen.vue';
import { mixins } from '@/mixins';

export default {
  name: 'home',
  mixins: [mixins],
  components: {
    ScoreScreen, GameScreen, LevelsScreen,
  },
  methods: {
    startGame() {
      if (this.screen === 'scores' && this.scoremode === 'start') {
        store.commit('setScreen', 'game');
      }
    },
    gotoLevels() {
      store.commit('setScreen', 'levels');
    },
    goToScores() {
      store.commit('setScreen', 'scores');
    },
  },
};

</script>

<style>
.home {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #263240;
  border-radius: 10px;
  width: 80vw;
  height: 100%;
  min-height: 400px;
  color: white;
  position: relative;
}
.logo {
  font-weight: 400;
  font-size: 3em;
  letter-spacing: .1em;
}
.subtitle {
  font-weight: 300;
  letter-spacing: .1em;
  margin: 1em 0 0 0;
}
.asterisk, .instructions {
  color: yellow;
}
.instructions {
  font-weight: 300;
  margin-bottom: 1em;
}
</style>
