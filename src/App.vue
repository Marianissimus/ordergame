<template>
  <div id="app">
    <router-view class="content"/>
  </div>
</template>

<script>
import store from '@/store';

export default {
  data() {
    return {
      isLocalHighScore: false,
    };
  },
  created() {
    store.commit('setFirstScreen', true);
  },
  mounted() {
    this.getApiScores();
  },
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  computed: {
    localNumScores() {
      return store.state.levels.find(el => el.level === 'numbers').scores;
    },
  },
  methods: {
    getApiScores() {
      fetch('https://development.m75.ro/test_mts/public/highscore/10')
        .then(response => response.json())
        .catch(error => console.error('Error:', error)) // eslint-disable-line 
        .then((response) => {
          const ApiRes = response.result;
          // please CLEAN UP the scores on the server
          // THEN uncomment the filter below:
          // .filter(el => el.name !== 'undefined').filter(el => parseInt(el.value) > 1)

          // scores saved locally only dont have IDs
          const unsavedLocal = this.localNumScores.filter(el => !el.id);

          // compare against worst result in API
          const APIworstScore = ApiRes[9].value;

          // if highscores in localhost, send them to server
          const url = 'https://development.m75.ro/test_mts/public/highscore/';

          for (const el of unsavedLocal) {  // eslint-disable-line 
            if (el.value <= parseInt(APIworstScore, 10)
              || parseInt(el.value, 10) <= parseInt(APIworstScore, 10)) {
              this.isLocalHighScore = true;
              const req = `name=${el.name}&value=${el.value}/`;
              fetch(url, {
                method: 'post',
                body: req,
                headers: { 'Content-type': 'application/x-www-form-urlencoded' },
              });
            }
          }
          // finally store in localhost
          store.commit('setNumbersScore', ApiRes);
        });
    },
  },
};
</script>


<style lang="scss">
$gameBckColor: #263240;
$appBckColor: #a0c8c8;
$notifyColor: #ffff01;
$white: #FFF;
$gameBorderRadius: 10px; // TO DO: ask confirmation from designer

*, body, html{
  //small css reset
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.content{
  height: 90%;
}

body {
  background-color: $appBckColor;
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
  a {
    border: 1px solid white;
    border-radius: 5px;
    padding: .5em;
    font-weight: 400;
    color: $white;
    text-decoration: none;
    &.router-link-exact-active {
      color: $notifyColor;
      text-decoration: underline;
    }
  }
}
</style>
