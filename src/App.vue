<template>
  <div id="app">
<!--     <div id="nav">
      <router-link to="/">H</router-link> |
      <router-link to="/settings">S</router-link>
    </div> -->
    <router-view class="content"/>
  </div>
</template>

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
  background-color: $gameBckColor;
  border-radius: $gameBorderRadius;
  width: 80vw;
  height: 80vh;
  min-height: 400px;
  color: white;
  position: relative;
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
