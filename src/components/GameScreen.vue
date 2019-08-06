<template>
  <div class="gameList">
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
     @click="element.fixed = !element.fixed"
     class="gameItem">
     {{ element }}
   </span>
  </draggable>
    <button @click="test">teeest</button>
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
      userWin: false
    }
  },
  methods: {
    test () {
      console.log(1, this.userSortedList)
    },
    checkSorting () {
      // see note #1 in readme regarding this choice:
      if (JSON.stringify(this.userSortedList) === JSON.stringify(this.gameList)) {
        this.userWin = true
      }
    }
  },
  created () {
    this.userSortedList = this.randomizedGameList
  },
  computed: {
    gameList () {
      // the list from the store, needed to compare to user's list
      return store.state.gameLists.numbers
    },
    randomizedGameList () {
      // the randomized list, needed to start the game
      return [...this.gameList].sort(function(a,b){return 0.5 - Math.random()})
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