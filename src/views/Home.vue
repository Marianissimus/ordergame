<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <h1>Order<span class="asterix">*</span></h1>
    <h3>Game</h3>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.asterix {
  /* TO DO: change this by importing global scss variables in vue.config.js */
  color: yellow;
}
</style>
