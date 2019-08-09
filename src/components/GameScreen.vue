<template>
  <div class="gameList">
    <!-- <div class="timer" v-if="isGameStarted"> - {{ time }} seconds - </div> -->
<!--     <h1 v-if="userWin">You WIN!</h1> -->
    <draggable
      v-model="userSortedList"
      v-bind="dragOptions"
      @start="drag=true"
      @end="drag=false"
      @change="checkWin"
      dragClass="highlightItem"
      animation=150
      easing="cubic-bezier(1, 0, 0, 1)"
      >
      <span v-for="(element, index) in userSortedList" :key="index"
      class="gameItem">
      {{ element }}
    </span>
    </draggable>
    <div class="btnContainer">
      <button @click="reset">Restart</button>
      <button @click="goToLevels" style="margin-left: 1em">Levels</button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import draggable from 'vuedraggable'
import { mixins } from '@/mixins.js'

export default {
  components: {
    draggable
  },
  mixins: [mixins],
  data () {
    return {
      userSortedList: null, // what the user sorts, needed to compare to default list
      userWin: false,
      isGameStarted: false,
      lastList: null, // no same random sorting twice in a row,
      timer: null,
      time: 0,
      localMessage: 'arrange the items as fast as you can'// correct topic, please
    }
  },
  methods: {
    reset () {
      this.userWin = false
      this.isGameStarted = true
      this.userSortedList = this.getRandomList()
      this.time = 0
      clearInterval(this.timer)
      this.startTimer()
    },
    goToLevels () {
      this.isGameStarted = false
      this.time = 0
      clearInterval(this.timer)
      store.commit('setScreen', 'levels')
    },
    arraysAreEqual (arr1, arr2){
      return  JSON.stringify(arr1) === JSON.stringify(arr2) // see note #1 in readme
    },
    checkWin () {
      if (this.arraysAreEqual(this.userSortedList, this.gameList)) {
        this.userWin = true
        this.saveScore()
        clearInterval(this.timer)
        store.commit('setScreen', 'scores')
        store.commit('setSubtitle', ` - 0 seconds - `)
      }
    },
    saveScore() {
      store.commit('setScoreMode', 'save')
      let score = {
        name: null,
        value: this.time
      }
      store.commit('setScore', score)
    },
    getRandomList () {
      let list =  [...this.gameList].sort(function(a,b){return 0.5 - Math.random()})
      if (this.arraysAreEqual(list, this.gameList) || this.arraysAreEqual(list, this.lastList)){
        // recursive, to prevent unsorted or duplicated starting lists
        return this.getRandomList()
      }
      this.lastList = list
      return list
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.time++
        store.commit('setSubtitle', ` - ${this.time} seconds - `)
      }, 1000)
    }
  },
  created () {
    store.commit('setSubtitle', ` - 0 seconds - `)
    this.reset()
  },
  computed: {
    gameList () {
      return store.state.levels.find(el => el.level === this.level).list // the default list
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  }
}
</script>

<style scoped>
.gameList {
  padding: 1em;
}
.gameItem {
  display: inline-block;
  min-width: 50px;
  height: 50px;
  line-height: 50px;
  border: 2px solid white;
  margin: 5px;
  border-radius: 10px;
  cursor: move;
  padding: 0 5px;
}
.highlightItem {
  border-color: yellow;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.btnContainer {
  margin-top: 1em;
}
button {
  padding: 1em;
  background-color: #263240;
  border: 1px solid yellow;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}
button:focus{outline:none !important;}
</style>