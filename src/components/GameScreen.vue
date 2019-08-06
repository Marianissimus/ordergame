<template>
  <div class="gameList">
  <div class="timer" v-if="isGameStarted"> - {{ timer }} seconds - </div> 
  <h1 v-if="userWin">You WIN!</h1>
  <draggable
    v-model="userSortedList"
    v-bind="dragOptions"
    @start="drag=true"
    @end="drag=false"
    @change="checkSorting"
    dragClass="highlightItem"
    animation=150
    easing="cubic-bezier(1, 0, 0, 1)"
    >
     <span v-for="(element, index) in userSortedList" :key="index"
     class="gameItem">
     {{ element }}
   </span>
  </draggable>
    <button @click="reset">Reset</button>
  </div>
</template>

<script>
import store from '@/store'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data () {
    return {
      userSortedList: null, // what the user sorts, needed to compare to default list
      userWin: false,
      isGameStarted: false,
      lastList: null, // no same sorting twice in a row,
      timer: '00:33'
    }
  },
  methods: {
    reset () {
      this.userWin = false
      this.isGameStarted = true
      this.userSortedList = this.getRandomList()
    },
    arraysAreEqual (arr1, arr2){
      // see note #1 in readme regarding this choice:
      return  JSON.stringify(arr1) === JSON.stringify(arr2)
    },
    checkSorting () {
      if (this.arraysAreEqual(this.userSortedList, this.gameList)) {
        this.userWin = true
      }
    },
    getRandomList () {
      // the randomized list, needed to start the game
      let list =  [...this.gameList].sort(function(a,b){return 0.5 - Math.random()})
      if (this.arraysAreEqual(list, this.gameList) || this.arraysAreEqual(list, this.lastList)){
        // prevent unsorted or duplicate starting lists
        return this.getRandomList()
      }
      this.lastList = list
      return list
    },
  },
  created () {
    this.reset()
  },
  computed: {
    gameList () {
      // the list from the store, needed to compare to user's list
      return store.state.gameLists.numbers
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
  padding: 40px;
}
.gameItem {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border: 2px solid white;
  margin: 10px;
  border-radius: 10px;
  cursor: move;
}
.highlightItem {
  border-color: yellow;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>