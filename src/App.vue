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
  methods: {
    getApiScores() {
      fetch('https://development.m75.ro/test_mts/public/highscore/10')
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
          const res = response.result;
          // please CLEAN UP the results on the server
          // then add the filter below to response.results:
          // .filter(el => el.name !== 'undefined').filter(el => parseInt(el.value) > 1)

          // test against localhost; if highscores in localhost, send them to server
          // let localRes = store.state.levels.find(el => el.level === 'numbers').scores
          // let APIworstScore = res[9]

          // const url = 'https://development.m75.ro/test_mts/public/highscore/';
          // let localHighScore = false;

          // for (let el of localRes){
          //   if (parseInt(el.value) <= parseInt(APIworstScore)) {
          //     localHighScore = true;
          //     let req = `name=${el.name}&value=${el.value}/`;
          //     fetch(url, {
          //       method: 'post',
          //       body: req, / MAYBE JUST EL?!
          //       headers: { 'Content-type': 'application/x-www-form-urlencoded' },
          //     })
          //     .then(response => response.json())
          //     // .then(response => console.log('Success:', JSON.stringify(response)))
          //     .catch(error => console.error('Error:', error));
          //   }
          // }

          // if (localHighScore){
          //   this.getApiScores() // let's get fresh data
          // }
          store.commit('setNumbersScore', res);
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
